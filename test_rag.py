import urllib.request
import urllib.parse
import json

BASE_URL = "http://127.0.0.1:8000/api/v1/rag"

print("1. Ingesting Medical Data...")
data = urllib.parse.urlencode({
    "text": "The flu (influenza) is a viral infection that attacks your respiratory system. Common symptoms include fever, chills, muscle aches, cough, congestion, runny nose, headaches, and fatigue. Treatment typically involves rest and fluid intake.",
    "source": "medical_manual"
}).encode()
req = urllib.request.Request(f"{BASE_URL}/ingest/text", data=data)
with urllib.request.urlopen(req) as response:
    print("Ingest Response:", json.loads(response.read().decode()))

print("\n2. Asking a Medical Question...")
data = json.dumps({"question": "What are the common symptoms of the flu?"}).encode()
req = urllib.request.Request(f"{BASE_URL}/query", data=data, headers={'Content-Type': 'application/json'})
with urllib.request.urlopen(req) as response:
    print("Medical Question Response:", json.loads(response.read().decode()))

print("\n3. Asking a Non-Medical Question...")
data = json.dumps({"question": "Can you write a python script to reverse a string?"}).encode()
req = urllib.request.Request(f"{BASE_URL}/query", data=data, headers={'Content-Type': 'application/json'})
with urllib.request.urlopen(req) as response:
    print("Non-Medical Question Response:", json.loads(response.read().decode()))
