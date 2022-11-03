resource "aws_security_group" "tfer--pta-alb-sg_sg-09a1fbce35a5ef1c5" {
  description = "pta-alb-sg"

  egress {
    from_port       = "80"
    protocol        = "tcp"
    security_groups = ["${data.terraform_remote_state.local.outputs.aws_security_group_tfer--pta_ecs_sg_sg-02075dc1149208821_id}"]
    self            = "false"
    to_port         = "80"
  }

  ingress {
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = "443"
    protocol    = "tcp"
    self        = "false"
    to_port     = "443"
  }

  ingress {
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = "80"
    protocol    = "tcp"
    self        = "false"
    to_port     = "80"
  }

  name = "pta-alb-sg"

  tags = {
    Environment = "production"
  }

  tags_all = {
    Environment = "production"
  }

  vpc_id = "vpc-0afaa249c2c5abb82"
}

resource "aws_security_group" "tfer--pta-db-sg_sg-0bbf6cdd7121cb715" {
  description = "Security group for rds"

  egress {
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = "0"
    protocol    = "-1"
    self        = "false"
    to_port     = "0"
  }

  ingress {
    from_port       = "3306"
    protocol        = "tcp"
    security_groups = ["${data.terraform_remote_state.local.outputs.aws_security_group_tfer--pta_ecs_sg_sg-02075dc1149208821_id}"]
    self            = "false"
    to_port         = "3306"
  }

  name = "pta-db-sg"

  tags = {
    Environment = "production"
  }

  tags_all = {
    Environment = "production"
  }

  vpc_id = "vpc-0afaa249c2c5abb82"
}

resource "aws_security_group" "tfer--pta_ecs_sg_sg-02075dc1149208821" {
  description = "pta_ecs_sg"

  egress {
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = "0"
    protocol    = "-1"
    self        = "false"
    to_port     = "0"
  }

  ingress {
    cidr_blocks      = ["0.0.0.0/0"]
    from_port        = "80"
    ipv6_cidr_blocks = ["::/0"]
    protocol         = "tcp"
    self             = "false"
    to_port          = "80"
  }

  name = "pta_ecs_sg"

  tags = {
    Environment = "production"
  }

  tags_all = {
    Environment = "production"
  }

  vpc_id = "vpc-0afaa249c2c5abb82"
}
