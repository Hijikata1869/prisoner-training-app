# config valid for current version and patch releases of Capistrano
lock "~> 3.12.1"

# アプリ名（なんでもOK）
set :application, "prisoner-training-app"

# GitHubリポジトリ情報
set :repo_url, "git@github.com:Hijikata1869/prisoner-training-app.git"

# ユーザーはdeployにする
set :user, "hijikata"

# rbenvをユーザーレベルでインストール
set :rbenv_type, :user

# rubyのバージョンを指定
set :rbenv_ruby, File.read('.ruby-version').strip
set :rbenv_prefix, "RBENV_ROOT=#{fetch(:rbenv_path)} RBENV_VERSION=#{fetch(:rbenv_ruby)} #{fetch(:rbenv_path)}/bin/rbenv exec"

# 並列数
set :bundle_jobs, 2

# リリース間で共有するリソースのファイルパスを書く
append :linked_files, "config/master.key"

# 各リリースが共通で読み込むディレクトリを設定する
append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets",  '.bundle'