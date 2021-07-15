class CreateAdvices < ActiveRecord::Migration[6.0]
  def change
    create_table :advices do |t|
      t.references :user, foreign_key: true
      t.references :question, foreign_key: true
      t.text :advice, null: false
      t.timestamps
    end
  end
end
