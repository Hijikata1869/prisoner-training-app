resource "aws_route53_zone" "tfer--Z0469710YFN6H630JRIE_prisoner-training-app-002E-com" {
  comment       = "HostedZone created by Route53 Registrar"
  force_destroy = "false"
  name          = "prisoner-training-app.com"

  tags = {
    Environment = "production"
  }

  tags_all = {
    Environment = "production"
  }
}
