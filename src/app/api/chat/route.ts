import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
 
// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
 
// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';
 
export async function POST(req: Request) {
    const body = await req.json();
    const messages = body.messages;

    // console.log(body)
    // Log the entire body part
    // console.log('Body:', body);

    // If you want to log a specific part of the body, for example, the model:
    const model = body?.model; // Use optional chaining in case body is undefined
    console.log(`Current model: ${model}`);
    // const modelName = model === 'gpt-4-turbo' ? 'gpt-4-turbo' : 'gpt-3.5-turbo';
  
    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.chat.completions.create({
      model: model,
      stream: true,
      messages,
    });
  
    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);
    // Respond with the stream
    return new StreamingTextResponse(stream);
  }