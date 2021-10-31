module Api
  module V1
    class RelationshipsController < ApplicationController
      before_action :authenticate_api_v1_user!
    end
  end
end
