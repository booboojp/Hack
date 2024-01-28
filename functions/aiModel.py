from transformers import AutoModelForSequenceClassification
from transformers import TFAutoModelForSequenceClassification
from transformers import AutoTokenizer, AutoConfig
import numpy as np
import sys
import json
import os
from scipy.special import softmax
def preprocess(text):
    new_text = []
    for t in text.split(" "):
        t = '@user' if t.startswith('@') and len(t) > 1 else t
        t = 'http' if t.startswith('http') else t
        new_text.append(t)
    return " ".join(new_text)

pretext = sys.argv[1] if len(sys.argv) > 1 else "Covid cases are increasing fast!"

MODEL = f"cardiffnlp/twitter-roberta-base-sentiment-latest"
tokenizer = AutoTokenizer.from_pretrained(MODEL)
config = AutoConfig.from_pretrained(MODEL)
model = AutoModelForSequenceClassification.from_pretrained(MODEL)
os.system('cls')
text = preprocess(pretext)
encoded_input = tokenizer(text, return_tensors='pt')
output = model(**encoded_input)
scores = output[0][0].detach().numpy()
scores = softmax(scores)
os.system('cls')
ranking = np.argsort(scores)
ranking = ranking[::-1]

scores_dict = {config.id2label[ranking[i]]: np.round(float(scores[ranking[i]]), 4) for i in range(scores.shape[0])}
print(json.dumps(scores_dict, indent=4))