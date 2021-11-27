module Api
  module V1
    class BookmarksController < ApplicationController
      before_action :authenticate_api_v1_user!

      def show
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
    
    end
  end
end