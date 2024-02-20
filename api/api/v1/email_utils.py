from flask_mail import Mail

mail = Mail()

def configure_mail(app):
    mail.init_app(app)