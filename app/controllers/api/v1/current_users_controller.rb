module Api
  module V1
    class CurrentUsersController < ApplicationController
      before_action :authenticate_api_v1_user!

      def show
        current_user = current_api_v1_user
        current_user_bookmarks = current_api_v1_user.bookmarks
        current_user_likes = current_api_v1_user.likes

        render json: {
          currentUser: current_user,
          currentUserBookmarks: current_user_bookmarks,
          currentUserLikes: current_user_likes,
        }, status: :ok
      end

      def followings
        current_user_followings = current_api_v1_user.followings
        if current_user_followings.present?
          render json: {
            currentUserFollowings: current_user_followings
          }, status: :ok
        else
          render json: {
            message: 'フォローしているユーザーはいません'
          }, staus: :bad_request
        end
      end

    end
  end
end
