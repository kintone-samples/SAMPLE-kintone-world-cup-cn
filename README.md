# kintone-world-cup

## Project setup
- 竞猜首页
- 个人中心

# 展示
- 首页：
  - 获取3条最近未开始的比赛 进行投票
  - 比赛倒计时
  - 世界杯日历
- 个人中心
  - 用户名
  - 头像
  - 积分
  - 竞猜记录
  - 兑换（准备）
  
# 规则
- 设计原则（下注系统）
  - 用户在开奖前只能登记竞猜信息
  - 无服务端的情况下如何防止给别人下注？（使用创建者作为条件）
  - 如何计算剩余积分？将总积分减去未开奖的投注（因为可以设置积分为只有管理员可写，这样积分结果有值的为已经开奖的记录）
- 设计原则（开奖系统）
  - 通过管理员输入结果，然后计算并更新用户的积分。
  - 开奖后，由管理员更新比赛结果的同时，更新用户竞猜信息，及积分履历，用户积分。这样可防止用户开奖后自行修改自己的竞猜信息及积分等。
  - 如何防止用户模拟提交超过积分数的下注？（每日开奖时会计算积分是否超过实际积分）
  - 通过用户判断+更新时间（或创建时间）的组合判断来防止超时下注

# 用户操作权限
- 比赛及赔率信息(matchInfo)
  - 普通用户只读
  - 管理员读写
- 比赛队伍表（teams）
  - 普通用户只读
  - 管理员读写
- 用户积分（users）
  - 普通用户只读
  - 管理员读写
- 用户竞猜信息（user chip in info）
  - 普通用户读写
  - 管理员读写
- 积分变更履历（score）
  - 普通用户只读
  - 管理员读写