class HomeController < ApplicationController
  def index
    redirect_to conditions_path
  end

  def conditions
    @location = :conditions
    @title = 'Conditions'
    @mode  = 'c'
    render :structures
  end

  def actions
    @location = :actions
    @title = 'Healthy Actions'
    @mode  = 'a'
    render :structures
  end

  def save
    @location = :save
    @title = 'Save Journey'
    @mode  = 's'
    render :structures
  end

  def journeys
    @location = :journeys
    @title = 'Journeys'
    @mode  = 'j'
    render :structures
  end

  def raw
    render layout: false
  end

  def share
    @shared_journey = Journey.find_by({token: params[:token]})
    @location = :conditions
    @title = 'Conditions'
    @mode  = 'c'
    render :structures
  end
end
