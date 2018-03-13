class AddRecipientEmailAddressesToReminders < ActiveRecord::Migration[5.1]
  def change
    add_column :reminders, :recipient_email_addresses, :string, array: true, default: []
  end
end
