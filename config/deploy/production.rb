# サーバの設定
server "prisoner-training-app.com", user: "deploy", roles: %w{web db app}

# ssh接続設定
set :ssh_options, {
  user: fetch(:user),
  port: 22,
  keys: %w(~/.ssh/pta_key_rsa),
  forward_agent: true,
  auth_methods: %w[publickey]
}