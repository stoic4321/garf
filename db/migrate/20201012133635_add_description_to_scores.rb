class AddDescriptionToScores < ActiveRecord::Migration[6.0]
  def change
    rename_column :scores, :context, :description
    change_column :scores, :description, :text
  end
end
