resource "aws_ecs_cluster" "tfer--pta-cluster" {
  capacity_providers = ["FARGATE", "FARGATE_SPOT"]
  name               = "pta-cluster"

  setting {
    name  = "containerInsights"
    value = "disabled"
  }

  tags = {
    Environment = "production"
  }

  tags_all = {
    Environment = "production"
  }
}
