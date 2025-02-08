import { NextRequest } from 'next/server';
import OpenAI from 'openai';

export const POST = async (req: NextRequest) => {
  const json = await req.json();
  const openai = new OpenAI({
    baseURL: 'https://api.siliconflow.cn',
    apiKey: process.env.AI_API_KEY,
  });
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: json.systemPrompt
      },
      {
        role: 'user',
        content: json.userPrompt
      },
    ],
    model: 'deepseek-ai/DeepSeek-V2.5',
  });
  const content = completion.choices[0].message.content;
  return Response.json(content);
};
