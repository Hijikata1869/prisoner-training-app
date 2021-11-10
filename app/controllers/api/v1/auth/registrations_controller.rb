class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController

  before_action :authenticate_api_v1_user!

  def edit
    current_user = current_api_v1_user
    current_user_bookmarks = current_api_v1_user.bookmarks
    current_user_likes = current_api_v1_user.likes
    current_user_followings = current_api_v1_user.followings

    render json: {
      currentUser: current_user,
      currentUserBookmarks: current_user_bookmarks,
      currentUserLikes: current_user_likes,
      currentUserFollowings: current_user_followings
    }, status: :ok
  end

  private

  def sign_up_params
    params.require(:registration).permit(:email, :password, :nickname, :introduction)
  end
end
