require 'rails_helper'

RSpec.describe "Api::V1::Relationships", type: :request do
  context "有効なリクエスト" do
    it "ログインすると、他のユーザーをフォローできること" do
      current_user = FactoryBot.create(:user)
      another_user = FactoryBot.create(:user)
      login current_user
      auth_params = get_auth_params_from_login_response_headers(response)
      post api_v1_user_relationships_path(user_id: another_user.id),
      headers: auth_params
      expect(response).to have_http_status(200)
    end
    it "フォローを解除できること" do
      current_user = FactoryBot.create(:user)
      another_user = FactoryBot.create(:user)
      login current_user
      auth_params = get_auth_params_from_login_response_headers(response)
      post api_v1_user_relationships_path(user_id: another_user.id),
      headers: auth_params
      delete api_v1_user_relationships_path(user_id: another_user.id),
      headers: auth_params
      expect(response).to have_http_status(200)
    end
  end

  context "無効なリクエスト" do
    it "ログインしていなければ、他のユーザーをフォローできないこと" do
      another_user = FactoryBot.create(:user)
      post api_v1_user_relationships_path(user_id: another_user.id)
      expect(response).to_not have_http_status(200)
    end
  end
end