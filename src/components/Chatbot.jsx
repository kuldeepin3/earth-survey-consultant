import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const FAQ_KNOWLEDGE_BASE = [
  {
    keywords: ['price', 'cost', 'quote', 'estimate', 'rate', 'how much'],
    answer: "Our surveying rates depend on the acreage and terrain. Standard boundary surveys start around ₹6,000 for 1 acre. You can use our Instant Estimator section on this page to get a live calculation, or email us at forpurpose119@gmail.com."
  },
  {
    keywords: ['kirit', 'prajapati', 'founder', 'owner', 'who leads', 'surveyor'],
    answer: "Earth Survey Consultant is personally led by Principal Surveyor Mr. Kirit Prajapati. He has over 10+ years of professional geomatics experience and personally supervises all field measurements and computations."
  },
  {
    keywords: ['equipment', 'dgps', 'total station', 'accuracy', 'precision', 'tools'],
    answer: "We utilize cutting-edge surveying instruments including CHCNAV i73+ GNSS RTK/DGPS receivers and computerized Total Stations, offering millimeter-to-centimeter precision across all terrain."
  },
  {
    keywords: ['service', 'services', 'what do you do', 'contour', 'topography', 'canal', 'pipeline'],
    answer: "We provide: 1) Land & Boundary Surveys, 2) Topography & Contour Mapping, 3) C/S & L/S Work, 4) Highway & Pipeline Alignment, 5) Building Plotting & Setting Out, and 6) Canal & Cadastral Demarcation."
  },
  {
    keywords: ['location', 'area', 'gujarat', 'vadodara', 'where', 'office', 'ahmedabad'],
    answer: "Our head office is in Vadodara, Gujarat (Near RC Dutt Road, Alkapuri). We operate across all districts of Gujarat, including Ahmedabad, Surat, Rajkot, Bharuch, and Anand."
  },
  {
    keywords: ['contact', 'phone', 'whatsapp', 'call', 'email', 'number'],
    answer: "You can reach us directly via email at forpurpose119@gmail.com. We review all project details and respond within 24 hours."
  }
];

const findLocalAnswer = (query) => {
  const q = query.toLowerCase();
  for (const item of FAQ_KNOWLEDGE_BASE) {
    if (item.keywords.some(k => q.includes(k))) {
      return item.answer;
    }
  }
  return null;
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Welcome to Earth Survey Consultant! How can I assist you with your land surveying or mapping project today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend) => {
    const text = textToSend || input.trim();
    if (!text || isLoading) return;

    const userMessage = { role: 'user', content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    // Check intelligent local knowledge base first
    const localAnswer = findLocalAnswer(text);

    if (localAnswer) {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: localAnswer }]);
        setIsLoading(false);
      }, 500);
      return;
    }

    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (!apiKey) {
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: "Thank you for reaching out! For specific project consultations or official quotes, please email us at forpurpose119@gmail.com or fill in the 'Get in Touch' form below." 
        }]);
        setIsLoading(false);
      }, 500);
      return;
    }

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.href,
          'X-Title': 'Earth Survey Consultant Bot',
        },
        body: JSON.stringify({
          model: 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',
          messages: [
            { role: 'system', content: "You are the expert digital assistant for Earth Survey Consultant, led by Mr. Kirit Prajapati in Gujarat, India. Provide concise, professional answers on land surveying, topography, DGPS, and cost estimates." },
            ...newMessages.map(m => ({ role: m.role, content: m.content }))
          ],
        })
      });

      if (!response.ok) throw new Error(`Status ${response.status}`);
      const data = await response.json();
      const botResponse = data.choices[0].message.content;
      setMessages(prev => [...prev, { role: 'assistant', content: botResponse }]);
    } catch (err) {
      console.warn('Chatbot API fallback:', err);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "We provide comprehensive land, topographic, and engineering surveying across Gujarat. Feel free to email us at forpurpose119@gmail.com for an inquiry!" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <div className="chatbot-container">
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <h3><i className="fa-solid fa-satellite-dish"></i> Survey Assistant</h3>
          <button className="chatbot-close" onClick={toggleChat} aria-label="Close Chat">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        
        <div className="chatbot-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-bubble ${msg.role === 'user' ? 'user' : 'assistant'}`}>
              {msg.content}
            </div>
          ))}
          {isLoading && (
            <div className="chat-bubble assistant chat-loading">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', padding: '8px 12px', background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', scrollbarWidth: 'none' }}>
          <button 
            type="button" 
            onClick={() => handleSend("What is the cost of a survey?")}
            style={{ whiteSpace: 'nowrap', padding: '4px 10px', fontSize: '0.78rem', borderRadius: '15px', border: '1px solid var(--brand-primary)', background: 'rgba(245, 158, 11, 0.1)', color: 'var(--brand-primary)', cursor: 'pointer', fontWeight: 600 }}
          >
            💰 Estimated Cost
          </button>
          <button 
            type="button" 
            onClick={() => handleSend("What equipment do you use?")}
            style={{ whiteSpace: 'nowrap', padding: '4px 10px', fontSize: '0.78rem', borderRadius: '15px', border: '1px solid var(--border-color)', background: 'var(--bg-alt)', color: 'var(--text-color)', cursor: 'pointer', fontWeight: 500 }}
          >
            🛰️ Equipment
          </button>
          <button 
            type="button" 
            onClick={() => handleSend("Areas covered in Gujarat?")}
            style={{ whiteSpace: 'nowrap', padding: '4px 10px', fontSize: '0.78rem', borderRadius: '15px', border: '1px solid var(--border-color)', background: 'var(--bg-alt)', color: 'var(--text-color)', cursor: 'pointer', fontWeight: 500 }}
          >
            📍 Areas Covered
          </button>
        </div>

        <form className="chatbot-input-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ask about surveying, rates, DGPS..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <button type="submit" disabled={!input.trim() || isLoading} title="Send Message">
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </form>
      </div>

      <button className="chatbot-toggle" onClick={toggleChat} aria-label="Toggle Survey Assistant" title="Chat with Survey Assistant">
        {isOpen ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-comments"></i>}
      </button>
    </div>
  );
};

export default Chatbot;
