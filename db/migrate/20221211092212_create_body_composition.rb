class CreateBodyComposition < ActiveRecord::Migration[6.0]
  def change
    create_table :body_compositions do |t|
      t.references :user, null: false, foreign_key: true
      t.float :weight, null: false
      t.float :body_fat, null: false

      t.timestamps
    end
  end
end
