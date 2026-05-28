# ConvoLink — Multilingual AI Tax & Banking Advisory Chatbot

ConvoLink is an intelligent, production-ready multilingual chatbot that delivers accurate, structured, and compliant tax & GST advisory using **Large Language Models** and **RAG-inspired knowledge retrieval**. It focuses on advanced prompt engineering to generate safe, actionable, and well-formatted responses for real-world financial queries.

## Engineering & Architectural Decisions

### Why LLM + RAG-style Architecture?
Traditional rule-based chatbots fail to handle complex, context-heavy financial queries. I designed ConvoLink using **Google Gemini LLM** combined with **Retrieval-Augmented Generation (RAG) principles**:

* **Grounded Responses**: Instead of relying solely on the LLM’s parametric knowledge, the system injects a curated Tax & GST knowledge base into the prompt. This significantly reduces hallucinations and ensures compliance with Indian tax laws.
* **Advanced Prompt Engineering**: Crafted detailed system prompts with strict instructions for response structure, language detection, legal safety, and formatting — turning raw LLM output into professional, user-friendly advisory.
* **Multilingual Capability**: Built-in language detection and response generation allows seamless support for English, Hindi, and other languages.

## Core Engineering Features

### 1. Structured Prompt Engineering Pipeline
- Designed a comprehensive prompt template that enforces consistent output format with sections like Scenario Summary, Legal Recommendations, GST Implications, and Step-by-Step Action Plan.
- Implemented safety constraints to ensure only legal tax-saving strategies are suggested.
- Used dynamic context injection from the knowledge base based on user queries.

### 2. Knowledge Base Integration
- Built a clean retrieval system that loads and injects relevant portions of the Tax & GST knowledge base (updated as of Sep 2025) into every conversation.

### 3. Production-Ready REST API Backend
- Developed a robust Flask-based backend with proper error handling, input validation, and CORS support.
- Designed a clean REST endpoint (`/api/chat`) ready for integration and scaling.

## Technical Stack

* **Language**: Python
* **Backend**: Flask (REST API)
* **LLM**: Google Gemini 1.5 Flash
* **Techniques**: Advanced Prompt Engineering, RAG-style Retrieval, Multilingual NLP
* **Others**: dotenv, Flask-CORS
* **Frontend**: React + Vite

## Impact & Key Achievements

- Successfully handles complex tax scenarios (freelancers, salaried, GST queries, etc.)
- Delivers consistently structured, professional, and actionable responses
- Demonstrates practical application of LLM APIs in the **banking and financial domain**

## Disclaimer
This project is built for **educational and demonstration purposes only**. The advice provided should not be considered as official financial or tax consultation. Users are advised to consult certified professionals.
