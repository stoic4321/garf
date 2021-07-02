class Admin::JourneysController < AdminController
  before_action :set_journey, only: [:show, :edit, :update, :destroy]

  def index
    @journeys = Journey.all
  end

  def show
  end

  def new
    @journey = Journey.new
  end

  def edit
  end

  def create
    @journey = Journey.new(journey_params)

    respond_to do |format|
      if @journey.save
        format.html { redirect_to [:admin, @journey], notice: 'Journey was successfully created.' }
        format.json { render :show, status: :created, location: @journey }
      else
        format.html { render :new }
        format.json { render json: @journey.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @journey.update(journey_params)
        format.html { redirect_to [:admin, @journey], notice: 'Journey was successfully updated.' }
        format.json { render :show, status: :ok, location: @journey }
      else
        format.html { render :edit }
        format.json { render json: @journey.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @journey.destroy
    respond_to do |format|
      format.html { redirect_to admin_journeys_url, notice: 'Journey was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

private
  def set_journey
    @journey = Journey.find(params[:id])
  end

  def journey_params
    params.require(:journey).permit(:user_id, :name, :data)
  end
end
