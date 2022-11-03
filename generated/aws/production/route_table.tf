resource "aws_route_table" "tfer--rtb-036f24e2b4d658c56" {
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = "igw-0f9864e58bc3a0ecc"
  }

  tags = {
    Environment = "production"
    Name        = "pta-route-table"
  }

  tags_all = {
    Environment = "production"
    Name        = "pta-route-table"
  }

  vpc_id = "${data.terraform_remote_state.local.outputs.aws_vpc_tfer--vpc-0afaa249c2c5abb82_id}"
}
