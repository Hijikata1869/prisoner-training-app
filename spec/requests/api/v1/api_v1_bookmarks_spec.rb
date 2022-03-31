require 'rails_helper'

RSpec.describe 'Api::V1::Bookmarks', type: :request do
  context '有効なリクエスト' do
    it 'ログイン中のユーザーは、アドバイスをブックマークできること' do
      advice = FactoryBot.create(:advice)
      user = FactoryBot.create(:user)
      login user
      auth_params = get_auth_params_from_login_response_headers(response)
      post api_v1_advice_bookmarks_path(advice_id: advice.id),
           headers: auth_params
      expect(response).to have_http_status(200)
    end
    it 'アドバイスのブックマークを解除できること' do
      advice = FactoryBot.create(:advice)
      user = FactoryBot.create(:user)
      login user
      auth_params = get_auth_params_from_login_response_headers(response)
      post api_v1_advice_bookmarks_path(advice_id: advice.id),
           headers: auth_params
      delete api_v1_advice_bookmarks_path(advice_id: advice.id),
             headers: auth_params
      expect(response).to have_http_status(200)
    end
  end

  context '無効なリクエスト' do
    it 'ユーザーはログインしていなければ、アドバイスをブックマークできないこと' do
      advice = FactoryBot.create(:advice)
      post api_v1_advice_bookmarks_path(advice_id: advice.id)
      expect(response).to_not have_http_status(200)
    end
  end
end
