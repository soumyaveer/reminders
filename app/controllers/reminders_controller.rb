class RemindersController < ApplicationController
  before_action :load_reminder, only: [:update, :edit, :destroy]

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

  def edit
  end

  def index
    @reminders = Reminder.all
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
    if @reminder.update(reminder_params)
      respond_to do |format|
        format.html { redirect_to reminder_url(@reminder) }
        format.json { render json: @reminder }
      end
    else
      render 'edit'
    end
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
