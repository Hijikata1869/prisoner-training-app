class AddColumnsToQuestions < ActiveRecord::Migration[6.0]
  def change
    add_column :questions, :training_menu, :string
    add_column :questions, :step, :string
  end
end
