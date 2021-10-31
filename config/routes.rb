Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }
      resources :users do
        resource :relationships, only: [:create, :destroy]
        get :follows, on: :member
        get :followers, on: :member
      end

      resources :questions

      resources :training_logs do
        resource :likes, only: [:create, :destroy]
      end
      resources :advices do
        resource :bookmarks, only: [:create, :destroy]
      end

      root to: "homes#index"
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
