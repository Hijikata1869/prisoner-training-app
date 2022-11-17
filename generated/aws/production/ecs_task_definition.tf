locals {
  ecr_registory = "748732166031.dkr.ecr.ap-northeast-1.amazonaws.com"
  ecr_backend_repository_name = "pta_api"
  ecr_frontend_repository_name = "pta_frontend"
}

data "external" "ecr_image_pta_api_newest" {
  program = [
    "aws", "ecr", "describe-images",
  "--repository-name", local.ecr_backend_repository_name,
  "--query", "{\"tags\": to_string(sort_by(imageDetails,& imagePushedAt)[-1].imageTags)}",
  ]
}

data "external" "ecr_image_pta_frontend_newest" {
  program = [
    "aws", "ecr", "describe-images",
  "--repository-name", local.ecr_frontend_repository_name,
  "--query", "{\"tags\": to_string(sort_by(imageDetails,& imagePushedAt)[-1].imageTags)}",
  ]
}

locals {
  ecr_backend_image_newest_tags = jsondecode(data.external.ecr_image_pta_api_newest.result.tags)
  ecr_frontend_image_newest_tags = jsondecode(data.external.ecr_image_pta_frontend_newest.result.tags)
}

locals {
  pta_api_newest_image = "${local.ecr_registory}/${local.ecr_backend_repository_name}:${local.ecr_backend_image_newest_tags[0]}"
  pta_frontend_newest_image = "${local.ecr_registory}/${local.ecr_frontend_repository_name}:${local.ecr_frontend_image_newest_tags[0]}"
}

resource "aws_ecs_task_definition" "tfer--task-definition-002F-ecs_pta_task" {
  container_definitions    = templatefile("./task-definition.json",{
    pta_api_newest_image = local.pta_api_newest_image
    pta_frontend_newest_image = local.pta_frontend_newest_image
  })
  cpu                      = "256"
  execution_role_arn       = "arn:aws:iam::748732166031:role/ecsTaskExecutionRole"
  family                   = "ecs_pta_task"
  memory                   = "512"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]

  runtime_platform {
    operating_system_family = "LINUX"
  }

  tags = {
    Environment = "production"
  }

  tags_all = {
    Environment = "production"
  }

  task_role_arn = "arn:aws:iam::748732166031:role/ecsTaskExecutionRole"
}