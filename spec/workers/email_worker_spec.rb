require 'rails_helper'

describe EmailWorker do
  describe 'perform' do
    let(:reminder) { FactoryBot.create(:reminder) }

    it 'sends the reminder email' do
      expect do
        EmailWorker.new.perform(reminder.id)
      end.to change(ActionMailer::Base.deliveries, :size).by(1)

      mail = ActionMailer::Base.deliveries.last
      emails = reminder.recipient_email_address_values=(reminder.recipient_email_addresses)

      expect(mail.to).to match_array(emails)
      expect(mail.subject).to eql('A Gentle Reminder')
    end

    
  end
end
