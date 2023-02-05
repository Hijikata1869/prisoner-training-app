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

  def self.fetch_one_kind_questions(training_menu)

    menu = training_menu

    case menu
    when "push_up" then
      all_questions = Question.where(training_menu: "プッシュアップ").order(id: 'DESC').to_a
    when "squat" then
      all_questions = Question.where(training_menu: "スクワット").order(id: 'DESC').to_a
    when "pull_up" then
      all_questions = Question.where(training_menu: "プルアップ").order(id: 'DESC').to_a
    when "leg_raise" then
      all_questions = Question.where(training_menu: "レッグレイズ").order(id: 'DESC').to_a
    when "bridge" then
      all_questions = Question.where(training_menu: "ブリッジ").order(id: 'DESC').to_a
    when "handstand_push_up" then
      all_questions = Question.where(training_menu: "ハンドスタンドプッシュアップ").order(id: 'DESC').to_a
    end

    return all_questions
  end

end
