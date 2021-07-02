class Admin::ApiKeysController < AdminController
  before_action :set_api_key, only: [:show, :edit, :update, :destroy]

  # GET /admin/api_keys
  # GET /admin/api_keys.json
  def index
    @api_keys = ApiKey.includes(:user)
  end

  # GET /admin/api_keys/1
  # GET /admin/api_keys/1.json
  def show
  end

  # GET /admin/api_keys/new
  def new
    @api_key = ApiKey.new
  end

  # GET /admin/api_keys/1/edit
  def edit
  end

  # POST /admin/api_keys
  # POST /admin/api_keys.json
  def create
    @api_key = ApiKey.new(api_key_params)

    respond_to do |format|
      if @api_key.save
        format.html { redirect_to [:admin, @api_key], notice: 'Api key was successfully created.' }
        format.json { render :show, status: :created, location: @api_key }
      else
        format.html { render :new }
        format.json { render json: @api_key.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /admin/api_keys/1
  # PATCH/PUT /admin/api_keys/1.json
  def update
    respond_to do |format|
      if @api_key.update(api_key_params)
        format.html { redirect_to [:admin, @api_key], notice: 'Api key was successfully updated.' }
        format.json { render :show, status: :ok, location: @api_key }
      else
        format.html { render :edit }
        format.json { render json: @api_key.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /admin/api_keys/1
  # DELETE /admin/api_keys/1.json
  def destroy
    @api_key.update(active: false)
    respond_to do |format|
      format.html { redirect_to admin_api_keys_url, notice: 'Api key was successfully deactivated.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_api_key
      @api_key = ApiKey.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def api_key_params
      params.require(:api_key).permit(:user_id, :key, :secret, :active)
    end
end
