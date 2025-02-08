import Link from 'next/link'
import * as motion from "motion/react-client"

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-black/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent"
            >
              NIO CEO
            </motion.span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/about" className="hover:text-blue-400 transition">关于游戏</Link>
            <Link href="/leaderboard" className="hover:text-blue-400 transition">排行榜</Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-green-600 px-4 py-2 rounded-lg hover:from-blue-700 hover:to-green-700"
            >
              登录/注册
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  )
} 