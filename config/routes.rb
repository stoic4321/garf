Rails.application.routes.draw do

  #
  # API
  #

  namespace :api, defaults: { format: :json } do
    get 'status' => 'status#index'

    scope ':key' do
      get 'status' => 'status#index'

      resources :journeys, only: [:create, :update, :destroy]

      get 'conditions' => 'structures#conditions'
      get 'actions'    => 'structures#actions'
      get 'all'        => 'structures#all'
    end
  end

  #
  # Admin
  #

  namespace :admin do
    get '', to: 'home#index', as: :home

    resources :api_keys
    resources :journeys
    resources :structures do
      get :tree, on: :collection
    end
    resources :users
  end

  #
  # Devise
  #

  devise_for :users, controllers: {
    confirmations: 'users/confirmations',
    passwords: 'users/passwords',
    registrations: 'users/registrations',
    sessions: 'users/sessions',
    unlocks: 'users/unlocks'
  }

  devise_scope :user do
    get 'sign_in', to: 'users/sessions#new'
    get 'sign_up', to: 'users/registrations#new'
  end

  #
  # Application
  #
  get 'j/:token',   to: 'home#share',  as: :share
  get 'conditions', to: 'home#conditions', as: :conditions
  get 'actions',    to: 'home#actions', as: :actions
  get 'save',       to: 'home#save', as: :save
  get 'journeys',   to: 'home#journeys', as: :journeys
  get 'raw',        to: 'home#raw', as: :raw

  resources :journeys, only: [:index, :show, :destroy]

  #
  # Defaults
  #

  root to: "home#index"
end
