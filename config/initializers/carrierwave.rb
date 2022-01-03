require 'carrierwave/storage/abstract'
require 'carrierwave/storage/file'
require 'carrierwave/storage/fog'

CarrierWave.configure do |config|
  if Rails.env.production?
    config.fog_credentials = {
      provider: 'AWS',
      aws_access_key_id: Rails.application.credentials.s3[:s3_access_key_id],
      aws_secret_access_key: Rails.application.credentials.s3[:s3_secret_access_key],
      region: 'ap-northeast-1'
    }

    config.fog_directory  = 'prisoner-training-app-images'
    config.cache_storage = :fog
  else
    config.asset_host = "http://localhost:3000"
    config.storage = :file
    config.cache_storage = :file
  end
end