class AddSidekiqJobIdToReminders < ActiveRecord::Migration[5.1]
  def change
    add_column :reminders, :sidekiq_job_id, :string
  end
end
