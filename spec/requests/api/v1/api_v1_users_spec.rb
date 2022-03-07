require 'rails_helper'

RSpec.describe "Api::V1::Users", type: :request do
  it "nickname、email、passwordがあればユーザーを作成できること" do
    post api_v1_user_registration_path, params: {
      nickname: "user",
      email: "user@example.com",
      password: "password"
    }
    expect(response).to have_http_status(200)
  end

  it "nicknameがなければユーザーを作成できないこと" do
    post api_v1_user_registration_path, params: {
      nickname: nil,
      email: "user@example.com",
      password: "password"
    }
    expect(response).to_not have_http_status(200)
  end

  it "emaiがなければユーザーを作成できないこと" do
    post api_v1_user_registration_path, params: {
      nickname: "user",
      email: nil,
      password: "password"
    }
    expect(response).to_not have_http_status(200)
  end

  it "passwordがなければユーザーを作成できないこと" do
    post api_v1_user_registration_path, params: {
      nickname: "user",
      email: "user@example.com",
      password: nil
    }
    expect(response).to_not have_http_status(200)
  end

  it "email、passwordがあればログインできること" do
    user = FactoryBot.create(:user)
    login user
    expect(response).to have_http_status(200)
  end

  it "ログアウトができること" do
    user = FactoryBot.create(:user)
    login user
    auth_params = get_auth_params_from_login_response_headers(response)
    delete destroy_api_v1_user_session_path, headers: auth_params
    expect(response).to have_http_status(200)
  end

  it "パスワードを更新できること" do
    user = FactoryBot.create(:user)
    login user
    auth_params = get_auth_params_from_login_response_headers(response)
    put api_v1_user_password_path,
    headers: auth_params,
    params: {
      password: "newpassword",
      password_confirmation: "newpassword"
    }
    json = JSON.parse(response.body)
    expect(response.status).to eq(200)
    expect(json['message']).to eq("Your password has been successfully updated.")
  end

  it "ログインしていなければパスワードを更新できないこと" do
    user = FactoryBot.create(:user)
    put api_v1_user_password_path, params: {
      password: 'newpassword',
      password_confirmation: 'newpassword'
    }
    expect(response.status).to_not eq(200)
  end

end
