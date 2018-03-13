FactoryBot.define do
  factory :reminder do
    title { Faker::Lorem.sentence }
    message { Faker::Lorem.paragraph }
    time { Faker::Time.forward(23, :morning) }
    recipient_email_addresses {[
      Faker::Internet.email,
      Faker::Internet.email
    ]}
  end
end
