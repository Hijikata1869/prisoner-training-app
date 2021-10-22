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

    end
  end
end