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

  describe "re enqueue sidekiq job" do
    let(:reminder) { FactoryBot.create(:reminder) }

    it "removes and adds a new sidekiq job when reminder time changes" do
      initial_sidekiq_job_id = reminder.sidekiq_job_id
      expect(initial_sidekiq_job_id).to be_present

      reminder.time = 1.day.from_now

      reminder.save!
      reminder.reload

      updated_sidekiq_job_id = reminder.sidekiq_job_id
      expect(updated_sidekiq_job_id).to be_present
      expect(updated_sidekiq_job_id).to_not eql(initial_sidekiq_job_id)
    end

    it "does not change the sidekiq job when time does not change" do
      initial_sidekiq_job_id = reminder.sidekiq_job_id
      expect(initial_sidekiq_job_id).to be_present

      reminder.recipient_email_address_values = "new@test.local"
      reminder.time = reminder.time # time does not change
      reminder.save!
      reminder.reload

      expect(reminder.sidekiq_job_id).to eql(initial_sidekiq_job_id)
    end
  end
end
