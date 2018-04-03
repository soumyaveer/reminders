require 'sidekiq/api'

class Reminder < ApplicationRecord
  validates :title, uniqueness: true

  after_create :enqueue_sidekiq_job
  after_destroy :remove_sidekiq_job
  after_update :re_enqueue_sidekiq_job

  scope :order_by_created_at, -> { order(created_at: :desc) }

  def as_json(options = nil)
    options = {
      except: [
        :recipient_email_addresses,
        :sidekiq_job_id,
        :created_at,
        :updated_at
      ],
      methods: [
        :recipient_email_address_values
      ]
    }

    super(options)
  end

  def recipient_email_address_values=(values)
    self.recipient_email_addresses = values.split(",").map(&:strip)
  end

  def recipient_email_address_values
    self.recipient_email_addresses.join(", ")
  end

  private

  def enqueue_sidekiq_job
    return unless valid_for_email_delivery?

    sidekiq_job_id = EmailWorker.perform_at(self.time, self.id)
    self.update_column(:sidekiq_job_id, sidekiq_job_id)
  end

  def remove_sidekiq_job
    sidekiq_job = Sidekiq::ScheduledSet.new.find_job(self.sidekiq_job_id)
    sidekiq_job.delete if sidekiq_job.present?
  end

  def re_enqueue_sidekiq_job
    return unless valid_for_email_delivery?

    remove_sidekiq_job
    enqueue_sidekiq_job
  end

  def valid_for_email_delivery?
    self.title.present?\
    && self.message.present?\
    && self.recipient_email_addresses.present?\
    && self.time.present?
  end
end
