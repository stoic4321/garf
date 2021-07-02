class AdjustFormulaPatterns < ActiveRecord::Migration[6.0]
  def change
    remove_column :scores, :formula, :integer, default: 0
    add_column :scores, :context, :string
    add_column :metrics, :formula, :string
    add_column :metrics, :data, :jsonb, default: {}
    add_column :data_records, :connector, :string
  end
end
