class Reminder < ApplicationRecord
  validates :title, uniqueness: true
  validates :title, :time, :recipient_email_addresses, presence: true

  def recipient_email_address_values=(values)
    self.recipient_email_addresses = values.split(",")
  end

  after_create :enqueue_sidekiq_job
  after_destroy :remove_sidekiq_job
  after_update :re_enqueue_sidekiq_job

end
