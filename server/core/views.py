from core import app

@app.route('/')
def index():
    return 'Hello world'

@app.route('/test')
def test():
    return {
        "msg": 'Hello'
    }

@app.route('/profile')
def profile():
    response_body = {
        "name": 'tylphe',
        "about": 'response works'
    }

    return response_body