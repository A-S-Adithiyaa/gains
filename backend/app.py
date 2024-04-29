from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from pprint import pprint
# from lmqg import TransformersQG
#import all the neccessary libraries
import warnings
warnings.filterwarnings("ignore")

import torch
from transformers import T5ForConditionalGeneration,T5Tokenizer
from sense2vec import Sense2Vec
from sentence_transformers import SentenceTransformer
from textwrap3 import wrap
import random
import numpy as np
import nltk
from nltk.corpus import wordnet as wn
from nltk.tokenize import sent_tokenize
from nltk.corpus import stopwords
import string
import pke
import traceback
from flashtext import KeywordProcessor
from collections import OrderedDict
from sklearn.metrics.pairwise import cosine_similarity
from similarity.normalized_levenshtein import NormalizedLevenshtein
import pickle
import time
import os 
import torch
from transformers import AutoTokenizer, T5ForConditionalGeneration
from transformers import pipeline


device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(device)

#we need to download the 2015 trained on reddit sense2vec model as it is shown to give better results than the 2019 one.

# #!pip install sentencepie ``
s2v = Sense2Vec().from_disk("./s2v_old")

summarized_text=""

# with open('t5_summary_model.pkl', 'rb') as f:
#     summary_model = pickle.load(f)
# print("Summary model found in the disc, model is loaded successfully.")

# with open('t5_summary_tokenizer.pkl', 'rb') as f:
#     summary_tokenizer = pickle.load(f)
# print("Summary tokenizer found in the disc and is loaded successfully.")

# with open('t5_question_model.pkl', 'rb') as f:
#     question_model = pickle.load(f)
# print("Question model found in the disc, model is loaded successfully.")

# with open('t5_question_tokenizer.pkl', 'rb') as f:
#     question_tokenizer = pickle.load(f)
# print("Question tokenizer found in the disc, model is loaded successfully.")

# summary_model = summary_model.to(device)
# question_model = question_model.to(device)

# with open("sentence_transformer_model.pkl",'rb') as f:
#     sentence_transformer_model = pickle.load(f)
# print("Sentence transformer model found in the disc, model is loaded successfully.")

#we need to download the 2015 trained on reddit sense2vec model as it is shown to give better results than the 2019 one.
s2v = Sense2Vec().from_disk('s2v_old')

#getitng the summary model and its tokenizer
if os.path.exists("t5_summary_model.pkl"):
    with open('t5_summary_model.pkl', 'rb') as f:
        summary_model = pickle.load(f)
    print("Summary model found in the disc, model is loaded successfully.")

else:
    print("Summary model does not exists in the path specified, downloading the model from web....")
    start_time = time.time()
    summary_model = T5ForConditionalGeneration.from_pretrained('t5-base')
    end_time = time.time()

    print("downloaded the summary model in ",(end_time-start_time)/60," min , now saving it to disc...")

    with open("t5_summary_model.pkl", 'wb') as f:
        pickle.dump(summary_model,f)
    
    print("Done. Saved the model to disc.")

if os.path.exists("t5_summary_tokenizer.pkl"):
    with open('t5_summary_tokenizer.pkl', 'rb') as f:
        summary_tokenizer = pickle.load(f)
    print("Summary tokenizer found in the disc and is loaded successfully.")
else: 
    print("Summary tokenizer does not exists in the path specified, downloading the model from web....")

    start_time = time.time()
    summary_tokenizer = T5Tokenizer.from_pretrained('t5-base')
    end_time = time.time()

    print("downloaded the summary tokenizer in ",(end_time-start_time)/60," min , now saving it to disc...")

    with open("t5_summary_tokenizer.pkl",'wb') as f:
        pickle.dump(summary_tokenizer,f)

    print("Done. Saved the tokenizer to disc.")


#Getting question model and tokenizer
if os.path.exists("t5_question_model.pkl"):
    with open('t5_question_model.pkl', 'rb') as f:
        question_model = pickle.load(f)
    print("Question model found in the disc, model is loaded successfully.")
else:
    print("Question model does not exists in the path specified, downloading the model from web....")
    start_time= time.time()
    question_model = T5ForConditionalGeneration.from_pretrained('ramsrigouthamg/t5_squad_v1')
    end_time = time.time()

    print("downloaded the question model in ",(end_time-start_time)/60," min , now saving it to disc...")

    with open("t5_question_model.pkl", 'wb') as f:
        pickle.dump(question_model,f)
    
    print("Done. Saved the model to disc.")

