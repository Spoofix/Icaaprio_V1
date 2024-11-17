import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Mic, Send, X, Volume2, Loader } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { generateICAAPResponse } from '../../services/openai';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

// Configure marked with syntax highlighting
marked.setOptions({
  highlight: function(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-'
});

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  html?: string;
}

export default function ICAAPAssistant() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognition = useRef<any>(null);
  const synthesis = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window) {
      recognition.current = new (window as any).webkitSpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;

      recognition.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setCurrentMessage(transcript);
        handleSendMessage(transcript);
        setIsListening(false);
      };

      recognition.current.onerror = () => {
        setIsListening(false);
      };
    }

    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      synthesis.current = window.speechSynthesis;
    }

    return () => {
      if (recognition.current) {
        recognition.current.stop();
      }
      if (synthesis.current) {
        synthesis.current.cancel();
      }
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleAssistant = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      const welcomeMessage = `Hi ${user?.firstName}! I'm IRIS (Intelligent Regulatory ICAAP Support), your ICAAP assistant. I can help you with:

1. Understanding regulatory requirements (OSFI, BCFSA, FSRA)
2. Capital planning and assessment
3. Stress testing frameworks
4. Risk management guidelines

What would you like to know about?`;
      
      setMessages([{ 
        id: Date.now().toString(),
        text: welcomeMessage,
        isUser: false,
        html: marked(welcomeMessage)
      }]);
    }
  };

  const toggleSpeechRecognition = () => {
    if (!recognition.current) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    if (isListening) {
      recognition.current.stop();
      setIsListening(false);
    } else {
      recognition.current.start();
      setIsListening(true);
    }
  };

  const speakMessage = (text: string) => {
    if (!synthesis.current) {
      alert('Speech synthesis is not supported in your browser.');
      return;
    }

    // Cancel any ongoing speech
    synthesis.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    synthesis.current.speak(utterance);
  };

  const handleSendMessage = async (text: string = currentMessage) => {
    if (!text.trim()) return;

    const userMessage = { 
      id: Date.now().toString(),
      text, 
      isUser: true,
      html: marked(text)
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    try {
      const institutionType = user?.company?.type || 'bank';
      const response = await generateICAAPResponse(
        messages.concat(userMessage).map(msg => ({
          role: msg.isUser ? 'user' : 'assistant',
          content: msg.text
        })),
        institutionType
      );

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        html: marked(response)
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: 'I apologize, but I encountered an error. Please try again.',
        isUser: false,
        html: marked('I apologize, but I encountered an error. Please try again.')
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <button
        onClick={toggleAssistant}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 w-96 h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col z-50">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center">
              <MessageCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
              <h3 className="text-lg font-medium">IRIS - ICAAP Assistant</h3>
            </div>
            <button onClick={toggleAssistant}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isUser
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}
                >
                  <div 
                    className="prose dark:prose-invert max-w-none text-sm"
                    dangerouslySetInnerHTML={{ __html: message.html || '' }}
                  />
                  {!message.isUser && (
                    <button
                      onClick={() => speakMessage(message.text)}
                      className="mt-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <Loader className="w-5 h-5 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <textarea
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about ICAAP..."
                className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                rows={2}
                disabled={isLoading}
              />
              <button
                onClick={toggleSpeechRecognition}
                disabled={isLoading}
                className={`p-2 rounded-lg ${
                  isListening ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                } hover:bg-gray-200 disabled:opacity-50`}
              >
                <Mic className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleSendMessage()}
                disabled={isLoading || !currentMessage.trim()}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}