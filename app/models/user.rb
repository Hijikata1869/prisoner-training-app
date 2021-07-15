# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  has_many :training_logs, dependent: :destroy
  has_many :questions, dependent: :destroy
  has_many :advices, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :bookmarks, dependent: :destroy
  has_many :liked_training_logs, through: :likes, source: :training_log
  has_many :bookmark_advices, through: :bookmarks, source: :advice

  validates :nickname, :email, presence: true
  validates :nickname, length: { maximum: 30 }
  
end