if os.path.exists("t5_question_tokenizer.pkl"):
    with open('t5_question_tokenizer.pkl', 'rb') as f:
        question_tokenizer = pickle.load(f)
    print("Question tokenizer found in the disc, model is loaded successfully.")
else:
    print("Question tokenizer does not exists in the path specified, downloading the model from web....")

    start_time = time.time()
    question_tokenizer = T5Tokenizer.from_pretrained('ramsrigouthamg/t5_squad_v1')
    end_time=time.time()

    print("downloaded the question tokenizer in ",(end_time-start_time)/60," min , now saving it to disc...")

    with open("t5_question_tokenizer.pkl",'wb') as f:
        pickle.dump(question_tokenizer,f)

    print("Done. Saved the tokenizer to disc.")

#Loading the models in to GPU if available
summary_model = summary_model.to(device)
question_model = question_model.to(device)

#Getting the sentence transformer model and its tokenizer
# paraphrase-distilroberta-base-v1
if os.path.exists("sentence_transformer_model.pkl"):
    with open("sentence_transformer_model.pkl",'rb') as f:
        sentence_transformer_model = pickle.load(f)
    print("Sentence transformer model found in the disc, model is loaded successfully.")
else:
    print("Sentence transformer model does not exists in the path specified, downloading the model from web....")
    start_time=time.time()
    sentence_transformer_model = SentenceTransformer("sentence-transformers/msmarco-distilbert-base-v2")
    end_time=time.time()

    print("downloaded the sentence transformer in ",(end_time-start_time)/60," min , now saving it to disc...")

    with open("sentence_transformer_model.pkl",'wb') as f:
        pickle.dump(sentence_transformer_model,f)

    print("Done saving to disc.")

def set_seed(seed: int):
    random.seed(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)
    torch.cuda.manual_seed_all(seed)

def postprocesstext (content):
  """
  this function takes a piece of text (content), tokenizes it into sentences, capitalizes the first letter of each sentence, and then concatenates the processed sentences into a single string, which is returned as the final result. The purpose of this function could be to format the input content by ensuring that each sentence starts with an uppercase letter.
  """
  final=""
  for sent in sent_tokenize(content):
    sent = sent.capitalize()
    final = final +" "+sent
  return final

def summarizer(text,model,tokenizer):
  """
  This function takes the given text along with the model and tokenizer, which summarize the large text into useful information
  """
  text = text.strip().replace("\n"," ")
  text = "summarize: "+text
  # print (text)
  max_len = 512
  encoding = tokenizer.encode_plus(text,max_length=max_len, pad_to_max_length=False,truncation=True, return_tensors="pt").to(device)

  input_ids, attention_mask = encoding["input_ids"], encoding["attention_mask"]

  outs = model.generate(input_ids=input_ids,
                                  attention_mask=attention_mask,
                                  early_stopping=True,
                                  num_beams=3,
                                  num_return_sequences=1,
                                  no_repeat_ngram_size=2,
                                  min_length = 75,
                                  max_length=300
                                  )

  dec = [tokenizer.decode(ids,skip_special_tokens=True) for ids in outs]
  summary = dec[0]
  summary = postprocesstext(summary)
  summary= summary.strip()

  return summary

def get_summary_in_points(summary):
    sentences = summary.split(". ") 
    sentences = [sentence.strip() for sentence in sentences]  
    return sentences

def get_nouns_multipartite(content):
    """
    This function takes the content text given and then outputs the phrases which are build around the nouns , so that we can use them for context based distractors
    """
    out=[]
    try:
        extractor = pke.unsupervised.MultipartiteRank()
        extractor.load_document(input=content,language='en')
        #    not contain punctuation marks or stopwords as candidates.
        #pos = {'PROPN','NOUN',}
        pos = {'PROPN', 'NOUN', 'ADJ', 'VERB', 'ADP', 'ADV', 'DET', 'CONJ', 'NUM', 'PRON', 'X'}

        #pos = {'PROPN','NOUN'}
        stoplist = list(string.punctuation)
        stoplist += ['-lrb-', '-rrb-', '-lcb-', '-rcb-', '-lsb-', '-rsb-']
        stoplist += stopwords.words('english')
        # extractor.candidate_selection(pos=pos, stoplist=stoplist)
        extractor.candidate_selection( pos=pos)
        # 4. build the Multipartite graph and rank candidates using random walk,
        #    alpha controls the weight adjustment mechanism, see TopicRank for
        #    threshold/method parameters.
        extractor.candidate_weighting(alpha=1.1,
                                      threshold=0.75,
                                      method='average')
        keyphrases = extractor.get_n_best(n=15)
        

        for val in keyphrases:
            out.append(val[0])
    except:
        out = []
        #traceback.print_exc()

    return out

