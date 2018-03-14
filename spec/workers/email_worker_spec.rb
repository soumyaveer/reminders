# require 'rails_helper'
#
# describe EmailWorker do
#   describe 'perform' do
#     let(:reminder) { FactoryBot.create(:reminder) }
#
#     it 'sends the reminder email' do
#       expect do
#         EmailWorker.new.perform(reminder.id)
#       end.to change(ActionMailer::Base.deliveries, :size).by(1)
#     end
#   end
# end
