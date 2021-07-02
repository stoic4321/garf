class RemoveValueFromStructures < ActiveRecord::Migration[6.0]
  def change
    remove_column :structures, :value, :string
  end
end
