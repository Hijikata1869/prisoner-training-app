class Question < ApplicationRecord
  belongs_to :user

  has_many :advices, dependent: :destroy

  validates :question, :training_menu, :step, presence: true

  
  def self.recent_question(training_menu)

    training_question_arr = Question.where(training_menu: training_menu).order(id: 'DESC').limit(1).to_a
    question_user_arr = User.where(id: training_question_arr[0].user_id).to_a
  
    recent_question_arr = training_question_arr + question_user_arr

    return recent_question_arr
  end

end
