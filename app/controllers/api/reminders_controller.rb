module API
  class RemindersController < ApplicationController
    before_action :load_reminder, only: [:update, :destroy, :show]

    def create
      reminder = Reminder.create!(reminder_params)
      render json: reminder.as_json
    end

    def destroy
      if @reminder.destroy
        head :no_content, status: :ok
      else
        render json: @reminder.errors, status: :unprocessable_entity
      end
    end

    def index
      reminders = Reminder.order_by_created_at
      render json: reminders
    end

    def show
      render json: @reminder
    end

    def update
      @reminder.update_attributes!(reminder_params)

      render json: @reminder
    end

    private

    def load_reminder
      @reminder = Reminder.find(params[:id])
    end

    def reminder_params
      params.require(:reminder).permit(
        :recipient_email_address_values,
        :title,
        :message,
        :time,
        :recipient_email_addresses
      )
    end
  end
end
