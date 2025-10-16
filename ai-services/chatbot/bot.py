import google.generativeai as genai
from pymongo import MongoClient
from config import GOOGLE_AI_KEY, MONGO_URI, DB_NAME, COLLECTION_NAME
import argparse
import sys

# ---------------------------------------------
# Gemini Configuration
# ---------------------------------------------
genai.configure(api_key=GOOGLE_AI_KEY)
model = genai.GenerativeModel("gemini-2.0-flash")

# ---------------------------------------------
# MongoDB Setup
# ---------------------------------------------
client = MongoClient(MONGO_URI)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]

# ---------------------------------------------
# Fetch Knowledge from MongoDB
# ---------------------------------------------
def get_knowledge_from_mongo():
    docs = list(collection.find({}, {"_id": 0}))
    if not docs:
        #print("⚠️ No data found in MongoDB collection!")
        return "No data available in the database."
    
    
    return "\n".join([str(doc) for doc in docs])


# ---------------------------------------------
# Generate Gemini Response
# ---------------------------------------------
def generate_response(user_message: str) -> str:
    knowledge = get_knowledge_from_mongo()

    prompt = f"""
You are a friendly and knowledgeable chatbot.

Your behavior:
1. If the user's question matches or relates to the data below, answer strictly from it.
2. If it’s a general or casual question (like greetings, basic facts, or who you are), respond naturally.
3. If it’s completely outside these areas, reply:
   "I'm sorry, I can only answer questions related to the available database or general topics."

Here is the database content you can use:
{knowledge}

User: {user_message}
"""

    try:
        response = model.generate_content(prompt)
        return response.text.strip() if response and response.text else "I'm sorry, I didn’t understand that."
    except Exception as e:
        return f"Error: {e}"

# ---------------------------------------------
# CLI Chat Interface or API Mode
# ---------------------------------------------
def main():
    # Check if script is being run with arguments
    parser = argparse.ArgumentParser(description='Chatbot with MongoDB knowledge base')
    parser.add_argument('--message', type=str, help='Message to process (API mode)')
    args = parser.parse_args()
    
    # API mode - process single message and exit
    if args.message:
        reply = generate_response(args.message)
        print(reply)
        return
    
    # Interactive CLI mode
    print("🤖 MongoDB + Gemini Chatbot (with basic question support)")
    print("Type 'exit' to quit.\n")

    while True:
        user_input = input("You: ")
        if user_input.lower() in ["exit", "quit"]:
            print("Chatbot: Goodbye!")
            break

        reply = generate_response(user_input)
        print(f"Chatbot: {reply}\n")

if __name__ == "__main__":
    main()

