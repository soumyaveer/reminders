web_host = if Rails.env.development?
             "http://localhost:3001"
           elsif Rails.env.test?
             "http://localhost:test"
           end

Rails.application.config.web_host = web_host
