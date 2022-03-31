module Api
  module V1
    class RelationshipsController < ApplicationController
      before_action :authenticate_api_v1_user!

      def create
        unless current_api_v1_user.id == params[:user_id]
          follow = current_api_v1_user.active_relationships.build(follower_id: params[:user_id])
          follow.save
          render json: {
            message: 'completed'
          }, status: :ok
        end
      end

      def destroy
        follow = current_api_v1_user.active_relationships.find_by(follower_id: params[:user_id])
        follow.destroy
        render json: {
          message: 'completed'
        }, status: :ok
      end
    end
  end
end
