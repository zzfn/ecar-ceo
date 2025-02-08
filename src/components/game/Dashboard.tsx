import * as motion from "motion/react-client"

export default function Dashboard() {
  return (
    <div className="w-80 bg-black/30 border-r border-white/10 p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6"
      >
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-300">企业概况</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-3 rounded-lg">
              <div className="text-sm text-gray-400">总资产</div>
              <div className="text-lg font-bold">¥10.5B</div>
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
              <div className="text-sm text-gray-400">月收入</div>
              <div className="text-lg font-bold">¥1.2B</div>
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
              <div className="text-sm text-gray-400">员工数</div>
              <div className="text-lg font-bold">5,000</div>
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
              <div className="text-sm text-gray-400">研发进度</div>
              <div className="text-lg font-bold">75%</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-300">生产线状态</h2>
          <div className="space-y-3">
            <div className="bg-white/5 p-3 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">SUV生产线</span>
                <span className="text-sm text-green-400">运行中</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{width: '80%'}}></div>
              </div>
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">轿车生产线</span>
                <span className="text-sm text-yellow-400">维护中</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{width: '30%'}}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-300">市场数据</h2>
          <div className="bg-white/5 p-3 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">市场份额</span>
              <span className="text-sm text-blue-400">15%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">用户满意度</span>
              <span className="text-sm text-green-400">4.8/5.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">品牌影响力</span>
              <span className="text-sm text-purple-400">A+</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 