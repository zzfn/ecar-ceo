"use client";
import { motion } from "framer-motion"
import { useGameStore } from "@/store/gameStore"

export default function Dashboard() {
  const { 
    money, 
    reputation,
    research,
    production,
    market,
    hr,
    vehicles
  } = useGameStore()

  return (
    <div className="w-80 bg-black/30 border-r border-white/10 p-4 overflow-y-auto">
      <div className="space-y-6">
        {/* 基础指标 */}
        <div>
          <h2 className="text-lg font-bold mb-3">基础指标</h2>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/5 p-3 rounded-lg">
              <div className="text-sm text-gray-400">资金</div>
              <div className="text-lg font-bold">
                ¥{(money / 100_000_000).toFixed(1)}亿
              </div>
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
              <div className="text-sm text-gray-400">声誉</div>
              <div className="text-lg font-bold">{reputation}</div>
            </div>
          </div>
        </div>

        {/* 研发状态 */}
        <div>
          <h2 className="text-lg font-bold mb-3">研发状态</h2>
          <div className="space-y-2">
            <div className="bg-white/5 p-3 rounded-lg">
              <div className="text-sm text-gray-400">当前项目</div>
              <div className="text-lg font-bold">
                {research.activeProject ? 
                  research.projects.find(p => p.id === research.activeProject)?.name : 
                  '无进行中项目'
                }
              </div>
              {research.activeProject && (
                <div className="mt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>进度</span>
                    <span>{research.projects.find(p => p.id === research.activeProject)?.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{
                        width: `${research.projects.find(p => p.id === research.activeProject)?.progress}%`
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 生产状态 */}
        <div>
          <h2 className="text-lg font-bold mb-3">生产状态</h2>
          <div className="space-y-2">
            <div className="bg-white/5 p-3 rounded-lg">
              <div className="text-sm text-gray-400">产能利用率</div>
              <div className="text-lg font-bold">
                {(production.facilities.efficiency * 100).toFixed(1)}%
              </div>
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
              <div className="text-sm text-gray-400">自动化水平</div>
              <div className="text-lg font-bold">
                {(production.facilities.automation * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>

        {/* 市场表现 */}
        <div>
          <h2 className="text-lg font-bold mb-3">市场表现</h2>
          <div className="space-y-2">
            <div className="bg-white/5 p-3 rounded-lg">
              <div className="text-sm text-gray-400">市场份额</div>
              <div className="text-lg font-bold">{market.share}%</div>
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
              <div className="text-sm text-gray-400">品牌影响力</div>
              <div className="text-lg font-bold">{market.brandPower}</div>
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
              <div className="text-sm text-gray-400">客户满意度</div>
              <div className="text-lg font-bold">{market.satisfaction}</div>
            </div>
          </div>
        </div>

        {/* 人力资源 */}
        <div>
          <h2 className="text-lg font-bold mb-3">人力资源</h2>
          <div className="space-y-2">
            <div className="bg-white/5 p-3 rounded-lg">
              <div className="text-sm text-gray-400">研发团队</div>
              <div className="text-lg font-bold">
                {hr.departments.research.junior + 
                 hr.departments.research.senior + 
                 hr.departments.research.expert}人
              </div>
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
              <div className="text-sm text-gray-400">生产团队</div>
              <div className="text-lg font-bold">
                {hr.departments.production.workers + 
                 hr.departments.production.engineers + 
                 hr.departments.production.managers}人
              </div>
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
              <div className="text-sm text-gray-400">员工满意度</div>
              <div className="text-lg font-bold">
                {(hr.satisfaction * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>

        {/* 车型数据 */}
        {vehicles.models.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-3">车型数据</h2>
            <div className="space-y-2">
              {vehicles.models.map(model => (
                <div key={model.id} className="bg-white/5 p-3 rounded-lg">
                  <div className="text-sm font-bold mb-2">{model.name}</div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-400">续航：</span>
                      <span>{model.specs.range}km</span>
                    </div>
                    <div>
                      <span className="text-gray-400">月销量：</span>
                      <span>{model.monthlySales}台</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}