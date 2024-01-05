from flask import Flask, request, jsonify
from flask_cors import CORS
from pprint import pprint
from lmqg import TransformersQG

app = Flask(__name__)
CORS(app)

model = TransformersQG(model='lmqg/mt5-small-zhquad-qg-trimmed-50000', model_ae='lmqg/mt5-small-zhquad-ae-trimmed-50000')

@app.route('/generate_qa', methods=['POST'])
def generate_qa():
    data = request.get_json()
    context = data['context']
    question_answer = model.generate_qa(context)
    print(question_answer)
    return jsonify(question_answer)

if __name__ == '__main__':
    app.run(debug=True)
