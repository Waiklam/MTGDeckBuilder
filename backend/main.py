from mtgsdk import Card
from flask import Flask, request
from flask_cors import CORS
import mysql.connector
import json

mydb = mysql.connector.connect(
    host="",
    user="",
    passwd="",
    auth_plugin="",
    database=""
)

mycursor = mydb.cursor()

addCard = """
    INSERT INTO deck (user, pass, decklist) VALUES(%s, %s, %s)
    ON DUPLICATE KEY UPDATE user=%s, pass=%s, decklist=%s
"""

getCard = """
    SELECT decklist FROM deck
    WHERE user=%s AND pass=%s
"""

app = Flask(__name__)
CORS(app)

@app.route("/card", methods=["POST"])
def card():
    input = request.get_json()
    cards = Card.where(name=input).all()
    cardList = []
    for card in cards:
        cardList.append({
            'name': card.name,
            'manaCost': card.mana_cost,
            'colors': card.colors,
            'rarity': card.rarity,
            'power': card.power,
            'toughness': card.toughness,
            'text': card.text,
            'artist': card.artist,
            'img': card.image_url,
            'id': card.multiverse_id
        })
    return cardList 

@app.route("/save", methods=["POST"])
def save():
    input = request.get_json()
    mycursor.execute(addCard, (input[0], input[1], json.dumps(input[2]), input[0], input[1], json.dumps(input[2])))
    mydb.commit()
    return "Done"

@app.route("/retrieveDeck", methods=["POST"])
def getDeck():
    input = request.get_json()
    mycursor.execute(getCard, (input[0], input[1]))
    return mycursor.fetchone()[0]

if __name__ == "__main__":
    app.run()

