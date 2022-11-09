resource "aws_ecs_task_definition" "tfer--task-definition-002F-ecs_pta_task" {
  container_definitions    = "[{\"cpu\":0,\"environment\":[{\"name\":\"RAILS_ENV\",\"value\":\"production\"}],\"essential\":true,\"image\":\"748732166031.dkr.ecr.ap-northeast-1.amazonaws.com/pta_api:6b78d4eea6fa8b363bf4619513f2c28359e5d3e8\",\"logConfiguration\":{\"logDriver\":\"awslogs\",\"options\":{\"awslogs-group\":\"/ecs/ecs_pta_task\",\"awslogs-region\":\"ap-northeast-1\",\"awslogs-stream-prefix\":\"ecs\"}},\"mountPoints\":[],\"name\":\"pta_api\",\"portMappings\":[{\"containerPort\":3000,\"hostPort\":3000,\"protocol\":\"tcp\"}],\"secrets\":[{\"name\":\"DB_HOST\",\"valueFrom\":\"pta-db-host\"},{\"name\":\"DB_PASSWORD\",\"valueFrom\":\"pta-db-password\"},{\"name\":\"DB_USERNAME\",\"valueFrom\":\"pta-db-username\"}],\"volumesFrom\":[]},{\"cpu\":0,\"dependsOn\":[{\"condition\":\"START\",\"containerName\":\"pta_api\"}],\"environment\":[],\"essential\":true,\"image\":\"748732166031.dkr.ecr.ap-northeast-1.amazonaws.com/pta_frontend:6b78d4eea6fa8b363bf4619513f2c28359e5d3e8\",\"logConfiguration\":{\"logDriver\":\"awslogs\",\"options\":{\"awslogs-group\":\"/ecs/ecs_pta_task\",\"awslogs-region\":\"ap-northeast-1\",\"awslogs-stream-prefix\":\"ecs\"}},\"mountPoints\":[],\"name\":\"pta_frontend\",\"portMappings\":[{\"containerPort\":80,\"hostPort\":80,\"protocol\":\"tcp\"}],\"volumesFrom\":[{\"sourceContainer\":\"pta_api\"}]}]"
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
