module Api
  module V1
    class CurrentUsersController < ApplicationController
      before_action :authenticate_api_v1_user!

      def show
        current_user = current_api_v1_user
        current_user_likes = current_api_v1_user.likes
        render json: {
          currentUser: current_user,
          currentUserLikes: current_user_likes
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

      def bookmarks
        current_user_bookmarks = current_api_v1_user.bookmarks
        if current_user_bookmarks.present?
          render json: {
            currentUserBookmarks: current_user_bookmarks
          }, status: :ok
        else
          render json: {
            message: 'ブックマークはありません'
          }, status: :bad_request
        end
      end

      def likes
        current_user_likes = current_api_v1_user.likes
        render json: {
          currentUserLikes: current_user_likes
        }, stauts: :ok
      end

    end
  end
end
