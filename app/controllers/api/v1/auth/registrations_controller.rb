class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController

  before_action :authenticate_api_v1_user!

  def edit
    current_user = current_api_v1_user

    render json: {
      currentUser: current_user
    }, status: :ok
  end

  private

  def sign_up_params
    params.require(:registration).permit(:email, :password, :nickname, :introduction)
  end
end
