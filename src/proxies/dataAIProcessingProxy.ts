let dataAIProcessingProxy: any

type DataAIProcessingProxy = {
  client: {
    summarizeText: (text: string) => Promise<string>
  }
}

const createDataAIProcessingProxy = async (): Promise<DataAIProcessingProxy> => {
  try {
    const client = {
      summarizeText: async (text: string): Promise<string> => {
        // todo
        return ''
      }
    }

    return { client }
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
