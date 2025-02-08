import { Metadata } from 'next'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import GameStart from '../components/home/GameStart'
import Navbar from '../components/common/Navbar'

export const metadata: Metadata = {
  title: 'NIO CEO - 新能源汽车企业经营模拟游戏',
  description: '成为新能源汽车企业CEO，与AI一起打造未来出行方式',
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Navbar />
      <Hero />
      <Features />
      <GameStart />
    </main>
  )
} 