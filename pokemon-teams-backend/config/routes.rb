Rails.application.routes.draw do
  resources :pokemons, only: [:create, :index, :show, :update, :destroy]
  resources :trainers, only: [:index]
  
  # get '/', to: 'trainers#index'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
