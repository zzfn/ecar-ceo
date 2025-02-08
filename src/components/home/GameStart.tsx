import * as motion from "motion/react-client"

export default function GameStart() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="absolute inset-0 bg-gradient-to-t from-blue-900/50 via-transparent to-transparent"
      />
      
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent"
        >
          准备好开始你的企业家之旅了吗？
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-300 mb-8"
        >
          加入我们，与AI一起探索新能源汽车产业的无限可能
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-lg text-xl hover:from-blue-700 hover:to-green-700 transition shadow-lg hover:shadow-blue-500/25"
        >
          立即开始
        </motion.button>
      </div>
    </section>
  )
} 