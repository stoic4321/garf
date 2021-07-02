class Admin::StructuresController < AdminController
  before_action :set_structure, only: [:show, :edit, :update, :destroy]

  def index
    @structures = Structure.all
  end

  def show
  end

  def new
    @structure = Structure.new
  end

  def edit
  end


  # TODO
  # Add Order
  def create
    @structure = Structure.new(structure_params)

    respond_to do |format|
      if @structure.save
        format.html { redirect_to [:admin, @structure], notice: 'Structure was successfully created.' }
        format.json { render :show, status: :created, location: @structure }
      else
        format.html { render :new }
        format.json { render json: @structure.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      res = @structure.update(structure_params())
      if res
        format.html { redirect_to [:admin, @structure], notice: 'Structure was successfully updated.' }
        format.json { render :show, status: :ok, location: @structure }
      else
        format.html { render :edit }
        format.json { render json: @structure.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @structure.destroy
    respond_to do |format|
      format.html { redirect_to tree_admin_structures_url, notice: 'Structure was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

private

  def set_structure
    @structure = Structure.find(params[:id])
  end

  def structure_params
    params.require(:structure).permit(
      :name,
      :flavor,
      :key,
      :data,
      :parent_id,
      :text,
      :picker,
      :handle,
      :impacts,
      :ordering,
      :active
    )
  end

end
