from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def homepage():
    return render_template('index.html', gameid='none')

if __name__ == '__main__':
    import os
    print("DIR:", os.getcwd())
    app.run(port='8002')
