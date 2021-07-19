module Api
  module V1
    class HomesController < ApplicationController
      def index
        training_logs = TrainingLog.all

        render json: {
          training_logs: training_logs
        }, status: :ok
      end
    end
  end
end