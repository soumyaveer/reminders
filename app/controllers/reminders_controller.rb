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

  def destroy
    @reminder.destroy!
    redirect_to reminders_url
  end

  def index
    @reminders = Reminder.all
  end

  def show
    @reminder = Reminder.find(params[:id])
  end

  private

  def load_reminder
    @reminder = Reminder.find(params[:id])
  end

  def reminder_params
    params.require(:reminder).permit(
      :title,
      :message,
      :time,
      recipient_email_addresses: []
    )
  end
end
