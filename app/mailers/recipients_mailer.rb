class RecipientsMailer < ApplicationMailer
  def reminder_mail(reminder)
    @reminder = reminder
    emails = @reminder.recipient_email_address_values=(@reminder.recipient_email_addresses)

    mail to: emails, subject: 'A Gentle Reminder'
  end
end
