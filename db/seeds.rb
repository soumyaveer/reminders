# Destroy all previously created Reminders
Reminder.destroy_all

#create new reminders
Reminder.create!(title: Faker::Lorem.sentence,
                 message: Faker::Lorem.paragraph,
                 time: Faker::Time.forward(21, :morning),
                 recipient_email_addresses: [
                   Faker::Internet.email,
                   Faker::Internet.email
                 ])

Reminder.create!(title: Faker::Lorem.sentence,
                 message: Faker::Lorem.paragraph,
                 time: Faker::Time.forward(19, :morning),
                 recipient_email_addresses: [
                   Faker::Internet.email,
                   Faker::Internet.email,
                   Faker::Internet.email
                 ])

Reminder.create!(title: Faker::Lorem.sentence,
                 message: Faker::Lorem.paragraph,
                 time: Faker::Time.forward(23, :morning),
                 recipient_email_addresses: [
                   Faker::Internet.email
                 ])

Reminder.create!(title: Faker::Lorem.sentence,
                 message: Faker::Lorem.paragraph,
                 time: Faker::Time.forward(27, :morning),
                 recipient_email_addresses: [
                   Faker::Internet.email,
                   Faker::Internet.email
                 ])


