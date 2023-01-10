Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations',
        sessions: 'api/v1/auth/sessions',
        passwords: 'api/v1/auth/passwords'
      }

      devise_scope :api_v1_user do
        post 'auth/guest_sign_in', to: 'auth/sessions#guest_sign_in'
      end

      resources :users do
        resource :relationships, only: %i[create destroy]
        get :follows, on: :member
        get :followers, on: :member
        get :training_logs, on: :member
        get :questions, on: :member
        get :advices, on: :member
        get :bookmark_advices, on: :member
        get :body_compositions, on: :member
        get :recent_training_logs, on: :member
      end

      resources :questions

      resources :training_logs do
        resource :likes, only: %i[create destroy]
        get :number_of_likes, on: :member
      end

      resources :advices do
        resource :bookmarks, only: %i[create destroy]
      end

      resources :body_compositions, only: %i[create destroy]

      get '/likes', to: 'likes#index'
      get '/current_user', to: 'current_users#show'
      get '/current_user/followings', to: 'current_users#followings'
      get '/current_user/bookmarks', to: 'current_users#bookmarks'
      get '/current_user/likes', to: 'current_users#likes'

      root to: 'homes#index'
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '*path', to: 'application#fallback_index_html', constraints: lambda { |request|
    !request.xhr? && request.format.html?
  }
end
