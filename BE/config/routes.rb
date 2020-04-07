Rails.application.routes.draw do
  resources :followers
  resources :clients
  resources :therapists
  resources :posts
  


  post 'signup', to: 'users#create', as: '/signup'

  post 'login', to: 'auth#create', as: '/login'
  
  get 'current_user', to: 'auth#show', as: '/current_user'
  # /therapist/4


  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
