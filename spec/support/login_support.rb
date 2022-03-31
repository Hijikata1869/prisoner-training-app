module LoginSupport
  def login(user)
    post api_v1_user_session_path, params: {
      email: user.email,
      password: user.password
    }
  end

  def get_auth_params_from_login_response_headers(response)
    token = response.headers['access-token']
    client = response.headers['client']
    uid = response.headers['uid']
    {
      'access-token': token,
      'client': client,
      'uid': uid
    }
  end
end

RSpec.configure do |config|
  config.include LoginSupport
end
