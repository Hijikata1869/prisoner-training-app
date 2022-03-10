require 'rails_helper'

RSpec.describe "Api::V1::TrainingLogs", type: :request do
  context "有効なリクエスト" do
    it "ログインしたユーザーであれば、トレーニング記録が作成できること" do
      user = FactoryBot.create(:user)
      login user
      auth_params = get_auth_params_from_login_response_headers(response)
      post api_v1_training_logs_path, 
      headers: auth_params,
      params: {
        user_id: user.id,
        training_menu: "プッシュアップ",
        step: "ステップ３",
        repetition: "２０回",
        set: "３セット"
      }
      expect(response).to have_http_status(200)
    end
    it "memoが200文字以内であればトレーニング記録が作成できること" do
      valid_memo = "a" * 200
      user = FactoryBot.create(:user)
      login user
      auth_params = get_auth_params_from_login_response_headers(response)
      post api_v1_training_logs_path, 
      headers: auth_params,
      params: {
        user_id: user.id,
        training_menu: "プッシュアップ",
        step: "ステップ３",
        repetition: "２０回",
        set: "３セット",
        memo: valid_memo
      }
      expect(response).to have_http_status(200)
    end
    it "トレーニング記録を削除できること" do
      user = FactoryBot.create(:user)
      login user
      auth_params = get_auth_params_from_login_response_headers(response)
      post api_v1_training_logs_path,
      headers: auth_params,
      params: {
        user_id: user.id,
        training_menu: "プッシュアップ",
        step: "ステップ３",
        repetition: "２０回",
        set: "３セット"
      }
      json = JSON.parse(response.body)
      training_log_id = json["trainingLog"]["id"]
      delete api_v1_training_log_path(id: training_log_id),
      headers: auth_params
      expect(response).to have_http_status(200)
    end
  end

  context "無効なリクエスト" do
    it "ログインしていなければ、トレーニング記録を作成できないこと" do
      user = FactoryBot.create(:user)
      post api_v1_training_logs_path,
      params: {
        user_id: user.id,
        training_menu: "プッシュアップ",
        step: "ステップ３",
        repetition: "２０回",
        set: "３セット"
      }
      expect(response).to_not have_http_status(200)
    end
    it "training_menuが存在しなければ、トレーニング記録を作成できないこと" do
      user = FactoryBot.create(:user)
      login user
      auth_params = get_auth_params_from_login_response_headers(response)
      post api_v1_training_logs_path,
      headers: auth_params,
      params: {
        user_id: user.id,
        training_menu: nil,
        step: "ステップ３",
        repetition: "２０回",
        set: "３セット"
      }
      expect(response.status).to_not eq(200)
    end
    it "stepが存在しなければ、トレーニング記録を作成できないこと" do
      user = FactoryBot.create(:user)
      login user
      auth_params = get_auth_params_from_login_response_headers(response)
      post api_v1_training_logs_path,
      headers: auth_params,
      params: {
        user_id: user.id,
        training_menu: "プッシュアップ",
        step: nil,
        repetition: "２０回",
        set: "３セット"
      }
      expect(response.status).to_not eq(200)
    end
    it "repetitionが存在しなければ、トレーニング記録を作成できないこと" do
      user = FactoryBot.create(:user)
      login user
      auth_params = get_auth_params_from_login_response_headers(response)
      post api_v1_training_logs_path,
      headers: auth_params,
      params: {
        user_id: user.id,
        training_menu: "プッシュアップ",
        step: "ステップ３",
        repetition: nil,
        set: "３セット"
      }
      expect(response.status).to_not eq(200)
    end
    it "setが存在しなければ、トレーニング記録を作成できないこと" do
      user = FactoryBot.create(:user)
      login user
      auth_params = get_auth_params_from_login_response_headers(response)
      post api_v1_training_logs_path,
      headers: auth_params,
      params: {
        user_id: user.id,
        training_menu: "プッシュアップ",
        step: "ステップ３",
        repetition: "２０回",
        set: nil
      }
      expect(response.status).to_not eq(200)
    end
    it "memoが201文字以上であればトレーニング記録が作成できないこと" do
      valid_memo = "a" * 201
      user = FactoryBot.create(:user)
      login user
      auth_params = get_auth_params_from_login_response_headers(response)
      post api_v1_training_logs_path, 
      headers: auth_params,
      params: {
        user_id: user.id,
        training_menu: "プッシュアップ",
        step: "ステップ３",
        repetition: "２０回",
        set: "３セット",
        memo: valid_memo
      }
      expect(response).to_not have_http_status(200)
    end
  end
end