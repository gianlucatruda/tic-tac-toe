from flask import Flask, render_template
import requests

app = Flask(__name__)
API = 'http://127.0.0.1:8001'

@app.route('/game/<game_id>/')
def board(game_id):

    r = requests.get(API+'/game/'+game_id)
    game_state = r.json()['games'][0][1]
    board = state_to_2d_list(game_state)

    return render_template('index.html', gameid=game_id, board=board)

def state_to_2d_list(game_state:str):
    assert(len(game_state)==9)
    board = [[],[],[]]
    for key, c in enumerate(game_state):
        board[key//3].append(c.lower())
    return board

if __name__ == '__main__':
    app.run(port='8002')
