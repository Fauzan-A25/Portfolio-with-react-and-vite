'use client';

// src/components/AiAssistant/AiAssistant.jsx
import React, { useState, useRef, useEffect } from 'react';
import './AiAssistant.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/* Inline icons — the project no longer loads an icon webfont. */
const Icon = {
  bot: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2.5" y="5" width="11" height="8.5" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 2.2v2.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="8" cy="1.8" r="1" fill="currentColor" />
      <circle cx="6" cy="9" r="1" fill="currentColor" />
      <circle cx="10" cy="9" r="1" fill="currentColor" />
    </svg>
  ),
  close: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  send: (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M14 2 7 9M14 2l-4.5 12-2.5-5L2 6.5 14 2Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  ),
  code: (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M5 3 1.8 7 5 11M9 3l3.2 4L9 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  folder: (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M1.8 11V3.4h3.4l1.2 1.5h5.8V11H1.8Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  ),
  briefcase: (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="1.8" y="4.4" width="10.4" height="7" rx="1.4" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5 4.4V3.2h4v1.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  info: (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="5.3" stroke="currentColor" strokeWidth="1.3" />
      <path d="M7 6.2v3.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="7" cy="4.4" r="0.75" fill="currentColor" />
    </svg>
  ),
};

const AIAssistant = ({ portfolioData = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Cache for responses
  const responseCache = useRef(new Map());

  // Initialize welcome message when portfolioData is available
  useEffect(() => {
    if (portfolioData?.personalInfo?.name) {
      setMessages([
        {
          type: 'bot',
          text: `Hi there! 👋 I'm an AI assistant here to help you explore **${portfolioData.personalInfo.name}'s** portfolio.\n\nFeel free to ask me anything about his skills, projects, work experience, or education. I'm here to help!`,
          timestamp: new Date()
        }
      ]);
    }
  }, [portfolioData?.personalInfo?.name]);

  // ✅ Dynamic Context - Optimized for efficiency & quality
  const getRelevantContext = (userMessage) => {
    if (!portfolioData) return '';
    
    const lowerMsg = userMessage.toLowerCase();
    const { personalInfo, skills, projects, experiences, education } = portfolioData;
    
    let context = `${personalInfo?.name} - ${personalInfo?.title} at ${personalInfo?.university}
Location: ${personalInfo?.location} | Email: ${personalInfo?.email} | GPA: ${personalInfo?.gpa}
Bio: ${personalInfo?.tagline}

`;
    
    // Skills
    if (skills && lowerMsg.match(/skill|tech|expert|proficient|ability|knowledge/i)) {
      if (skills.programming?.length > 0) {
        const prog = skills.programming.slice(0, 6).map(s => `${s.name}`).join(', ');
        context += `Programming: ${prog}\n`;
      }
      if (skills.dataScience?.length > 0) {
        const ds = skills.dataScience.slice(0, 5).map(s => `${s.name}`).join(', ');
        context += `Data Science/ML: ${ds}\n`;
      }
      if (skills.tools?.length > 0) {
        const tools = skills.tools.slice(0, 5).map(s => s.name).join(', ');
        context += `Tools: ${tools}\n`;
      }
    }
    
    // Projects
    if (projects && lowerMsg.match(/project|work|build|portfolio|create/i)) {
      const projList = projects.slice(0, 3).map(p => 
        `• ${p.title} (${p.year}): ${p.description.substring(0, 120)}... Tech: ${p.technologies?.slice(0, 2).join(', ')}`
      ).join('\n');
      context += `\nProjects:\n${projList}\n`;
    }
    
    // Experience
    if (experiences && lowerMsg.match(/experience|work|job|role|career/i)) {
      const expList = experiences.slice(0, 3).map(e => 
        `• ${e.title} at ${e.company} (${e.period}): ${e.description.substring(0, 100)}`
      ).join('\n');
      context += `\nExperience:\n${expList}\n`;
    }
    
    // Education
    if (education && lowerMsg.match(/education|study|university|degree|course/i)) {
      const edu = education[0];
      context += `\nEducation: ${edu.degree} at ${edu.institution} (${edu.period})
Courses: ${edu.relevantCourses?.slice(0, 4).join(', ')}\n`;
    }
    
    // Contact
    if (lowerMsg.match(/contact|email|reach|linkedin|github|connect/i)) {
      context += `\nContact: ${personalInfo?.email}
GitHub: https://github.com/Fauzan-A25 | LinkedIn: https://linkedin.com/in/fauzanahsanudin\n`;
    }
    
    // Default summary
    if (!context.match(/Programming:|Projects:|Experience:|Education:|Contact:/)) {
      context += `\nSpecialties: ${skills?.programming?.slice(0, 3).map(s => s.name).join(', ')}
Key Projects: ${projects?.filter(p => p.featured).slice(0, 2).map(p => p.title).join(', ')}
Contact: ${personalInfo?.email}\n`;
    }
    
    return context;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // ✅ Enhanced Local Response with data from props - MORE ACCURATE
  const getLocalResponse = (message) => {
    if (!portfolioData) return 'Portfolio data is loading...';
    
    const lowerMessage = message.toLowerCase();
    const { personalInfo, skills, projects, experiences, education } = portfolioData;
    
    // Greetings
    if (lowerMessage.match(/^(hi|hello|hey|good morning|good afternoon|good evening|halo|hai)/i)) {
      return `Hey! 👋 I'm here to help you learn about **${personalInfo?.name}**.\n\nI can tell you about his skills, projects, experience, or anything else from his portfolio. What would you like to know?`;
    }
    
    // How are you
    if (lowerMessage.includes('how are you') || lowerMessage.includes('how r u')) {
      return `I'm doing great! 😊 Ready to help you explore **${personalInfo?.name}'s** portfolio. What interests you?`;
    }
    
    // What can you do
    if (lowerMessage.includes('what can you') || lowerMessage.includes('how can you help')) {
      return `I'm here to help! I can tell you about:\n\n• 💻 **Technical Skills** - Programming & Data Science expertise\n• 🚀 **Projects** - Work and portfolio pieces\n• 💼 **Experience** - Professional roles and background\n• 🎓 **Education** - University and relevant coursework\n• 📧 **Contact** - How to reach out\n\nWhat's on your mind?`;
    }
    
    // Skills
    if (lowerMessage.includes('skill') || lowerMessage.includes('tech') || lowerMessage.includes('expert') || lowerMessage.includes('proficient')) {
      if (!skills?.programming || skills.programming.length === 0) {
        return `I don't have detailed skill information available right now. You can check the skills section on the portfolio for more details!`;
      }
      const prog = skills.programming.slice(0, 5).map(s => `${s.name}`).join(', ') || 'Various';
      const ds = skills.dataScience?.slice(0, 3).map(s => `${s.name}`).join(', ') || 'Data Science';
      return `**${personalInfo?.name}** has strong technical skills:\n\n🔧 **Programming:** ${prog}\n🤖 **Data Science & ML:** ${ds}\n\nHe's particularly passionate about machine learning and building data-driven solutions. Want to know more about a specific skill?`;
    } 
    
    // Projects
    if (lowerMessage.includes('project') || lowerMessage.includes('built') || lowerMessage.includes('build')) {
      if (!projects || projects.length === 0) {
        return `No project information available at the moment.`;
      }
      const featured = projects.filter(p => p.featured).slice(0, 3);
      const projText = featured.map(p => `**${p.title}** (${p.year}) - ${p.shortDescription || p.description?.substring(0, 60)}`).join('\n');
      return `Here are some of **${personalInfo?.name}'s** featured projects:\n\n${projText}\n\nEach project demonstrates expertise in different areas of data science and ML. Want details on any project?`;
    } 
    
    // Experience
    if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('job') || lowerMessage.includes('role')) {
      if (!experiences || experiences.length === 0) {
        return `Experience information isn't available right now. Check back soon!`;
      }
      const exp = experiences.slice(0, 2).map(e => `**${e.title}** at ${e.company}\n${e.period}`).join('\n\n');
      return `**${personalInfo?.name}** has experience in:\n\n${exp}\n\nHe's actively building his professional profile while developing his skills in data science. Interested in learning more?`;
    } 
    
    // Education
    if (lowerMessage.includes('education') || lowerMessage.includes('study') || lowerMessage.includes('university') || lowerMessage.includes('degree')) {
      if (!education || education.length === 0) {
        return `Education details aren't available right now.`;
      }
      const edu = education[0];
      const courses = edu.relevantCourses?.slice(0, 3).join(', ') || 'various courses';
      return `**${personalInfo?.name}** is pursuing a **${edu.degree}** at **${edu.institution}** (${edu.period}).\n\nRelevant courses: ${courses}\n\nHe's passionate about data science and an active member of tech communities!`;
    } 
    
    // Contact
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email') || lowerMessage.includes('linkedin') || lowerMessage.includes('github')) {
      return `Want to connect with **${personalInfo?.name}**?\n\n📧 **Email:** ${personalInfo?.email}\n📍 **Location:** ${personalInfo?.location}\n\nHe's open to collaboration and professional opportunities!`;
    }
    
    // Who is / About
    if (lowerMessage.includes('who') || lowerMessage.includes('about') || lowerMessage.includes('tell me')) {
      return `**${personalInfo?.name}** is a ${personalInfo?.title} at ${personalInfo?.university}, based in ${personalInfo?.location}.\n\n${personalInfo?.tagline}\n\nHe specializes in machine learning, data science, and Python development. What would you like to know more about?`;
    }
    
    // Thank you
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return `You're welcome! 😊 Feel free to ask more about **${personalInfo?.name}'s** work and skills!`;
    }
    
    // Bye
    if (lowerMessage.match(/^(bye|goodbye|see you|see ya|later|gotta go)/i)) {
      return `Thanks for visiting! 👋 Feel free to explore more or come back anytime!`;
    }
    
    // Default - Ask for clarification
    return `I'm here to help! I can tell you about skills, projects, experience, education, or how to contact. What would you like to know about **${personalInfo?.name}**?`;
  };

  // ✅ NEW: Call Serverless Function
  const getGeminiResponse = async (userMessage) => {
    // Check cache first
    const cacheKey = userMessage.toLowerCase().trim();
    if (responseCache.current.has(cacheKey)) {
      console.log('✅ Using cached response');
      return responseCache.current.get(cacheKey);
    }

    try {
      console.log('🚀 Calling /api/chat...');
      
      const relevantContext = getRelevantContext(userMessage);
      
      // Call serverless function
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          context: relevantContext
        })
      });

      console.log('📥 Response status:', response.status);

      const data = await response.json();
      console.log('📦 Response data:', data);

      // Handle successful response
      if (response.ok && data.success && data.response) {
        // Cache successful response
        responseCache.current.set(cacheKey, data.response);
        setTimeout(() => responseCache.current.delete(cacheKey), 3600000); // 1 hour
        
        return data.response;
      }

      // Handle errors with fallback signal
      if (data.fallback) {
        console.warn('⚠️ API suggested fallback, using local response');
        return `💬 **Using local knowledge:**\n\n${getLocalResponse(userMessage)}`;
      }

      // Generic fallback
      console.warn('⚠️ API failed, using local response');
      return getLocalResponse(userMessage);

    } catch (error) {
      console.error('❌ API call failed:', error);
      return `⚠️ **Connection error.** Here's from local data:\n\n${getLocalResponse(userMessage)}`;
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isTyping) return;

    const userMessage = {
      type: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    const currentMessage = inputValue;
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // ✅ Call serverless function (not direct API)
      const botResponseText = await getGeminiResponse(currentMessage);
      
      const botResponse = {
        type: 'bot',
        text: botResponseText,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Unexpected error:', error);
      
      const errorMessage = {
        type: 'bot',
        text: getLocalResponse(currentMessage),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickActions = [
    { text: 'Tell me about skills', icon: Icon.code },
    { text: 'Show me projects', icon: Icon.folder },
    { text: "What's the experience?", icon: Icon.briefcase },
  ];

  const handleQuickAction = (text) => {
    setInputValue(text);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.form.requestSubmit();
      }
    }, 100);
  };

  // Don't render if no data
  if (!portfolioData) return null;

  return (
    <>
      <button 
        className={`ai-chat-button ${isOpen ? 'active' : ''}`}
        onClick={toggleChat}
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? Icon.close : Icon.bot}
        {!isOpen && <span className="button-pulse"></span>}
      </button>

      {isOpen && (
        <div className="ai-chat-window">
          <div className="chat-header">
            <div className="header-info">
              <div className="bot-avatar">
                {Icon.bot}
              </div>
              <div className="header-text">
                <h3>AI Assistant</h3>
                <span className="status">
                  <span className="status-dot"></span>
                  Online {/* ✅ Always online with serverless */}
                </span>
              </div>
            </div>
            <div className="header-actions">
              <button 
                className="header-btn close-btn"
                onClick={toggleChat}
                aria-label="Close chat"
              >
                {Icon.close}
              </button>
            </div>
          </div>

          <div className="chat-body">
            <div className="messages-container">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.type}`}>
                  {msg.type === 'bot' && (
                    <div className="message-avatar">
                      {Icon.bot}
                    </div>
                  )}
                  <div className="message-content">
                    <div className="message-bubble">
                      {msg.type === 'bot' ? (
                        <ReactMarkdown 
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({node, ...props}) => <p className="markdown-p" {...props} />,
                            strong: ({node, ...props}) => <strong className="markdown-strong" {...props} />,
                            em: ({node, ...props}) => <em className="markdown-em" {...props} />,
                            code: ({node, inline, ...props}) => 
                              inline ? 
                                <code className="markdown-code-inline" {...props} /> : 
                                <code className="markdown-code-block" {...props} />,
                            ul: ({node, ...props}) => <ul className="markdown-ul" {...props} />,
                            ol: ({node, ...props}) => <ol className="markdown-ol" {...props} />,
                            li: ({node, ...props}) => <li className="markdown-li" {...props} />,
                            a: ({node, ...props}) => <a className="markdown-link" target="_blank" rel="noopener noreferrer" {...props} />,
                          }}
                        >
                          {msg.text}
                        </ReactMarkdown>
                      ) : (
                        msg.text
                      )}
                    </div>
                    <span className="message-time">
                      {msg.timestamp.toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="message bot">
                  <div className="message-avatar">
                    {Icon.bot}
                  </div>
                  <div className="message-content">
                    <div className="message-bubble typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {messages.length <= 1 && (
              <div className="quick-actions">
                <p className="quick-actions-title">Quick questions:</p>
                {quickActions.map((action, index) => (
                  <button 
                    key={index}
                    className="quick-action-btn"
                    onClick={() => handleQuickAction(action.text)}
                  >
                    {action.icon}
                    {action.text}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="chat-footer">
            <form onSubmit={handleSendMessage} className="message-form">
              <input
                ref={inputRef}
                type="text"
                className="message-input"
                placeholder="Ask me anything..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isTyping}
              />
              <button 
                type="submit" 
                className="send-btn"
                disabled={!inputValue.trim() || isTyping}
                aria-label="Send message"
              >
                {Icon.send}
              </button>
            </form>
            <p className="footer-note">
              {Icon.info}
              AI-Powered Assistant • May not be 100% accurate
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
