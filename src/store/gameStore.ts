import { create } from 'zustand'

interface GameState {
  // 基础资源
  money: number                // 资金
  reputation: number           // 声誉
  round: number               // 当前回合
  isChoosing: boolean         // 是否在选择决策
  isProcessingChoice: boolean  // 添加处理决策的状态
  
  // 研发数据
  research: {
    projects: {
      id: string
      name: string
      type: 'battery' | 'charging' | 'safety' | 'autonomous' | 'manufacturing'
      progress: number
      cost: number
      effect: {
        range?: number      // 续航里程提升
        charging?: number   // 充电速度提升
        safety?: number     // 安全性提升
        ai?: number         // 智能化水平提升
        efficiency?: number // 生产效率提升
      }
    }[]
    activeProject: string | null
  }
  
  // 车型数据
  vehicles: {
    models: {
      id: string
      name: string
      specs: {
        range: number      // 续航里程
        charging: number   // 充电速度(分钟/次)
        safety: number     // 安全性评分
        ai: number         // 智能化水平
      }
      cost: number        // 生产成本
      price: number       // 售价
      inventory: number   // 库存
      monthlyProduction: number // 月产量
      monthlySales: number     // 月销量
    }[]
  }
  
  // 生产数据
  production: {
    facilities: {
      capacity: number     // 总产能
      efficiency: number   // 生产效率(0-1)
      maintenance: number  // 维护成本
      automation: number   // 自动化水平(0-1)
    }
    materials: {
      battery: number      // 电池库存
      chips: number        // 芯片库存
      steel: number        // 钢材库存
    }
    costs: {
      battery: number      // 电池成本
      chips: number        // 芯片成本
      steel: number        // 钢材成本
      labor: number        // 人工成本
    }
  }
  
  // 市场数据
  market: {
    share: number         // 市场份额(%)
    satisfaction: number  // 客户满意度(0-100)
    brandPower: string    // 品牌影响力(D-S)
    segments: {          // 细分市场
      economy: number     // 经济型占比
      premium: number     // 高端型占比
      luxury: number      // 豪华型占比
    }
    competitors: {
      id: string
      name: string
      share: number
      models: {
        name: string
        specs: {
          range: number
          charging: number
          safety: number
          ai: number
        }
        price: number
        monthlySales: number
      }[]
    }[]
    events: {           // 市场事件
      id: string
      type: 'policy' | 'technology' | 'consumer' | 'competition'
      content: string
      impact: string
      duration: number  // 持续回合数
    }[]
  }
  
  // 人力资源
  hr: {
    departments: {
      research: {
        junior: number    // 初级研发人员
        senior: number    // 高级研发人员
        expert: number    // 专家
      }
      production: {
        workers: number   // 生产工人
        engineers: number // 工程师
        managers: number  // 管理人员
      }
      sales: {
        staff: number     // 销售人员
        managers: number  // 销售经理
      }
    }
    satisfaction: number  // 员工满意度(0-100)
    salary: {            // 月薪(元)
      research: {
        junior: number    // 15000
        senior: number    // 30000
        expert: number    // 50000
      }
      production: {
        workers: number   // 8000
        engineers: number // 20000
        managers: number  // 35000
      }
      sales: {
        staff: number     // 12000
        managers: number  // 25000
      }
    }
    training: {          // 培训项目
      id: string
      department: 'research' | 'production' | 'sales'
      level: 'basic' | 'advanced' | 'expert'
      participants: number
      progress: number   // 0-100
      cost: number
    }[]
  }
  
  // 游戏控制
  nextRound: () => void
  makeChoice: (decision: {
    title: string
    description: string
    impact: string
    color: "blue" | "green" | "purple"
  }) => Promise<void>
}

