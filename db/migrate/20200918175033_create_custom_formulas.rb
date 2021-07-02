class CreateCustomFormulas < ActiveRecord::Migration[6.0]
  def change
    create_table :custom_formulas do |t|
      t.string :name
      t.text :formula

      t.timestamps
    end
    add_column :metrics, :custom_formula_id, :integer
    add_index :metrics, :custom_formula_id
    add_column :users, :formulator, :boolean, default: false
  end
end
