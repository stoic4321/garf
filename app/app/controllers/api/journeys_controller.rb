class Api::JourneysController < ApiController

  def create
    @journey = @user.journeys.create(journey_params)
    render :show
  end

  def update
    @journey = @user.journeys.find(params[:id])
    @journey.update(journey_params)
    render :show
  end

  def destroy
    @journey = @user.journeys.find(params[:id])
    @journey.destroy
    render :show
  end

private

  def journey_params
    params.require(:journey).permit(:user_id, :name, data: {})
  end
end
