resource "aws_subnet" "tfer--subnet-0635816e36cc79294" {
  assign_ipv6_address_on_creation                = "false"
  cidr_block                                     = "10.0.20.0/24"
  enable_dns64                                   = "false"
  enable_resource_name_dns_a_record_on_launch    = "false"
  enable_resource_name_dns_aaaa_record_on_launch = "false"
  ipv6_native                                    = "false"
  map_customer_owned_ip_on_launch                = "false"
  map_public_ip_on_launch                        = "false"
  private_dns_hostname_type_on_launch            = "ip-name"

  tags = {
    Environment = "production"
    Name        = "public-subnet-c"
  }

  tags_all = {
    Environment = "production"
    Name        = "public-subnet-c"
  }

  vpc_id = "${data.terraform_remote_state.local.outputs.aws_vpc_tfer--vpc-0afaa249c2c5abb82_id}"
}

resource "aws_subnet" "tfer--subnet-0a66ccfff9e5ab0ba" {
  assign_ipv6_address_on_creation                = "false"
  cidr_block                                     = "10.0.2.0/24"
  enable_dns64                                   = "false"
  enable_resource_name_dns_a_record_on_launch    = "false"
  enable_resource_name_dns_aaaa_record_on_launch = "false"
  ipv6_native                                    = "false"
  map_customer_owned_ip_on_launch                = "false"
  map_public_ip_on_launch                        = "false"
  private_dns_hostname_type_on_launch            = "ip-name"

  tags = {
    Environment = "production"
    Name        = "プライベートサブネット"
  }

  tags_all = {
    Environment = "production"
    Name        = "プライベートサブネット"
  }

  vpc_id = "${data.terraform_remote_state.local.outputs.aws_vpc_tfer--vpc-0afaa249c2c5abb82_id}"
}

resource "aws_subnet" "tfer--subnet-0e8479f86a3a382b8" {
  assign_ipv6_address_on_creation                = "false"
  cidr_block                                     = "10.0.3.0/24"
  enable_dns64                                   = "false"
  enable_resource_name_dns_a_record_on_launch    = "false"
  enable_resource_name_dns_aaaa_record_on_launch = "false"
  ipv6_native                                    = "false"
  map_customer_owned_ip_on_launch                = "false"
  map_public_ip_on_launch                        = "false"
  private_dns_hostname_type_on_launch            = "ip-name"

  tags = {
    Environment = "production"
    Name        = "RDS用サブネット"
  }

  tags_all = {
    Environment = "production"
    Name        = "RDS用サブネット"
  }

  vpc_id = "${data.terraform_remote_state.local.outputs.aws_vpc_tfer--vpc-0afaa249c2c5abb82_id}"
}

resource "aws_subnet" "tfer--subnet-0f5ed940db4881191" {
  assign_ipv6_address_on_creation                = "false"
  cidr_block                                     = "10.0.10.0/24"
  enable_dns64                                   = "false"
  enable_resource_name_dns_a_record_on_launch    = "false"
  enable_resource_name_dns_aaaa_record_on_launch = "false"
  ipv6_native                                    = "false"
  map_customer_owned_ip_on_launch                = "false"
  map_public_ip_on_launch                        = "false"
  private_dns_hostname_type_on_launch            = "ip-name"

  tags = {
    Environment = "production"
    Name        = "public-subnet-a"
  }

  tags_all = {
    Environment = "production"
    Name        = "public-subnet-a"
  }

  vpc_id = "${data.terraform_remote_state.local.outputs.aws_vpc_tfer--vpc-0afaa249c2c5abb82_id}"
}
