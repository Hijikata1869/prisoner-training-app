module Api
  module V1
    class UsersController < ApplicationController

      def index
        users = User.all

        render json: {
          users: users
        }, status: :ok
      end

      def show
        user = User.find(params[:id])
        user_training_logs = user.training_logs

        render json: {
          user: user,
          training_logs: user_training_logs
        }, status: :ok
      end

    end
  end
end 