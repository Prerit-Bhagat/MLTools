bind = "0.0.0.0:8000"  # Bind to all network interfaces
workers = 3  # Adjust based on server resources
timeout = 120  # Increase timeout to prevent request failures
loglevel = "info"  # Set logging level
errorlog = "-"  # Log errors to stderr
accesslog = "-"  # Log access to stdout
