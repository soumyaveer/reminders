class EmailWorker
  include Sidekiq::Worker

  def perform(reminder_id)
    reminder = Reminder.new(reminder_id)

    RecipientMailer.reminder_mail(reminder).deliver
  end
end
