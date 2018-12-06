from flask import Flask, request
from flask_restful import Resource, Api
from json import dumps
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
api = Api(app)

class GameState(Resource):
    """ Child of RESTful resource that supports HTTP requests.
    """
    def get(self, game_id):
        """ GET request returns game state for given game id
        """
        conn = sqlite3.connect('db/tictactoe.db')
        query = conn.execute("select * from games where id={}".format(game_id))
        return {"games": [i for i in query]}

    def put(self, game_id):
        """PUT request updates game state for given game id
        """
        conn = sqlite3.connect('db/tictactoe.db')
        game_state = request.form['state']
        query = conn.execute("update games set state = '{}' where id = {}".format(game_state, game_id))
        conn.commit()
        return {'status':'success', 'state':game_state}

    def post(self, game_id):
        """POST request creates a new game with given id
        """
        conn = sqlite3.connect('db/tictactoe.db')
        game_state = request.form['state']
        query = conn.execute(
            "insert into games values ({},'{}')".format(game_id, game_state))
        conn.commit()
        return {'status': 'success', 'game_id': game_id, 'game_state': game_state}

# This exposes the API's game state under the /game/<id> page
api.add_resource(GameState, '/game/<game_id>')

if __name__ == '__main__':
    app.run(port='8001')
