web_host = if Rails.env.development?
             "http://localhost:5000"
           elsif Rails.env.test?
             "http://localhost:test"
           else
             "https://TODO"
           end

Rails.application.config.web_host = web_host