def get_keywords(originaltext):
  """
  This function takes the original text and the summary text and generates keywords from both which ever are more relevant
  This is done by checking the keywords generated from the original text to those generated from the summary, so that we get important ones 
  """
  keywords = get_nouns_multipartite(originaltext)
  #print ("keywords unsummarized: ",keywords)
  #keyword_processor = KeywordProcessor()
  #for keyword in keywords:
    #keyword_processor.add_keyword(keyword)

  #keywords_found = keyword_processor.extract_keywords(summarytext)
  #keywords_found = list(set(keywords_found))
  #print ("keywords_found in summarized: ",keywords_found)

  #important_keywords =[]
  #for keyword in keywords:
    #if keyword in keywords_found:
      #important_keywords.append(keyword)

  #return important_keywords
  return keywords

def get_question(context,answer,model,tokenizer):
  """
  This function takes the input context text, pretrained model along with the tokenizer and the keyword and the answer and then generates the question from the large paragraph
  """
  text = "context: {} answer: {}".format(context,answer)
  encoding = tokenizer.encode_plus(text,max_length=384, pad_to_max_length=False,truncation=True, return_tensors="pt").to(device)
  input_ids, attention_mask = encoding["input_ids"], encoding["attention_mask"]

  outs = model.generate(input_ids=input_ids,
                                  attention_mask=attention_mask,
                                  early_stopping=True,
                                  num_beams=5,
                                  num_return_sequences=1,
                                  no_repeat_ngram_size=2,
                                  max_length=72)


  dec = [tokenizer.decode(ids,skip_special_tokens=True) for ids in outs]


  Question = dec[0].replace("question:","")
  Question= Question.strip()
  return Question

def filter_same_sense_words(original,wordlist):
  
  """
  This is used to filter the words which are of same sense, where it takes the wordlist which has the sense of the word attached as the string along with the word itself.
  """
  filtered_words=[]
  base_sense =original.split('|')[1] 
  #print (base_sense)
  for eachword in wordlist:
    if eachword[0].split('|')[1] == base_sense:
      filtered_words.append(eachword[0].split('|')[0].replace("_", " ").title().strip())
  return filtered_words

def get_highest_similarity_score(wordlist,wrd):
  """
  This function takes the given word along with the wordlist and then gives out the max-score which is the levenshtein distance for the wrong answers
  because we need the options which are very different from one another but relating to the same context.
  """
  score=[]
  normalized_levenshtein = NormalizedLevenshtein()
  for each in wordlist:
    score.append(normalized_levenshtein.similarity(each.lower(),wrd.lower()))
  return max(score)

def sense2vec_get_words(word,s2v,topn,question):
    """
    This function takes the input word, sentence to vector model and top similar words and also the question
    Then it computes the sense of the given word
    then it gets the words which are of same sense but are most similar to the given word
    after that we we return the list of words which satisfy the above mentioned criteria
    """
    output = []
    #print ("word ",word)
    try:
      sense = s2v.get_best_sense(word, senses= ["NOUN", "PERSON","PRODUCT","LOC","ORG","EVENT","NORP","WORK OF ART","FAC","GPE","NUM","FACILITY"])
      most_similar = s2v.most_similar(sense, n=topn)
      # print (most_similar)
      output = filter_same_sense_words(sense,most_similar)
      #print ("Similar ",output)
    except:
      output =[]

    threshold = 0.6
    final=[word]
    checklist =question.split()
    for x in output:
      if get_highest_similarity_score(final,x)<threshold and x not in final and x not in checklist:
        final.append(x)
    
    return final[1:]

