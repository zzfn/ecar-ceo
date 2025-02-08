import * as motion from "motion/react-client"

const features = [
  {
    title: "AI 助手",
    description: "智能AI助手为你提供决策建议，分析市场趋势",
    icon: "🤖",
    color: "from-blue-500 to-blue-700"
  },
  {
    title: "研发创新",
    description: "投资研发新技术，打造领先产品",
    icon: "🔬",
    color: "from-green-500 to-green-700"
  },
  {
    title: "企业经营",
    description: "管理供应链、生产线和销售渠道",
    icon: "🏭",
    color: "from-purple-500 to-purple-700"
  },
  {
    title: "市场竞争",
    description: "应对市场变化，与对手展开竞争",
    icon: "📈",
    color: "from-red-500 to-red-700"
  }
]

export default function Features() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent"
        >
          游戏特色
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={`bg-gradient-to-br ${feature.color} p-6 rounded-lg shadow-lg backdrop-blur-sm bg-opacity-10 hover:shadow-xl transition duration-300`}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-200">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 