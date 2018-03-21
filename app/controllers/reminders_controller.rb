class RemindersController < ApplicationController
  before_action :load_reminder, only: [:update, :edit, :destroy]

  def create
    @reminder = Reminder.create(reminder_params)
    render json: @reminder
  end

  def destroy
    @reminder.destroy!
    redirect_to reminders_url
  end

  def edit
  end

  def index
    @reminders = Reminder.order_by_created_at
    render json: @reminders
  end

  def show
    @reminder = Reminder.find(params[:id])
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @reminders }
    end
  end

  def update
    @reminder = Reminder.find(params[:id])
    @reminder.update_attributes(reminder_params)
    render json: @reminder
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
