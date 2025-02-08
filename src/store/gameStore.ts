import { create } from 'zustand'

interface GameState {
  // 基础资源
  money: number
  reputation: number
  time: {
    year: number
    month: number
    day: number
  }
  gameSpeed: number // 0: 暂停, 1: 正常, 2: 快速, 3: 超快
  
  // 研发数据
  research: {
    currentProject: string
    progress: number
    cost: number
  }
  
  // 生产数据
  production: {
    suvLine: {
      efficiency: number
      maintenance: boolean
      dailyOutput: number
    }
    sedanLine: {
      efficiency: number
      maintenance: boolean
      dailyOutput: number
    }
  }
  
  // 市场数据
  market: {
    share: number
    satisfaction: number
    brandPower: string
  }
  
  // 游戏控制
  setGameSpeed: (speed: number) => void
  updateTime: () => void
  updateResources: () => void
  startResearch: (project: string, cost: number) => void
  updateProduction: (line: 'suvLine' | 'sedanLine', data: any) => void
}

export const useGameStore = create<GameState>((set) => ({
  money: 1_000_000_000,
  reputation: 80,
  time: {
    year: 2024,
    month: 1,
    day: 1
  },
  gameSpeed: 1,
  
  research: {
    currentProject: '新一代电池技术',
    progress: 0,
    cost: 100_000_000
  },
  
  production: {
    suvLine: {
      efficiency: 0.8,
      maintenance: false,
      dailyOutput: 100
    },
    sedanLine: {
      efficiency: 0.3,
      maintenance: true,
      dailyOutput: 0
    }
  },
  
  market: {
    share: 15,
    satisfaction: 4.8,
    brandPower: 'A+'
  },
  
  setGameSpeed: (speed) => set({ gameSpeed: speed }),
  
  updateTime: () => set((state) => {
    const { day, month, year } = state.time
    let newDay = day + 1
    let newMonth = month
    let newYear = year
    
    if (newDay > 30) {
      newDay = 1
      newMonth++
      if (newMonth > 12) {
        newMonth = 1
        newYear++
      }
    }
    
    return { time: { day: newDay, month: newMonth, year: newYear } }
  }),
  
  updateResources: () => set((state) => {
    // 每日收入计算
    const dailyIncome = state.production.suvLine.dailyOutput * 300_000 +
                       state.production.sedanLine.dailyOutput * 250_000
    
    // 每日支出
    const dailyCost = state.research.cost / 30 +  // 研发成本
                     1_000_000 // 基础运营成本
    
    return {
      money: state.money + dailyIncome - dailyCost,
      research: {
        ...state.research,
        progress: Math.min(100, state.research.progress + 0.5)
      }
    }
  }),
  
  startResearch: (project, cost) => set({
    research: {
      currentProject: project,
      progress: 0,
      cost: cost
    }
  }),
  
  updateProduction: (line, data) => set((state) => ({
    production: {
      ...state.production,
      [line]: {
        ...state.production[line],
        ...data
      }
    }
  }))
})) 