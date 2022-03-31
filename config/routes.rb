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
      end

      resources :questions

      resources :training_logs do
        resource :likes, only: %i[create destroy]
      end
      resources :advices do
        resource :bookmarks, only: %i[create destroy]
      end

      get '/likes', to: 'likes#index'
      get '/current_user', to: 'current_users#show'

      root to: 'homes#index'
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '*path', to: 'application#fallback_index_html', constraints: lambda { |request|
    !request.xhr? && request.format.html?
  }
end
