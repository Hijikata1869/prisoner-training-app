module Api
  module V1
    class BookmarksController < ApplicationController
      before_action :authenticate_api_v1_user!

      def create
        bookmark = current_api_v1_user.bookmarks.build(advice_id: params[:advice_id])
        bookmark.save
        render json: {
          message: "ブックマーク完了"
        }, status: :ok
      end

      def destroy
        bookmark = Bookmark.find_by(advice_id: params[:advice_id], user_id: current_api_v1_user.id)
        bookmark.destroy
        render json: {
          message: "削除完了"
        }, status: :ok
      end

    end
  end
end