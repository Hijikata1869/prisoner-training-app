module Api
  module V1
    class BodyCompositionsController < ApplicationController
      before_action :authenticate_api_v1_user!, except: %i[show]

      def create
        body_composition = BodyComposition.new(post_params)
        if body_composition.save
          render json: {
            message: '登録成功',
            bodyComposition: body_composition
          }, status: :ok
        else
          render json: {
            message: '登録できませんでした'
          }, status: 422
        end
      end

      def destroy
        body_composition = BodyComposition.find(params[:id])
        if current_api_v1_user.id == body_composition.user_id
          body_composition.destroy
          render json: {
            message: '削除完了'
          }, status: :ok
        else
          render json: {
            message: '削除できませんでした'
          }, status: :bad_request
        end
      end

      def show
        user_body_compositions = BodyComposition.where(user_id: params[:user_id])
        if user_body_compositions.present?
          render json: {
            userBodyCompositions: user_body_compositions
          }, status: :ok
        else
          render json: {
            message: 'データが存在しません'
          }, status: :bad_request
        end
      end

      private
      def post_params
        params.permit(:user_id, :weight, :body_fat)
      end
    end
  end
end