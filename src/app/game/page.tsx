import { Metadata } from 'next'
import Dashboard from '@/components/game/Dashboard'
import GameMain from '@/components/game/GameMain'
import GameHeader from '@/components/game/GameHeader'
import DecisionModal from '@/components/game/DecisionModal'

export const metadata: Metadata = {
  title: 'NIO CEO - 游戏控制台',
  description: '新能源汽车企业经营模拟游戏',
}

export default function GamePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <GameHeader />
      <div className="flex h-[calc(100vh-4rem)] pt-16">
        <Dashboard />
        <GameMain />
      </div>
      <DecisionModal />
    </main>
  )
} 