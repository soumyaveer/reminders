describe RemindersController do
  describe "PATCH update" do
    it "updates the reminder" do
      reminder = FactoryBot.create(:reminder)
      new_recipient_addresses = %w(one@test.local two@test.local)

      patch(
        :update,
        params: {
          id: reminder.id,
          reminder: {
            recipient_email_address_values: new_recipient_addresses.join(",")
          }
        },
        format: :json
      )

      expect(response.code).to eql("200")

      reminder.reload

      expect(reminder.recipient_email_addresses).to match_array(new_recipient_addresses)
      expect(reminder.recipient_email_address_values).to eql(new_recipient_addresses.join(", "))

      json_response = JSON.parse(response.body)
      expect(json_response["id"]).to eql(reminder.id)
      expect(json_response["recipient_email_address_values"]).to eql(reminder.recipient_email_address_values)
    end
  end
end
