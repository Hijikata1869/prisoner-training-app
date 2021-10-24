class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController

  before_action :authenticate_api_v1_user!

  def edit
    current_user = current_api_v1_user
    current_user_bookmarks = current_api_v1_user.bookmarks

    render json: {
      currentUser: current_user,
      currentUserBookmarks: current_user_bookmarks
    }, status: :ok
  end

  private

  def sign_up_params
    params.require(:registration).permit(:email, :password, :nickname, :introduction)
  end
end
