module Api
  module V1
    class UsersController < ApplicationController

      before_action :authenticate_api_v1_user!, except: [:index, :follows, :followers]

      def index
        users = User.all
        current_user = current_api_v1_user

        render json: {
          users: users,
          currentUser: current_user
        }, status: :ok
      end

      def show
        user = User.find(params[:id])
        current_user = current_api_v1_user
        user_training_logs = TrainingLog.where(user_id: user.id).order(id: "DESC").limit(6)
        bookmarked_advices = user.bookmark_advices

        render json: {
          user: user,
          currentUser: current_user,
          userTrainingLogs: user_training_logs,
          bookmarkedAdvices: bookmarked_advices
        }, status: :ok
      end

      def update
        user = current_api_v1_user
        
        if user.update!(update_params)
          render json: {
            user: user
          }, status: :ok
        else
          render json: {
            message: "アップデートに失敗しました"
          }, status: :bad_request
        end

      end

      def follows
        user = User.find(params[:id])
        user_followings = user.followings
        render json: {
          userFollowings: user_followings
        }, status: :ok
      end

      def followers
        user = User.find(params[:id])
        user_followers = user.followers
        render json: {
          userFollowers: user_followers
        }, status: :ok
      end


      private
      def update_params
        params.permit(:email, :password, :nickname, :introduction, :image)
      end

    end
  end
end 