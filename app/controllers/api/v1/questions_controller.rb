module Api
  module V1
    class QuestionsController < ApplicationController
      before_action :authenticate_api_v1_user!, except: [:index]

      def index
        users = User.all
        questions = Question.all.order(id: "DESC")
        render json: {
          users: users,
          questions: questions
        }, status: :ok
      end

      def create
        if Question.create!(post_params)
          render json: {
            message: "登録成功"
          }, status: :ok
        else
          render json: {
            message: "質問を投稿できませんでした"
          }, status: :bad_request
        end
      end

      def show
        question = Question.find(params[:id])
        render json: {
          question: question
        }, status: :ok
      end

      private
      def post_params
        params.permit(:user_id, :question, :training_menu, :step)
      end

    end
  end
end