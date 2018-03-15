class Reminder < ApplicationRecord
  validates :title, uniqueness: true
  validates :title, :time, :recipient_email_addresses, presence: true

  def recipient_email_address_values=(values)
    self.recipient_email_addresses = values.split(",")
  end

  after_create :enqueue_sidekiq_job
  after_destroy :remove_sidekiq_job
  after_update :re_enqueue_sidekiq_job

  private

  def enqueue_sidekiq_job
    sidekiq_job_id = EmailWorker.perform_at(self.time, self.id)
    self.update_column(:sidekiq_job_id, sidekiq_job_id)
  end

end
