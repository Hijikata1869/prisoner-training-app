module Api
  module V1
    class QuestionsController < ApplicationController
      before_action :authenticate_api_v1_user!, except: [:index]

      def index
        questions = Question.all.order(id: 'DESC')
        render json: {
          questions: questions
        }, status: :ok
      end

      def create
        question = Question.new(post_params)
        if question.save
          render json: {
            message: '登録成功',
            question: question
          }, status: :ok
        else
          render json: {
            message: '質問を投稿できませんでした'
          }, status: 422
        end
      end

      def show
        question = Question.find(params[:id])
        advices = Advice.where(question_id: params[:id])
        render json: {
          question: question,
          advices: advices
        }, status: :ok
      end

      def destroy
        question = Question.find(params[:id])
        if current_api_v1_user.id == question.user_id
          question.destroy
          render json: {
            message: 'completed'
          }, status: :ok
        else
          render json: {
            message: 'failed'
          }, status: :bad_request
        end
      end

      private

      def post_params
        params.permit(:user_id, :question, :training_menu, :step)
      end
    end
  end
end
