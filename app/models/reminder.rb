class Reminder < ApplicationRecord
  validates :title, uniqueness: true
  validates :title, :time, :recipient_email_addresses, presence: true

  def recipient_email_address_values=(values)
    self.recipient_email_addresses = values.split(",")
  end
end
