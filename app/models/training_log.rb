class TrainingLog < ApplicationRecord
  belongs_to :user

  has_many :likes, dependent: :destroy
  has_many :liked_users, through: :likes, source: :user

  validates :training_menu, :step, :repetition, :set, presence: true
  validates :memo, length: { maximum: 200 }

  def liked_by?(user)
    likes.where(user_id: user.id).exists?
  end
end
