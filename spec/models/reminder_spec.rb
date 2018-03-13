describe Reminder do
  describe 'validations' do
    before do
      @reminder = FactoryBot.create(:reminder)
    end

    it 'fails if title is not present' do
      @reminder.title = nil

      expect(@reminder.valid?).to eql(false)
      expect(@reminder.errors[:title]).to be_present
    end

    it 'fails if time is not present' do
      @reminder.time = nil

      expect(@reminder.valid?).to eql(false)
      expect(@reminder.errors[:time]).to be_present
    end

    it 'fails if recipient\'s email addresses are not present' do
      @reminder.recipient_email_addresses = nil

      expect(@reminder.valid?).to eql(false)
      expect(@reminder.errors[:recipient_email_addresses]).to be_present
    end

    it 'passes if required attributes are present' do
      expect(@reminder.valid?).to eql(true)
    end
  end

  describe 'recipient_email_address_values' do
    before do
      @reminder = FactoryBot.create(:reminder)
    end

    it 'returns recipient addresses' do
      recipients = @reminder.recipient_email_address_values=(@reminder.recipient_email_addresses)

      expect(recipients).to match_array([@reminder.recipient_email_addresses[0][0],
                                         @reminder.recipient_email_addresses[0][1]])
    end
  end
end
