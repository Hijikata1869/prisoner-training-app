resource "aws_db_instance" "tfer--pta-db" {
  allocated_storage                     = "20"
  auto_minor_version_upgrade            = "true"
  availability_zone                     = "ap-northeast-1a"
  backup_retention_period               = "7"
  backup_window                         = "13:02-13:32"
  ca_cert_identifier                    = "rds-ca-2019"
  copy_tags_to_snapshot                 = "true"
  customer_owned_ip_enabled             = "false"
  db_subnet_group_name                  = "pta-rds-group"
  deletion_protection                   = "false"
  delete_automated_backups              = "false"
  engine                                = "mysql"
  engine_version                        = "8.0.28"
  iam_database_authentication_enabled   = "false"
  identifier                            = "pta-db"
  instance_class                        = "db.t2.micro"
  iops                                  = "0"
  license_model                         = "general-public-license"
  maintenance_window                    = "fri:18:30-fri:19:00"
  max_allocated_storage                 = "0"
  monitoring_interval                   = "0"
  multi_az                              = "false"
  network_type                          = "IPV4"
  option_group_name                     = "default:mysql-8-0"
  parameter_group_name                  = "default.mysql8.0"
  performance_insights_enabled          = "false"
  performance_insights_retention_period = "0"
  port                                  = "3306"
  publicly_accessible                   = "false"
  storage_encrypted                     = "false"
  storage_type                          = "gp2"

  tags = {
    Environment = "production"
  }

  tags_all = {
    Environment = "production"
  }

  username               = "root"
  vpc_security_group_ids = [data.terraform_remote_state.local.outputs.aws_security_group_tfer--pta-db-sg_sg-0bbf6cdd7121cb715_id]
}
