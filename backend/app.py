import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in .env file")

# Configure Gemini API
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")  # Free-tier Gemini model

# Load KB from kb/kb_tax.json
KB_PATH = os.path.join(os.path.dirname(__file__), "kb", "kb.txt")
with open(KB_PATH, "r", encoding="utf-8") as f:
    TAX_KB = f.read()

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Tax Advisory Chatbot backend is running!"

@app.route("/api/chat", methods=["POST"])
def chat():
    """
    Expects JSON:
    {
        "user_message": "I am a freelancer earning 12 lakh, how can I save taxes?",
        "language": "en" | "hi" | "de" | "auto"
    }
    Returns JSON:
    {
        "reply": "Answer from Gemini using KB in the same language as user."
    }
    """
    data = request.get_json()
    user_message = data.get("user_message", "").strip()
    language = data.get("language", "").strip() or "auto"

    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    # Build prompt for Gemini
    prompt = f"""
You are a professional Indian tax advisor chatbot. Use ONLY the knowledge from the Tax KB below.
Knowledge Base (Indian Taxes & GST as of 9 Sep 2025):
{TAX_KB}

User scenario (language hint: {language}):
{user_message}

Instructions for response formatting:
1. Detect the language if 'auto' is provided.
2. Respond in the same language as the user.
3. Structure your response clearly as follows using points and subpoints:
   ✅ Scenario Summary
       ➤ ...
   ✅ Legal Tax-Saving Recommendations
       ➤ ...
   ✅ GST Implications (if applicable)
       ➤ ...
   ✅ Step-by-Step Action Plan
       ➤ ...
4. Always suggest legal tax-saving strategies only.
5. Use simple, human-readable language and examples.
6. If the KB does not cover the scenario, respond: "Sorry, I do not have sufficient information for this scenario."
7. Use symbols like ✅ for main points and ➤ for subpoints.
8. Make the response actionable and easy to read, similar to ChatGPT structured answers.
"""

    try:
        response = model.generate_content(prompt)
        bot_reply = response.text.strip()
    except Exception as e:
        bot_reply = f"Error contacting Gemini API: {str(e)}"

    return jsonify({"reply": bot_reply})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
