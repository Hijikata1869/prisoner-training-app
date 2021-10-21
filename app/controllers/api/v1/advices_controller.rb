module Api
  module V1
    class AdvicesController < ApplicationController
      before_action :authenticate_api_v1_user!

      def create
        if Advice.create!(post_params)
          render json: {
            message: "登録成功"
          }, status: :ok
        else
          render json: {
            message: "アドバイスを投稿できませんでした"
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