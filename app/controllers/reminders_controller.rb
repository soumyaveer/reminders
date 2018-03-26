class RemindersController < ApplicationController
  before_action :load_reminder, only: [:update, :edit, :destroy, :show]

  def create
    reminder = Reminder.create(reminder_params)
    render json: reminder
  end

  def destroy
    if @reminder.destroy
      head :no_content, status: :ok
    else
      render json: @reminder.errors, status: :unprocessable_entity
    end
  end

  def edit
  end

  def index
    @reminders = Reminder.order_by_created_at
    render json: @reminders.as_json(except: [:recipient_email_addresses,
                                             :sidekiq_job_id,
                                             :created_at,
                                             :updated_at],
                                    methods: :recipient_email_address_values)
  end

  def new
  end

  def show
    render json: @reminder.as_json(except: [:recipient_email_addresses,
                                            :sidekiq_job_id,
                                            :created_at,
                                            :updated_at],
                                   methods: :recipient_email_address_values)
  end

  def update
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
      :recipient_email_address_values=,
      :recipient_email_address_values,
      recipient_email_addresses: []

    )
  end
end
