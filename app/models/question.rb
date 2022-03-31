class Question < ApplicationRecord
  belongs_to :user

  has_many :advices, dependent: :destroy

  validates :question, :training_menu, :step, presence: true
end
