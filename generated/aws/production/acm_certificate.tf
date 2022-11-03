resource "aws_acm_certificate" "tfer--688542ef-16c5-4885-b626-3621458d880e_www-002E-prisoner-training-app-002E-com" {
  domain_name = "www.prisoner-training-app.com"

  options {
    certificate_transparency_logging_preference = "ENABLED"
  }

  subject_alternative_names = ["www.prisoner-training-app.com"]

  tags = {
    Environment = "production"
  }

  tags_all = {
    Environment = "production"
  }

  validation_method = "DNS"
}
