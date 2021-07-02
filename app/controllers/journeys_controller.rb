class JourneysController < ApplicationController
  before_action :authenticate_user!
  before_action :set_location
  before_action :set_journey, only: [:show, :destroy]

  def index
    @journeys = current_user.journeys
  end

  def show
  end

  def destroy
    @journey.destroy
    redirect_to journeys_path
  end

private
  def set_location
    @location = :journeys
  end

  def set_journey
    @journey = current_user.journeys.find_by(token: params[:id])
  end
end
