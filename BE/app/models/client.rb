class Client < ApplicationRecord
  belongs_to :user
  has_many :followers
  has_many :therapists, through: :followers
  
end
