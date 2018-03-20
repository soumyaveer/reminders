require_relative 'web_host'

Rails.application.config.action_mailer.default_options = { from: "no-reply@reminders.dev" }
Rails.application.config.action_mailer.default_url_options = { host:  Rails.application.config.web_host }
