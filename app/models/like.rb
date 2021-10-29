class Like < ApplicationRecord
  belongs_to :user
  belongs_to :training_log

  validates :training_log_id, uniqueness: { scope: :user_id }
end
