class User < ApplicationRecord
    has_many :posts
    has_one :therapist
    has_one :clients
    has_many :followers, through: :client
    has_secure_password
    validates_presence_of :username
    validates :username, uniqueness: {
        case_sensitive: false
    }
end
