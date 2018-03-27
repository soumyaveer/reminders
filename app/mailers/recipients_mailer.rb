class RecipientsMailer < ApplicationMailer
  def reminder_mail(reminder)
    @reminder = reminder
    mail to: @reminder.recipient_email_address_values, subject: 'A Gentle Reminder'
  end
end
