from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
from groq import Groq
import os

load_dotenv()

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

app = Flask(__name__)
CORS(app)

LAWN_CARE_DIR = os.path.dirname(os.path.abspath(__file__))

SYSTEM_PROMPT = """You are a friendly customer support assistant for a Calgary-based home services company. The company offers three services:

1. Lawn Care — mowing, edging, weed removal, fertilizing, leaf & debris cleanup, seasonal maintenance for residential and commercial properties. Recommended weekly or bi-weekly during growing season.

2. Packing & Moving — full packing service, loading & unloading, furniture disassembly & assembly, premium materials (boxes, bubble wrap, shrink wrap) included, moving trucks in various sizes, on-time delivery guarantee. Most residential moves done in a single day (1–2 bed: 3–5 hrs, 4+ bed: 8–10 hrs).

3. Fence Building — custom wood, vinyl, and chain-link fences for residential and commercial properties. Most installs done in 1–2 days. Includes post & panel warranty and site cleanup.

Business Details:
- Phone: 587-962-1919
- Email: calgary@letsgetmoving.ca
- Address: 1212 34 Ave SE, Calgary, AB T2G 1V7
- Hours: Mon–Fri 6am–9pm, Sat–Sun 8am–5pm
- Licensed & insured, free estimates, no hidden costs
- 4.9/5 Google Rating, 355,000+ happy customers, 15+ years experience

Keep responses short and to the point — 2 to 4 sentences max. Include only the most important information. No long paragraphs. Only answer questions related to these services. Only mention contact details (phone, email, address) when the user specifically asks about pricing, booking, or how to get in touch — do not include them in every response."""


@app.route("/")
def index():
    return send_from_directory(LAWN_CARE_DIR, "index.html")


BLOCKED = {'app.py', '.env', 'requirements.txt', 'Procfile', '.gitignore'}

@app.route("/<path:filename>")
def static_files(filename):
    if filename in BLOCKED or filename.startswith('.'):
        return jsonify({"error": "Not found"}), 404
    return send_from_directory(LAWN_CARE_DIR, filename)


@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    messages = data.get("messages", [])

    if not messages:
        return jsonify({"error": "No messages provided"}), 400

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "system", "content": SYSTEM_PROMPT}] + messages
        )
        reply = response.choices[0].message.content
        return jsonify({"reply": reply})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
