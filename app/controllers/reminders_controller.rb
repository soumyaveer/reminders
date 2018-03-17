class RemindersController < ApplicationController

  def create
    @reminder = Reminder.new(reminder_params)
    if @reminder.save
      respond_to do |format|
        format.html {redirect_to reminders_url }
        format.json { render json: @reminder }
      end
    else
      render 'new'
    end
  end


  private

  def reminder_params
    params.require(:reminder).permit(
      :title,
      :message,
      :time,
      recipient_email_addresses: []
    )
  end
end
