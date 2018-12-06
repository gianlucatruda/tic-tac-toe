from flask import Flask, request
from flask_restful import Resource, Api
from sqlalchemy import create_engine
from json import dumps
import sqlite3

app = Flask(__name__)
api = Api(app)

class GameState(Resource):
    def get(self, game_id):
        conn = sqlite3.connect('db/tictactoe.db')
        query = conn.execute("select * from games where id={}".format(game_id))
        return {"games": [i for i in query]}

    def put(self, game_id):
        conn = sqlite3.connect('db/tictactoe.db')
        game_state = request.form['state']
        query = conn.execute("update games set state = '{}' where id = {}".format(game_state, game_id))
        conn.commit()
        return {'status':'success', 'state':game_state}

    def post(self, game_id):
        conn = sqlite3.connect('db/tictactoe.db')
        game_state = request.form['state']
        query = conn.execute(
            "insert into games values ({},'{}')".format(game_id, game_state))
        conn.commit()
        return {'status': 'success', 'game_id': game_id, 'game_state': game_state}

api.add_resource(GameState, '/game/<game_id>')

if __name__ == '__main__':
    app.run(port='8001')
