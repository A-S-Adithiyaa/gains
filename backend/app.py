from flask import Flask, request, jsonify
from flask_cors import CORS
from pprint import pprint
from lmqg import TransformersQG
from spacy.cli import download


app = Flask(__name__)
CORS(app)
download("en_core_web_sm")

model = TransformersQG(model='lmqg/t5-base-squad-qg', model_ae='lmqg/t5-base-squad-ae')

@app.route('/generate_qa', methods=['POST'])
def generate_qa():
    data = request.get_json()
    context = data['context']
    question_answer = model.generate_qa(context)
    print(question_answer)
    return jsonify(question_answer)

if __name__ == '__main__':
    app.run(debug=True)
