module Api
  module V1
    class TrainingLogsController < ApplicationController

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

    end
  end
end 