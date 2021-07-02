class Api::StructuresController < ApiController
  def conditions
    @structures = Structure.condition.roots
    @flavor = "condition"
    render :index
  end

  def actions
    @structures = Structure.find(Structure.action.pluck(Arel.sql("DISTINCT parent_id")))
    @flavor = "action"
    render :index
  end
end
