module Api
  module V1
    class TrainingLogsController < ApplicationController

      before_action :authenticate_api_v1_user!, except: [:index, :show]

      def index
        training_logs = TrainingLog.all.order(id: "DESC")

        render json: {
          trainingLogs: training_logs
        }, status: :ok
      end

      def show
        training_log = TrainingLog.find(params[:id])
        training_log_likes = training_log.likes

        render json: {
          training_log: training_log,
          trianing_log_likes: training_log_likes
        }, status: :ok
      end

      def create
        if TrainingLog.create!(post_params)
          render json: {
            message: "登録成功"
          }, status: :ok
        else
          render json: {
            message: "トレーニングを登録できませんでした"
          }, status: :bad_request
        end
      end

      def destroy
        training_log = TrainingLog.find(params[:id])
        if current_api_v1_user.id == training_log.user_id
          training_log.destroy
          render json: {
            message: "削除完了"
          }, status: :ok
        else
          render json: {
            message: "削除できませんでした"
          }, status: :bad_request
        end
      end

      private
      def post_params
        params.permit(:user_id, :training_menu, :step, :repetition, :set, :memo)
      end

    end
  end
end 