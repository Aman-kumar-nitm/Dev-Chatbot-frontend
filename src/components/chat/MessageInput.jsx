import React, { useState, useEffect, useRef } from 'react';
import { FiSend, FiAlertCircle } from 'react-icons/fi';
import Loader from '../common/Loader';

const MessageInput = ({ onSendMessage, disabled, isSending }) => {
  const [message, setMessage] = useState('');
  const [rows, setRows] = useState(1);
  const textareaRef = useRef(null);
const [listening, setListening] = useState(false);
const recognitionRef = useRef(null);

  const maxLength = 500;
  const charCount = message.length;

  useEffect(() => {
    adjustHeight();
  }, [message]);

  useEffect(() => {
  return () => recognitionRef.current?.stop();
}, []);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    const newHeight = Math.min(textarea.scrollHeight, 150); // Max 150px height
    textarea.style.height = `${newHeight}px`;
    setRows(newHeight / 24); // Assuming line-height of 24px
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (message.trim() && !disabled && !isSending) {
      onSendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setMessage(value);
    }
  };
  const startListening = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech recognition not supported in this browser");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = true;

  recognition.onresult = (event) => {
    let transcript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    setMessage(transcript);
  };

  recognition.onend = () => {
    setListening(false);
  };

  recognition.start();
  recognitionRef.current = recognition;
  setListening(true);
};

const stopListening = () => {
  recognitionRef.current?.stop();
  setListening(false);
};

  return (
    <div className="space-y-2">
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here... (Shift + Enter for new line)"
          className="w-full px-4 py-3 pr-12 bg-gray-800 border border-gray-700 rounded-xl 
                   focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent 
                   resize-none overflow-y-auto text-gray-200 placeholder-gray-500 scrollbar-hide"
          rows={1}
          disabled={disabled || isSending}
        />
        
        <div className="absolute right-3 bottom-3 flex items-center gap-2">

  {/* 🎤 Mic Button */}
  <button
    onClick={listening ? stopListening : startListening}
    disabled={disabled || isSending}
    className={`p-2 rounded-lg transition-all ${
      listening
        ? 'bg-red-600 text-white animate-pulse'
        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
    }`}
    title="Voice input"
  >
    🎤
  </button>

  {/* 📤 Send Button */}
  <button
    onClick={handleSend}
    disabled={!message.trim() || disabled || isSending}
    className={`p-2 rounded-lg transition-all ${
      message.trim() && !disabled
        ? 'bg-primary-600 hover:bg-primary-700 text-white'
        : 'bg-gray-700 text-gray-500 cursor-not-allowed'
    }`}
    title="Send message"
  >
    <FiSend size={18} />
  </button>

</div>

      </div>

      {/* Character counter and info */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-gray-500">
          <span className={`${charCount > maxLength * 0.9 ? 'text-yellow-400' : ''}`}>
            {charCount}/{maxLength}
          </span>
          <span className="text-xs">•</span>
          <span>Press Enter to send</span>
        </div>
        
        {disabled && !isSending && (
          <div className="flex items-center gap-1 text-red-400">
            <FiAlertCircle size={14} />
            <span className="text-sm">Cannot send message</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageInput;