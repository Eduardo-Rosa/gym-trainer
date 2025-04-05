import OpenAI from 'openai';

class OpenAIService {
  private static instance: OpenAI;
  private constructor() {}

  static getInstance(): OpenAI {
    if (!OpenAIService.instance) {
      if (!process.env.OPENAI_KEY) throw new Error('OPENAI_KEY missing');
      OpenAIService.instance = new OpenAI({ apiKey: process.env.OPENAI_KEY });
    }
    return OpenAIService.instance;
  }
}

export default OpenAIService.getInstance();