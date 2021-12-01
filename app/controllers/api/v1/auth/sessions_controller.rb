class Api::V1::Auth::SessionsController < DeviseTokenAuth::SessionsController

  def guest_sign_in

    user = User.find_or_create_by!(email: 'guest@example.com') do |user|
      user.nickname = "ゲスト"
      user.password = SecureRandom.urlsafe_base64
    end

    loged_in_user = sign_in(user)
    token = user.create_new_auth_token

    render json: {
      user: loged_in_user,
      token: token
    }, status: :ok

  end

end
