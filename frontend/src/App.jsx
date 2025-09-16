import React, { useState, useRef, useEffect } from 'react';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [lang, setLang] = useState('auto');
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  // Auto-scroll on new messages
  useEffect(() => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userText = input.trim();
    setMessages((prev) => [...prev, { from: 'user', text: userText }]);
    setInput('');
    setLoading(true);

    try {
      const resp = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_message: userText,
          language: lang,
        }),
      });
      const data = await resp.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { from: 'bot', text: data.reply }]);
      } else if (data.error) {
        setMessages((prev) => [...prev, { from: 'bot', text: 'Error: ' + data.error }]);
      }
    } catch (e) {
      setMessages((prev) => [...prev, { from: 'bot', text: 'Network or server error' }]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen font-inter bg-white text-black">
      {/* Header */}
      <header className="flex items-center justify-start p-2 border-b border-gray-200">
        <h1
          className="text-xl"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 300, // Light
            marginLeft: '32px', // Shift to the right
          }}
        >
          CONVOLINK
        </h1>
        {/* Three-dot button removed */}
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col items-center py-6">
        <div className="w-full max-w-3xl flex-1 flex flex-col px-4">
          {/* Messages */}
          <div ref={containerRef} className="flex-grow space-y-6 overflow-y-auto">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`${
                    msg.from === 'user' ? 'bg-gray-100' : 'bg-gray-200'
                  } rounded-lg p-3 max-w-lg`}
                >
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 rounded-lg p-3 max-w-lg">
                  <p>Typing...</p>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="mt-auto pt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Hello.."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-white border border-black rounded-full py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendMessage}
                className="absolute inset-y-0 right-0 flex items-center pr-4"
              >
                <span className="material-symbols-outlined text-blue-600">send</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
