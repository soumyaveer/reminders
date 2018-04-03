require 'rails_helper'

describe EmailWorker do
  describe 'perform' do
    let(:reminder) { FactoryBot.create(:reminder) }

    it 'sends the reminder email' do
      expect do
        EmailWorker.new.perform(reminder.id)
      end.to change(ActionMailer::Base.deliveries, :size).by(1)

      mail = ActionMailer::Base.deliveries.last
      emails = reminder.recipient_email_addresses

      expect(mail.to).to match_array(emails)
      expect(mail.subject).to eql('A Gentle Reminder')
    end

    it 'updates the reminder' do
      reminder.time = Time.parse('3 May 2018 14:35:29 -0800')
      reminder.save!

      EmailWorker.new.perform(reminder.id)

      reminder.reload

      expected_reminder_time = Time.parse('3 May 2018 14:35:29 -0800')
      expect(reminder.time).to eql(expected_reminder_time)
    end
  end
end
