require 'rails_helper'

RSpec.describe 'Api::V1::Likes', type: :request do
  context '有効なリクエスト' do
    it 'ログイン中のユーザーはトレーニング記録に「いいね」ができること' do
      training_log = FactoryBot.create(:training_log)
      user = FactoryBot.create(:user)
      login user
      auth_params = get_auth_params_from_login_response_headers(response)
      post api_v1_training_log_likes_path(training_log_id: training_log.id),
           headers: auth_params
      expect(response).to have_http_status(200)
    end
    it 'ログイン中のユーザーはトレーニング記録に対する「いいね」を解除できること' do
      training_log = FactoryBot.create(:training_log)
      user = FactoryBot.create(:user)
      login user
      auth_params = get_auth_params_from_login_response_headers(response)
      post api_v1_training_log_likes_path(training_log_id: training_log.id),
           headers: auth_params
      delete api_v1_training_log_likes_path(training_log_id: training_log.id),
             headers: auth_params
    end
  end

  context '無効なリクエスト' do
    it 'ログインしていなければトレーニング記録に「いいね」ができないこと' do
      training_log = FactoryBot.create(:training_log)
      post api_v1_training_log_likes_path(training_log_id: training_log.id)
      expect(response).to_not have_http_status(200)
    end
  end
end
