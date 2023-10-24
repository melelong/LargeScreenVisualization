// import request from '@/utils/request'
import { mockData, Sleep } from '../utils/index'
const getVisualization = async () => {
  await Sleep(500)
  return {
    code: 200,
    msg: '',
    data: mockData()
  }
  // return request({
  //   url: '/visualization'
  // })
}
export default getVisualization