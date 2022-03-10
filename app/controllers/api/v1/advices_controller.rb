module Api
  module V1
    class AdvicesController < ApplicationController
      before_action :authenticate_api_v1_user!, except: [:index]

      def index
        advices = Advice.all

        render json: {
          advices: advices
        }, status: :ok
      end

      def create
        advice = Advice.new(post_params)
        if advice.save
          render json: {
            message: "登録成功",
            advice: advice
          }, status: :ok
        else
          render json: {
            message: "アドバイスを投稿できませんでした"
          }, status: 422
        end
      end

      def destroy
        advice = Advice.find(params[:id])
        if current_api_v1_user.id == advice.user_id
          advice.destroy
          render json: {
            message: "completed"
          }, status: :ok
        else
          render json: {
            message: "incomplete"
          }, status: :bad_request
        end
      end

      private
      def post_params
        params.permit(:user_id, :question_id, :advice)
      end

    end
  end
end