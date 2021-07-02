class AddFieldsToScores < ActiveRecord::Migration[6.0]
  def change
    add_column :scores, :date, :date, index: true
  end
end
