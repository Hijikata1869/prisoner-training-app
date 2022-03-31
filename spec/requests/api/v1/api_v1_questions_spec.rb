require 'rails_helper'

RSpec.describe 'Api::V1::Questions', type: :request do
  context '有効なリクエスト' do
    it 'ログイン状態であれば質問が作成できること' do
      user = FactoryBot.create(:user)
      login user
      auth_params = get_auth_params_from_login_response_headers(response)
      post api_v1_questions_path,
           headers: auth_params,
           params: {
             user_id: user.id,
             question: 'question',
             training_menu: 'レッグレイズ',
             step: 'ステップ３'
           }
      expect(response).to have_http_status(200)
    end
    it '質問を削除できること' do
      user = FactoryBot.create(:user)
      login user
      auth_params = get_auth_params_from_login_response_headers(response)
      post api_v1_questions_path,
           headers: auth_params,
           params: {
             user_id: user.id,
             question: 'question',
             training_menu: 'レッグレイズ',
             step: 'ステップ３'
           }
      json = JSON.parse(response.body)
      question_id = json['question']['id']
      delete api_v1_question_path(id: question_id),
             headers: auth_params
      expect(response).to have_http_status(200)
    end
  end

  context '無効なリクエスト' do
    it 'ログインしていなければ、質問ができないこと' do
      user = FactoryBot.create(:user)
      post api_v1_questions_path,
           params: {
             user_id: user.id,
             question: 'question',
             training_menu: 'レッグレイズ',
             step: 'ステップ３'
           }
      expect(response).to_not have_http_status(200)
    end
    it 'questionが存在しなければ、質問できないこと' do
      user = FactoryBot.create(:user)
      login user
      auth_params = get_auth_params_from_login_response_headers(response)
      post api_v1_questions_path,
           headers: auth_params,
           params: {
             user_id: user.id,
             question: nil,
             training_menu: 'レッグレイズ',
             step: 'ステップ３'
           }
      expect(response).to_not have_http_status(200)
    end
    it 'training_menuが存在しなければ、質問できないこと' do
      user = FactoryBot.create(:user)
      login user
      auth_params = get_auth_params_from_login_response_headers(response)
      post api_v1_questions_path,
           headers: auth_params,
           params: {
             user_id: user.id,
             question: 'question',
             training_menu: nil,
             step: 'ステップ３'
           }
      expect(response).to_not have_http_status(200)
    end
    it 'stepが存在しなければ、質問できないこと' do
      user = FactoryBot.create(:user)
      login user
      auth_params = get_auth_params_from_login_response_headers(response)
      post api_v1_questions_path,
           headers: auth_params,
           params: {
             user_id: user.id,
             question: 'question',
             training_menu: 'レッグレイズ',
             step: nil
           }
      expect(response).to_not have_http_status(200)
    end
  end
end
