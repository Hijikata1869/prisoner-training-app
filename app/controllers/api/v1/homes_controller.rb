module Api
  module V1
    class HomesController < ApplicationController
      def index
        users = User.all
        training_logs = TrainingLog.all.order(id: "DESC").limit(4)
        render json: {
          users: users,
          trainingLogs: training_logs
        }, status: :ok
      end
    end
  end
end