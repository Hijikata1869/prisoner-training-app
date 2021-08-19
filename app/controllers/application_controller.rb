class ApplicationController < ActionController::API
        # CSRFトークン検証をスキップ
        skip_before_action :verify_authenticity_token, raise: false
        include DeviseTokenAuth::Concerns::SetUserByToken
end
