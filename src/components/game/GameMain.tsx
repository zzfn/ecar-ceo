"use client";
import { motion } from "framer-motion"
import { useState } from 'react'

type Department = 'research' | 'production' | 'marketing' | 'hr'

export default function GameMain() {
  const [activeAI, setActiveAI] = useState<Department | null>(null)
  const [aiResponse, setAiResponse] = useState('')

  const handleAIConsult = (department: Department) => {
    setActiveAI(department)
    // 模拟AI响应
    const responses = {
      research: "根据市场分析，建议加大对固态电池技术的研发投入。当前的研发方向符合行业趋势，但进度可以适当加快。",
      production: "生产线利用率达到85%，建议对轿车生产线进行智能化升级，可以提高20%的生产效率。",
      marketing: "竞品分析显示，可以加强在年轻用户群体中的品牌建设。建议增加社交媒体营销预算。",
      hr: "人才结构分析显示，需要补充新能源领域的高级工程师。建议开展校企合作项目。"
    }
    setAiResponse(responses[department])
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="grid grid-cols-2 gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-6 rounded-xl border border-blue-500/20 cursor-pointer hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold mb-4">研发中心</h3>
            <p className="text-gray-400 mb-4">投资新技术，提升产品竞争力</p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-blue-400">当前项目: 新一代电池技术</span>
              <button 
                onClick={() => handleAIConsult('research')}
                className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
              >
                AI分析
              </button>
            </div>
            {activeAI === 'research' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-blue-500/10 rounded-lg text-sm text-blue-100"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs px-2 py-1 bg-blue-500/20 rounded-full">AI建议</span>
                </div>
                {aiResponse}
              </motion.div>
            )}
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-green-500/10 to-green-600/10 p-6 rounded-xl border border-green-500/20 cursor-pointer hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold mb-4">生产制造</h3>
            <p className="text-gray-400 mb-4">管理生产线，确保产能输出</p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-green-400">生产效率: 85%</span>
              <button 
                onClick={() => handleAIConsult('production')}
                className="px-4 py-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30"
              >
                AI分析
              </button>
            </div>
            {activeAI === 'production' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-green-500/10 rounded-lg text-sm text-green-100"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs px-2 py-1 bg-green-500/20 rounded-full">AI建议</span>
                </div>
                {aiResponse}
              </motion.div>
            )}
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 p-6 rounded-xl border border-purple-500/20 cursor-pointer hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold mb-4">市场营销</h3>
            <p className="text-gray-400 mb-4">制定营销策略，提升品牌价值</p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-purple-400">营销活动: 2个进行中</span>
              <button 
                onClick={() => handleAIConsult('marketing')}
                className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"
              >
                AI分析
              </button>
            </div>
            {activeAI === 'marketing' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-purple-500/10 rounded-lg text-sm text-purple-100"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs px-2 py-1 bg-purple-500/20 rounded-full">AI建议</span>
                </div>
                {aiResponse}
              </motion.div>
            )}
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-red-500/10 to-red-600/10 p-6 rounded-xl border border-red-500/20 cursor-pointer hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold mb-4">人力资源</h3>
            <p className="text-gray-400 mb-4">招募人才，培养团队</p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-red-400">员工满意度: 90%</span>
              <button 
                onClick={() => handleAIConsult('hr')}
                className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"
              >
                AI分析
              </button>
            </div>
            {activeAI === 'hr' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-red-500/10 rounded-lg text-sm text-red-100"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs px-2 py-1 bg-red-500/20 rounded-full">AI建议</span>
                </div>
                {aiResponse}
              </motion.div>
            )}
          </motion.div>
        </div>

        <div className="bg-white/5 p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4">最新动态</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <p className="text-gray-300">新型电池研发项目进度达到75%</p>
              <span className="text-sm text-gray-500">2小时前</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
              <p className="text-gray-300">轿车生产线开始例行维护</p>
              <span className="text-sm text-gray-500">4小时前</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              <p className="text-gray-300">新一轮营销活动取得显著成效</p>
              <span className="text-sm text-gray-500">1天前</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 