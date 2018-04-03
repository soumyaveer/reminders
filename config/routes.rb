require "sidekiq/web"

Rails.application.routes.draw do
  namespace :api do
    resources :reminders
  end

  mount Sidekiq::Web => "/sidekiq"
end
