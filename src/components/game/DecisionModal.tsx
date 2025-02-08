"use client";
import { motion, AnimatePresence } from "framer-motion"
import { useGameStore } from "@/store/gameStore"
import { useEffect, useState } from "react"

interface Decision {
  title: string
  description: string
  impact: string
  color: "blue" | "green" | "purple"
}

export default function DecisionModal() {
  const { 
    isChoosing, 
    makeChoice,
    isProcessingChoice,
    money,
    market,
    research,
    production,
    hr,
    vehicles
  } = useGameStore()
  const [decisions, setDecisions] = useState<Decision[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isChoosing) {
      generateDecisions()
    }
  }, [isChoosing])

  const generateDecisions = async () => {
    setLoading(true)
    try {
      const { money, market, research, production, hr } = useGameStore.getState()
      
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          systemPrompt: `作为一位新能源汽车企业顾问，你需要基于企业当前状况，生成3个战略决策选项。
每个决策应该针对研发、生产、市场营销或人力资源其中一个方向。
请直接返回JSON数组，每个选项必须严格按照以下格式：

示例返回：
[
  {
    "title": "加速电池研发",
    "description": "投入10亿元研发固态电池技术",
    "impact": "研发进度+30%，续航里程提升50%",
    "color": "blue"
  },
  {
    "title": "扩建生产线",
    "description": "新建智能化生产线两条",
    "impact": "月产能+5000台，效率提升20%",
    "color": "green"
  },
  {
    "title": "品牌升级",
    "description": "全面提升品牌定位和营销策略",
    "impact": "品牌影响力提升2级，市占率+5%",
    "color": "purple"
  }
]

注意：
1. title必须简短精炼，不超过10字
2. description需要具体可执行，不超过20字
3. impact必须包含具体数字
4. color只能是blue(研发)、green(生产)、purple(市场)`,
          userPrompt: `当前企业状况：

资金状况：
- 可用资金：${(money / 100_000_000).toFixed(1)}亿元

研发情况：
- 当前项目：${research.activeProject ? research.projects.find(p => p.id === research.activeProject)?.name : '无'}
- 研发进度：${research.activeProject ? research.projects.find(p => p.id === research.activeProject)?.progress : 0}%

生产状况：
- 产能利用率：${(production.facilities.efficiency * 100).toFixed(1)}%
- 自动化水平：${(production.facilities.automation * 100).toFixed(1)}%
- 原材料库存：电池(${production.materials.battery})、芯片(${production.materials.chips})

市场表现：
- 市场份额：${market.share}%
- 品牌影响力：${market.brandPower}
- 客户满意度：${market.satisfaction}
- 主要竞争对手：${market.competitors.length}家

人力资源：
- 研发人员：${hr.departments.research.junior + hr.departments.research.senior + hr.departments.research.expert}人
- 生产人员：${hr.departments.production.workers + hr.departments.production.engineers}人
- 员工满意度：${(hr.satisfaction * 100).toFixed(1)}%

请基于以上数据，生成3个最具战略价值的决策选项。每个决策都应该能显著改善企业的某个关键指标。`
        })
      })
      
      const data = await response.json()
      const decisions = JSON.parse(data)
      setDecisions(decisions)
    } catch (error) {
      console.error('生成决策选项失败:', error)
      // 使用默认选项
      setDecisions([
        {
          title: "加大研发投入",
          description: "增加研发预算，加快技术创新",
          impact: "研发进度 +20%，资金 -1亿",
          color: "blue"
        },
        {
          title: "扩大生产规模",
          description: "扩建生产线，提高产能",
          impact: "产能 +30%，资金 -2亿",
          color: "green"
        },
        {
          title: "市场营销",
          description: "加大广告投入，提升品牌形象",
          impact: "品牌影响力 +15%，资金 -5000万",
          color: "purple"
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  if (!isChoosing) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-gray-900 p-6 rounded-xl max-w-2xl w-full mx-4 border border-white/10"
        >
          {isProcessingChoice ? (
            <div className="text-center py-12">
              <motion.div 
                className="inline-block w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="mt-4 text-lg font-bold">正在执行决策...</p>
              <p className="mt-2 text-sm text-gray-400">AI 正在计算决策带来的影响</p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4">战略决策</h2>
              <p className="text-gray-400 mb-6">
                请选择本回合的战略重点，每个选择都会对公司产生不同影响
              </p>
              
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    <p className="mt-2 text-gray-400">AI正在分析局势...</p>
                  </div>
                ) : (
                  decisions.map((decision, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => makeChoice(decision)}
                      className={`w-full p-4 rounded-lg bg-${decision.color}-500/10 border border-${decision.color}-500/20 text-left hover:bg-${decision.color}-500/20`}
                    >
                      <h3 className={`text-lg font-bold text-${decision.color}-400 mb-2`}>
                        {decision.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-2">{decision.description}</p>
                      <p className={`text-${decision.color}-400 text-sm`}>{decision.impact}</p>
                    </motion.button>
                  ))
                )}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
} 