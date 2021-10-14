class Question < ApplicationRecord
  belongs_to :user

  has_many :advices

  validates :question, :training_menu, :step, presence: true
end
