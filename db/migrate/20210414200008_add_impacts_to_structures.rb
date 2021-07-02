class AddImpactsToStructures < ActiveRecord::Migration[6.0]
  def change
    add_column :structures, :impacts, :string
  end
end
