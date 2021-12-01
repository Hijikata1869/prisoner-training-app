class Api::V1::Auth::PasswordsController < DeviseTokenAuth::PasswordsController
  before_action :authenticate_api_v1_user!, only: :update
  before_action :ensure_normal_user, only: :update

  private
  def ensure_normal_user
    if current_api_v1_user.email == 'guest@example.com'
      render json: {
        message: "ゲストユーザーのパスワードは変更できません"
      }, status: :bad_request
    end
  end

end