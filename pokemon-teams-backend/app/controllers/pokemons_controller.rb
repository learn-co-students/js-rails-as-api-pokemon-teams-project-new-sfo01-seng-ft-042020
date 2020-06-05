class PokemonsController < ApplicationController
  def create 
    # byebug
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    pokemon = Pokemon.new(nickname: name, species: species, trainer_id: params[:trainer_id])
    if pokemon.save
      render json: pokemon.to_json
    else 
      render json: {
        error: "Max pokemon is 6"
      }
    end
  end
  
  def destroy 
    pokemon = Pokemon.find(params[:id])
    pokemon.delete
    render json: pokemon.to_json
  end
end
