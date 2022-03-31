class ApplicationController < ActionController::API
  # CSRFトークン検証をスキップ
  skip_before_action :verify_authenticity_token, raise: false
  include DeviseTokenAuth::Concerns::SetUserByToken

  include ActionController::MimeResponds
  def fallback_index_html
    respond_to do |format|
      format.html { render body: Rails.root.join('public/index.html').read }
    end
  end
end
