class ConvertInterfaceToPicker < ActiveRecord::Migration[6.0]
  def change
    rename_column :structures, :interface, :picker
  end
end
