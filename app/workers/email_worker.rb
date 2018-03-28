class EmailWorker
  include Sidekiq::Worker

  def perform(reminder_id)
    reminder = Reminder.find_by(id: reminder_id)

    # return if the reminder has been deleted
    return unless reminder

    RecipientsMailer.reminder_mail(reminder).deliver
  end
end
