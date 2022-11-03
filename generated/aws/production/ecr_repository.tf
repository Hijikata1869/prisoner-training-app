resource "aws_ecr_repository" "tfer--pta_api" {
  encryption_configuration {
    encryption_type = "AES256"
  }

  image_scanning_configuration {
    scan_on_push = "false"
  }

  image_tag_mutability = "MUTABLE"
  name                 = "pta_api"

  tags = {
    Environment = "production"
  }

  tags_all = {
    Environment = "production"
  }
}

resource "aws_ecr_repository" "tfer--pta_frontend" {
  encryption_configuration {
    encryption_type = "AES256"
  }

  image_scanning_configuration {
    scan_on_push = "false"
  }

  image_tag_mutability = "MUTABLE"
  name                 = "pta_frontend"

  tags = {
    Environment = "production"
  }

  tags_all = {
    Environment = "production"
  }
}
