module Api
  module V1
    class LikesController < ApplicationController
      before_action :authenticate_api_v1_user!

      def create
        like = current_api_v1_user.likes.build(training_log_id: params[:training_log_id])
        if like.save
          user_likes = current_api_v1_user.likes
          render json: {
            message: "complete",
            userLikes: user_likes
          }, status: :ok
        end
      end

      def destroy
        like = Like.find_by(training_log_id: params[:training_log_id], user_id: current_api_v1_user.id)
        like.destroy
        render json: {
          message: "削除完了"
        }, status: :ok
      end

    end
  end
end