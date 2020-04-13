class Follower < ApplicationRecord
  belongs_to :therapist, class_name: 'User', foreign_key: :therapist_id
  belongs_to :client, class_name: 'User', foreign_key: :client_id
  
end
