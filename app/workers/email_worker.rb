class EmailWorker
  include Sidekiq::Worker

  def perform(reminder_id)
    reminder = Reminder.new(reminder_id)
    
  end
end
