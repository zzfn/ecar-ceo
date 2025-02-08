"use client";
import * as motion from "motion/react-client"
import { useState } from 'react'

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '你好！我是你的AI助手。我会协助你做出更好的经营决策。有什么我可以帮你的吗？'
    }
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    
    setMessages(prev => [...prev, {
      role: 'user',
      content: input
    }])
    setInput('')
    
    // 这里后续需要接入实际的AI对话功能
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '我理解你的问题。让我为你分析一下...'
      }])
    }, 1000)
  }

  return (
    <div className="w-96 bg-black/30 border-l border-white/10 flex flex-col">
      <div className="p-4 border-b border-white/10">
        <h2 className="text-lg font-bold text-gray-300">AI 助手</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-blue-600/20 text-blue-100'
                  : 'bg-white/5 text-gray-300'
              }`}
            >
              {message.content}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="p-4 border-t border-white/10">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="输入你的问题..."
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            发送
          </motion.button>
        </div>
      </div>
    </div>
  )
} 