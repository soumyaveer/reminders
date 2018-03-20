class EmailWorker
  include Sidekiq::Worker

  def perform(reminder_id)
    reminder = Reminder.find(reminder_id)

    RecipientsMailer.reminder_mail(reminder).deliver
  end
end
