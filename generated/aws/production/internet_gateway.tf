resource "aws_internet_gateway" "tfer--igw-0f9864e58bc3a0ecc" {
  tags = {
    Environment = "production"
    Name        = "pta-gateway"
  }

  tags_all = {
    Environment = "production"
    Name        = "pta-gateway"
  }

  vpc_id = "${data.terraform_remote_state.local.outputs.aws_vpc_tfer--vpc-0afaa249c2c5abb82_id}"
}
