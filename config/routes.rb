Rails.application.routes.draw do
  namespace :api do
    resources :reminders
  end
end
