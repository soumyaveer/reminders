class AddLikesToReminders < ActiveRecord::Migration[5.1]
  def change
    add_column :reminders, :likes, :integer, default: 0
  end
end