def mmr(doc_embedding, word_embeddings, words, top_n, lambda_param):
    """
    The mmr function takes document and word embeddings, along with other parameters, and uses the Maximal Marginal Relevance (MMR) algorithm to extract a specified number of keywords/keyphrases from the document. The MMR algorithm balances the relevance of keywords with their diversity, helping to select keywords that are both informative and distinct from each other.
    """

    # Extract similarity within words, and between words and the document
    word_doc_similarity = cosine_similarity(word_embeddings, doc_embedding)
    word_similarity = cosine_similarity(word_embeddings)

    # Initialize candidates and already choose best keyword/keyphrase
    keywords_idx = [np.argmax(word_doc_similarity)]
    candidates_idx = [i for i in range(len(words)) if i != keywords_idx[0]]

    for _ in range(top_n - 1):
        # Extract similarities within candidates and
        # between candidates and selected keywords/phrases
        candidate_similarities = word_doc_similarity[candidates_idx, :]
        target_similarities = np.max(word_similarity[candidates_idx][:, keywords_idx], axis=1)

        # Calculate MMR
        mmr = (lambda_param) * candidate_similarities - (1-lambda_param) * target_similarities.reshape(-1, 1)
        mmr_idx = candidates_idx[np.argmax(mmr)]

        # Update keywords & candidates
        keywords_idx.append(mmr_idx)
        candidates_idx.remove(mmr_idx)

    return [words[idx] for idx in keywords_idx]

def get_distractors_wordnet(word):
    """
    the get_distractors_wordnet function uses WordNet to find a relevant synset for the input word and then generates distractor words by looking at hyponyms of the hypernym associated with the input word. These distractors are alternative words related to the input word and can be used, for example, in educational or language-related applications to provide choices for a given word.
    """
    distractors=[]
    try:
      syn = wn.synsets(word,'n')[0]
      
      word= word.lower()
      orig_word = word
      if len(word.split())>0:
          word = word.replace(" ","_")
      hypernym = syn.hypernyms()
      if len(hypernym) == 0: 
          return distractors
      for item in hypernym[0].hyponyms():
          name = item.lemmas()[0].name()
          #print ("name ",name, " word",orig_word)
          if name == orig_word:
              continue
          name = name.replace("_"," ")
          name = " ".join(w.capitalize() for w in name.split())
          if name is not None and name not in distractors:
              distractors.append(name)
    except:
      print ("Wordnet distractors not found")
    return distractors

def get_distractors (word,origsentence,sense2vecmodel,sentencemodel,top_n,lambdaval):
  """
  this function generates distractor words (answer choices) for a given target word in the context of a provided sentence. It selects distractors based on their similarity to the target word's context and ensures that the target word itself is not included among the distractors. This function is useful for creating multiple-choice questions or answer options in natural language processing tasks.
  """
  distractors = sense2vec_get_words(word,sense2vecmodel,top_n,origsentence)
  #print ("distractors ",distractors)
  if len(distractors) ==0:
    return distractors
  distractors_new = [word.capitalize()]
  distractors_new.extend(distractors)
  # print ("distractors_new .. ",distractors_new)

  embedding_sentence = origsentence+ " "+word.capitalize()
  # embedding_sentence = word
  keyword_embedding = sentencemodel.encode([embedding_sentence])
  distractor_embeddings = sentencemodel.encode(distractors_new)

  # filtered_keywords = mmr(keyword_embedding, distractor_embeddings,distractors,4,0.7)
  max_keywords = min(len(distractors_new),5)
  filtered_keywords = mmr(keyword_embedding, distractor_embeddings,distractors_new,max_keywords,lambdaval)
  # filtered_keywords = filtered_keywords[1:]
  final = [word.capitalize()]
  for wrd in filtered_keywords:
    if wrd.lower() !=word.lower():
      final.append(wrd.capitalize())
  final = final[1:]
  return final


def get_mca_questions(context: str):
    summarized_text = summarizer(context, summary_model, summary_tokenizer)

    # print("Summary: ", summarized_text)
    # summary_text=summarized_text

    imp_keywords = get_keywords(context)
    
    output_list = []
    
    for answer in imp_keywords:
        ques = get_question(summarized_text, answer, question_model, question_tokenizer)
        distractors = get_distractors(answer.capitalize(), ques, s2v, sentence_transformer_model, 40, 0.2)
        
        output = {
            "question": ques,
            "answers": [
                {"answerText": answer.capitalize(), "isCorrect": True}
            ]
        }
        
        if len(distractors) == 0:
            distractors = imp_keywords
        
        if len(distractors) > 0:
            options = distractors[:3]  # Take 3 distractors
            for option in options:
                output["answers"].append({"answerText": option.capitalize(), "isCorrect": False})
        
        random.shuffle(output["answers"])  # Shuffle the answers
        output_list.append(output)
    
    return output_list


