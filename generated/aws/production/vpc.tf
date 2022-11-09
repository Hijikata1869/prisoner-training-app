resource "aws_vpc" "tfer--vpc-0afaa249c2c5abb82" {
  assign_generated_ipv6_cidr_block     = "false"
  cidr_block                           = "10.0.0.0/16"
  enable_dns_hostnames                 = "true"
  enable_dns_support                   = "true"
  enable_network_address_usage_metrics = "false"
  instance_tenancy                     = "default"


  tags = {
    Environment = "production"
    Name        = "ptavpc"
  }

  tags_all = {
    Environment = "production"
    Name        = "ptavpc"
  }
}
