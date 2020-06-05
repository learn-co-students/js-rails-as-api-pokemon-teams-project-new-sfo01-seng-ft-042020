class TrainersController < ApplicationController
  def index
    trainers = Trainer.all 
    options = {
      include: {
        pokemons: {
          only: [:id, :nickname, :species, :trainer_id]
        }
      },
      except: [:updated_at],
    }
    render json: trainers.to_json(options)
    
  end

end