# text_1 = '''Cricket is a bat-and-ball game played between two teams of eleven players on a field at the centre of which is a 22-yard (20-metre) pitch with a wicket at each end, each comprising two bails balanced on three stumps. The batting side scores runs by striking the ball bowled at one of the wickets with the bat and then running between the wickets, while the bowling and fielding side tries to prevent this (by preventing the ball from leaving the field, and getting the ball to either wicket) and dismiss each batter (so they are "out"). Means of dismissal include being bowled, when the ball hits the stumps and dislodges the bails, and by the fielding side either catching the ball after it is hit by the bat, but before it hits the ground, or hitting a wicket with the ball before a batter can cross the crease in front of the wicket. When ten batters have been dismissed, the innings ends and the teams swap roles. The game is adjudicated by two umpires, aided by a third umpire and match referee in international matches. They communicate with two off-field scorers who record the match's statistical information.

# Forms of cricket range from Twenty20 (also known as T20), with each team batting for a single innings of 20 overs (each "over" being a set of 6 fair opportunities for the batting team to score) and the game generally lasting three to four hours, to Test matches played over five days. Traditionally cricketers play in all-white kit, but in limited overs cricket they wear club or team colours. In addition to the basic kit, some players wear protective gear to prevent injury caused by the ball, which is a hard, solid spheroid made of compressed leather with a slightly raised sewn seam enclosing a cork core layered with tightly wound string.b'''

# final_questions = get_mca_questions(text_1)

# print(final_questions)
# for q in final_questions: 
#     print(q)

def generate_context_title(context):
  tokenizer = AutoTokenizer.from_pretrained("czearing/article-title-generator")
  model = T5ForConditionalGeneration.from_pretrained("czearing/article-title-generator")

  input_text = context
  input_ids = tokenizer(input_text, return_tensors="pt").input_ids

  outputs = model.generate(input_ids)
  title = tokenizer.decode(outputs[0], skip_special_tokens=True)

  return {"title": title}

def answer_question(context, question):
    model_name = "deepset/roberta-base-squad2"

    nlp = pipeline('question-answering', model=model_name, tokenizer=model_name)
    QA_input = {
        'question': question,
        'context': context
    }
    res = nlp(QA_input)
    
    return res['answer']


app = Flask(__name__)
CORS(app)

@app.route('/generate_qa', methods=['POST'])
def generate_qa():
    data = request.get_json()
    context = data['context']
    question_answer = get_mca_questions(context)
    return jsonify(question_answer)

@app.route('/generate_summary', methods=['POST'])
def generate_summary():
   data=request.get_json()
   context=data['context']  
   paras=context.split("\n")
   for i in paras:
        if i=="":
            paras.remove(i)
   summary=[]
   for para in paras:
        print(para)
        summ=get_summary_in_points(summarizer(para, summary_model, summary_tokenizer))
        print(summ)
        summary.extend(summ)
   return jsonify(summary)
   
@app.route('/generate_notes', methods=['POST'])
def generate_notes():
   data=request.get_json()
   context=data['context']  
   paras=context.split("\n")
   for i in paras:
        if i=="":
            paras.remove(i)
   summary=[]
   for para in paras:
        print(para)
        summ=[summarizer(para, summary_model, summary_tokenizer)]
        print(summ)
        summary.extend(summ)
   return jsonify(summary)

@app.route('/generate-title', methods=['POST'])
def generate_title():
   data=request.get_json()
   context=data['context']
   title=generate_context_title(context)
   return jsonify(title)

@app.route('/mobile-testing')
def mobile_testing():
   return "Yes, It works on mobile too!!!"

 

@app.route('/question-answering', methods=['POST'])
def question_answering():
   data=request.get_json()
   context=data['context']
   question=data['question']
   answer=answer_question(context, question)
   return jsonify(answer)

@app.route('/api/sendMessage', methods=['POST'])
def send_message():
    data = request.json
    message_from_user2 = data.get('message', '')
    
    # Perform any processing or logic here
    # For demonstration, we'll simply return a response message for user1
    response_message_for_user1 = f'Response message for: {message_from_user2}'
    
    return jsonify({'message': response_message_for_user1})

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True, port=5000)
    




# import requests

# API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0"
# headers = {"Authorization": "Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}

# def query(payload):
# 	response = requests.post(API_URL, headers=headers, json=payload)
# 	return response.content
# image_bytes = query({
# 	"inputs": "Astronaut riding a horse",
# })
# # You can access the image with PIL.Image for example
# import io
# from PIL import Image
# image = Image.open(io.BytesIO(image_bytes))
