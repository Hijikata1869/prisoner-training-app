class CreateQuestions < ActiveRecord::Migration[6.0]
  def change
    create_table :questions do |t|
      t.references :user, foreign_key: true
      t.text :question, null: false
      t.timestamps
    end
  end
end