export const useGameStore = create<GameState>((set, get) => ({
  money: 1_000_000_000,
  reputation: 80,
  round: 1,
  isChoosing: false,
  isProcessingChoice: false,
  
  research: {
    projects: [],
    activeProject: null
  },
  
  vehicles: {
    models: []
  },
  
  production: {
    facilities: {
      capacity: 100,
      efficiency: 0.8,
      maintenance: 0.2,
      automation: 0.5
    },
    materials: {
      battery: 0,
      chips: 0,
      steel: 0
    },
    costs: {
      battery: 0,
      chips: 0,
      steel: 0,
      labor: 0
    }
  },
  
  market: {
    share: 15,
    satisfaction: 4.8,
    brandPower: 'A+',
    segments: {
      economy: 0.5,
      premium: 0.3,
      luxury: 0.2
    },
    competitors: [],
    events: []
  },
  
  hr: {
    departments: {
      research: {
        junior: 0,
        senior: 0,
        expert: 0
      },
      production: {
        workers: 0,
        engineers: 0,
        managers: 0
      },
      sales: {
        staff: 0,
        managers: 0
      }
    },
    satisfaction: 0.8,
    salary: {
      research: {
        junior: 0,
        senior: 0,
        expert: 0
      },
      production: {
        workers: 0,
        engineers: 0,
        managers: 0
      },
      sales: {
        staff: 0,
        managers: 0
      }
    },
    training: []
  },
  
  nextRound: () => set((state) => {
    // 设置选择状态
    return { isChoosing: true }
  }),
  
  makeChoice: async (decision) => {
    set({ isProcessingChoice: true })  // 开始处理
    try {
      const state = get()
      const response = await fetch('/api/ai', {
        method: 'POST',
        body: JSON.stringify({
          systemPrompt: `作为一位新能源汽车企业顾问，请基于玩家的决策和当前企业状况，计算并返回更新后的游戏数据。
返回格式必须严格按照以下示例：

{
  "money": 900000000,
  "reputation": 85,
  "round": 2,
  "isChoosing": false,
  
  "research": {
    "projects": [
      {
        "id": "battery-001",
        "name": "固态电池研发",
        "type": "battery",
        "progress": 35,
        "cost": 100000000,
        "effect": {
          "range": 100,
          "charging": 20
        }
      }
    ],
    "activeProject": "battery-001"
  },
  
  "vehicles": {
    "models": [
      {
        "id": "suv-001",
        "name": "ES6",
        "specs": {
          "range": 500,
          "charging": 30,
          "safety": 90,
          "ai": 85
        },
        "cost": 250000,
        "price": 350000,
        "inventory": 200,
        "monthlyProduction": 1000,
        "monthlySales": 800
      }
    ]
  },
  
  "production": {
    "facilities": {
      "capacity": 2000,
      "efficiency": 0.85,
      "maintenance": 0.15,
      "automation": 0.6
    },
    "materials": {
      "battery": 1000,
      "chips": 2000,
      "steel": 5000
    },
    "costs": {
      "battery": 50000,
      "chips": 10000,
      "steel": 5000,
      "labor": 20000
    }
  },
  
  "market": {
    "share": 18,
    "satisfaction": 4.9,
    "brandPower": "A+",
    "segments": {
      "economy": 0.5,
      "premium": 0.3,
      "luxury": 0.2
    },
    "competitors": [
      {
        "id": "comp-001",
        "name": "特斯拉",
        "share": 25,
        "models": [
          {
            "name": "Model Y",
            "specs": {
              "range": 550,
              "charging": 25,
              "safety": 95,
              "ai": 90
            },
            "price": 380000,
            "monthlySales": 2000
          }
        ]
      }
    ],
    "events": [
      {
        "id": "evt-001",
        "type": "policy",
        "content": "新能源补贴政策延期",
        "impact": "市场需求增加20%",
        "duration": 3
      }
    ]
  },
  
  "hr": {
    "departments": {
      "research": {
        "junior": 50,
        "senior": 30,
        "expert": 10
      },
      "production": {
        "workers": 500,
        "engineers": 100,
        "managers": 20
      },
      "sales": {
        "staff": 200,
        "managers": 30
      }
    },
    "satisfaction": 0.85,
    "salary": {
      "research": {
        "junior": 15000,
        "senior": 30000,
        "expert": 50000
      },
      "production": {
        "workers": 8000,
        "engineers": 20000,
        "managers": 35000
      },
      "sales": {
        "staff": 12000,
        "managers": 25000
      }
    },
    "training": [
      {
        "id": "tr-001",
        "department": "research",
        "level": "advanced",
        "participants": 20,
        "progress": 60,
        "cost": 500000
      }
    ]
  }
}`,
          userPrompt: `当前状况：
${JSON.stringify(state, null, 2)}

玩家选择的决策：
- 标题：${decision.title}
- 描述：${decision.description}
- 预期影响：${decision.impact}
- 类型：${decision.color === 'blue' ? '研发' : decision.color === 'green' ? '生产' : '市场营销'}

请基于当前状态和玩家决策，返回更新后的完整游戏数据。注意：
1. 保持数据结构完整性
2. 确保数值变化合理
3. 考虑决策带来的连锁反应
4. 可以添加相应的事件或项目
5. 请直接返回JSON数据，不要包含任何其他文本`
        })
      })
      
      const newState = await response.json()
      console.log(newState, JSON.parse(newState))
      
      // 更新游戏状态
      set({
        ...JSON.parse(newState),
        isChoosing: false,
        isProcessingChoice: false,  // 处理完成
        round: get().round + 1
      })
      
    } catch (error) {
      console.error('处理决策失败:', error)
      set((state) => ({
        isChoosing: false,
        isProcessingChoice: false,  // 处理完成
        round: state.round + 1
      }))
    }
  }
})) 