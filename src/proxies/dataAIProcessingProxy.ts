import axios from 'axios'
const AI_DATA_PROCESSOR_SERVER_URL = process.env.AI_DATA_PROCESSOR_SERVER_URL ?? 'http://127.0.0.1:8000'
let dataAIProcessingProxy: any

const summarizeText = async (text: string): Promise<{ summarized_text: string }> => {
  const response = await axios.post(`${AI_DATA_PROCESSOR_SERVER_URL}/summarize-text`, { text })
  return response.data
}

type DataAIProcessingProxy = {
  summarizeText: (text: string) => Promise<{ summarized_text: string }>
}

const createDataAIProcessingProxy = async (): Promise<DataAIProcessingProxy> => {
  try {
    return { summarizeText }
  } catch (error) {
    throw new Error(`DataAIProcessingProxy connection error: ${JSON.stringify(error)}`)
  }
}

const getDataAIProcessingProxy = async (): Promise<DataAIProcessingProxy> => {
  if (dataAIProcessingProxy) {
    return dataAIProcessingProxy
  }

  dataAIProcessingProxy = await createDataAIProcessingProxy()
  return dataAIProcessingProxy
}

export default getDataAIProcessingProxy
