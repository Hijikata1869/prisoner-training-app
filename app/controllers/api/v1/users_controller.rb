module Api
  module V1
    class UsersController < ApplicationController
      before_action :authenticate_api_v1_user!, except: %i[index show follows followers training_logs questions advices bookmark_advices body_compositions]
      before_action :ensure_normal_user, only: %i[update destroy]

      def index
        users = User.all
        render json: {
          users: users
        }, status: :ok
      end

      def show
        user = User.find(params[:id])

        render json: {
          user: user
        }, status: :ok
      end

      def update
        user = current_api_v1_user

        if user.update!(update_params)
          render json: {
            user: user
          }, status: :ok
        else
          render json: {
            message: 'アップデートに失敗しました'
          }, status: :bad_request
        end
      end

      def follows
        user = User.find(params[:id])
        user_followings = user.followings
        render json: {
          userFollowings: user_followings
        }, status: :ok
      end

      def followers
        user = User.find(params[:id])
        user_followers = user.followers
        render json: {
          userFollowers: user_followers
        }, status: :ok
      end

      def training_logs
        user_training_logs = TrainingLog.where(user_id: params[:id]).order(id: 'DESC')
        if user_training_logs.present?
          render json: {
            userTrainingLogs: user_training_logs
          }, status: :ok
        else
          render json: {
            message: 'トレーニング記録が存在しません'
          }, status: :bad_request
        end
      end

      def questions
        user_questions = Question.where(user_id: params[:id]).order(id: 'DESC')
        if user_questions.present?
          render json: {
            userQuestions: user_questions
          }, status: :ok
        else
          render json: {
            message: '質問が存在しません'
          }, status: :bad_request
        end
      end

      def advices
        user_advices = Advice.where(user_id: params[:id])
        if user_advices.present?
          render json: {
            userAdvices: user_advices
          }, status: :ok
        else
          render json: {
            message: 'アドバイスは存在しません'
          }, status: :bad_request
        end
      end

      def bookmark_advices
        user = User.find(params[:id])
        user_bookmark_advices = user.bookmark_advices
        if user_bookmark_advices.present?
          render json: {
            userBookmarkAdvices: user_bookmark_advices
          }, status: :ok
        else
          render json: {
            message: 'ブックマークしたアドバイスはありません'
          }, status: :bad_request
        end
      end

      def body_compositions
        user_body_compositions = BodyComposition.where(user_id: params[:id])
        if user_body_compositions.present?
          render json: {
            userBodyCompositions: user_body_compositions
          }, status: :ok
        else
          render json: {
            message: '体組成記録が存在しません'
          }, status: :bad_request
        end
      end

      private

      def update_params
        params.permit(:email, :password, :nickname, :introduction, :image)
      end

      def ensure_normal_user
        if @resource.email == 'guest@example.com'
          render json: {
            message: 'ゲストユーザーは更新・削除できません'
          }, status: :bad_request
        end
      end
    end
  end
end
