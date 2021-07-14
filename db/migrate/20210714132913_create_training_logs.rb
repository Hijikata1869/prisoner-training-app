class CreateTrainingLogs < ActiveRecord::Migration[6.0]
  def change
    create_table :training_logs do |t|
      t.references :user, foreign_key: true
      t.string :training_menu, null: false
      t.string :step
      t.string :repetition
      t.string :set
      t.string :memo

      t.timestamps
    end
  end
end
