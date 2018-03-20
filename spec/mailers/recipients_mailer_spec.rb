describe RecipientsMailer do
  describe 'reminder_mail' do
    let(:reminder) { FactoryBot.create(:reminder) }

    before do
      @mail = RecipientsMailer.reminder_mail(reminder)
    end

    it 'sets subject' do
      expect(@mail.subject).to eql('A Gentle Reminder')
    end

    it 'sets to' do
      emails = reminder.recipient_email_address_values=(reminder.recipient_email_addresses)

      expect(@mail.to).to match_array(emails)
    end

    it 'sets from' do
      email_from = Rails.application.config.action_mailer.default_options[:from]

      expect(@mail.from).to eql([email_from])
    end

    it 'renders body' do
      expect(@mail.body.encoded.include?(reminder.title)).to eql(true)
      expect(@mail.body.encoded.include?(reminder.message)).to eql(true)
    end
  end
end
