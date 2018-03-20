if Rails.env.development?
  Rails.application.config.redis_url = 'redis://localhost:6379/0'
elsif Rails.env.test?
  Rails.application.config.redis_url = 'redis://localhost:6379/1'
else
  Rails.application.config.redis_url = ENV["REDIS_URL"]
end
