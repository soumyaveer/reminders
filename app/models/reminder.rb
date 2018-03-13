class Reminder < ApplicationRecord
  validates :title, uniqueness: true
  validates :title, :time, :recipient_email_addresses, presence: true
end
