// 随机数生成方法
const createRandom = (minNum: number, maxNum: number) => {
  return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum
}

export default createRandom