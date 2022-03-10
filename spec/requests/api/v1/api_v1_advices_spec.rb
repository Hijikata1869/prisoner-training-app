require 'rails_helper'

RSpec.describe "Api::V1::Advices", type: :request do
  context "有効なリクエスト" do
    it "ログインしていれば、アドバイスを作成できること" do
      question = FactoryBot.create(:question)
      user = FactoryBot.create(:user)
      login user
      auth_params = get_auth_params_from_login_response_headers(response)
      post api_v1_advices_path,
      headers: auth_params,
      params:{
        user_id: user.id,
        question_id: question.id,
        advice: "An advice."
      }
      expect(response).to have_http_status(200)
    end
    it "アドバイスを削除できること" do
      question = FactoryBot.create(:question)
      user = FactoryBot.create(:user)
      login user
      auth_params = get_auth_params_from_login_response_headers(response)
      post api_v1_advices_path,
      headers: auth_params,
      params:{
        user_id: user.id,
        question_id: question.id,
        advice: "An advice."
      }
      json = JSON.parse(response.body)
      advice_id = json["advice"]["id"]
      delete api_v1_advice_path(id: advice_id),
      headers: auth_params
      expect(response).to have_http_status(200)
    end
  end

  context "無効なリクエスト" do
    it "ログインしていなければ、アドバイスを投稿できないこと" do
      question = FactoryBot.create(:question)
      user = FactoryBot.create(:user)
      post api_v1_advices_path,
      params:{
        user_id: user.id,
        question_id: question.id,
        advice: "An advice."
      }
      expect(response).to_not have_http_status(200)
    end
    it "adviceが存在しなければ、アドバイスを投稿できないこと" do
      question = FactoryBot.create(:question)
      user = FactoryBot.create(:user)
      login user
      auth_params = get_auth_params_from_login_response_headers(response)
      post api_v1_advices_path,
      headers: auth_params,
      params:{
        user_id: user.id,
        question_id: question.id,
        advice: nil
      }
      expect(response).to_not have_http_status(200)
    end
  end
end