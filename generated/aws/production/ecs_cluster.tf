resource "aws_ecs_cluster" "tfer--pta-cluster" {
  name = "pta-cluster"

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

resource "aws_ecs_cluster_capacity_providers" "tfer--pta-cluster" {
  capacity_providers = ["FARGATE", "FARGATE_SPOT"]
  cluster_name               = aws_ecs_cluster.tfer--pta-cluster.name
}