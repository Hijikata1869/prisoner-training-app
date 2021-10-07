module Api
  module V1
    class TrainingLogsController < ApplicationController

      before_action :authenticate_api_v1_user!, except: [:index, :show]

      def index
        training_logs = TrainingLog.all

        render json: {
          training_logs: training_logs
        }, status: :ok
      end

      def show
        training_log = TrainingLog.find(params[:id])

        render json: {
          training_log: training_log
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

      private
      def post_params
        params.permit(:user_id, :training_menu, :step, :repetition, :set, :memo)
      end

    end
  end
end 