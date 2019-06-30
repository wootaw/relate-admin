import axios from 'axios'

export const LeadSources = [
  { value: 1, label: '商务' },
  { value: 2, label: '公司' },
  { value: 3, label: '渠道' }
]

export const LeadLevels = [
  { value: 'A+', label: 'A+', desc: '已合作下单' },
  { value: 'A', label: 'A', desc: '确定合作待追款' },
  { value: 'B', label: 'B', desc: '需求待解决' },
  { value: 'C', label: 'C', desc: '没有明确拒绝' },
  { value: 'D', label: 'D', desc: '直接拒绝' }
]

export const getIndustriesTree = async () => {
  const res = await axios.get(`api/industries_tree`)
  return res.data
}