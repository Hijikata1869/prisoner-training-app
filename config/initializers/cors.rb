Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:3001', 'https://www.prisoner-training-app.com', 'https://35.73.84.155'

    resource '*',
        headers: :any,
        expose: ["access-token", "expiry", "token-type", "uid", "client"],
        methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
