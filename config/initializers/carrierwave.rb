CarrierWave.configure do |config|
  if Rails.env.production?
    config.storage    = :aws
    config.aws_bucket = 'prisoner-training-app-images'
    config.aws_acl    = 'public-read'
 
    # The maximum period for authenticated_urls is only 7 days.
    config.aws_authenticated_url_expiration = 60 * 60 * 24 * 7
 
    # Set custom options such agit s cache control to leverage browser caching
    config.aws_attributes = {
      expires: 1.week.from_now.httpdate,
      cache_control: 'max-age=604800'
    }
 
    # aws credential
    config.aws_credentials = {
      access_key_id:     Rails.application.credentials.s3[:s3_access_key_id],
      secret_access_key: Rails.application.credentials.s3[:s3_secret_access_key],
      region: 'ap-northeast-1'
    }
  else
    # テスト時はローカルにファイルを保存する
    config.storage = :file
  end
end
 
CarrierWave::SanitizedFile.sanitize_regexp = /[^[:word:]\.\-\+]/