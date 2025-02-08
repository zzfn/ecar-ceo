"use client";
import { motion } from "framer-motion"
import Link from "next/link"
import { useGameStore } from "@/store/gameStore"

export default function GameHeader() {
  const { 
    money, 
    reputation,
    round,
    nextRound,
    isChoosing
  } = useGameStore()

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-black/50 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent"
            >
              NIO CEO
            </motion.span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <motion.div className="px-4 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
              <span className="text-sm text-purple-400">
                第 {round} 回合
              </span>
            </motion.div>
            <motion.div className="px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
              <span className="text-sm text-blue-400">
                资金: ¥{(money / 100_000_000).toFixed(1)}亿
              </span>
            </motion.div>
            <motion.div className="px-4 py-1 rounded-full bg-green-500/10 border border-green-500/20">
              <span className="text-sm text-green-400">声誉: {reputation}</span>
            </motion.div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextRound}
            disabled={isChoosing}
            className={`px-6 py-2 rounded-lg ${
              isChoosing 
                ? 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            下一回合
          </motion.button>
          
          <Link href="/" className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20"
            >
              退出游戏
            </motion.button>
          </Link>
        </div>
      </div>
    </header>
  )
}
