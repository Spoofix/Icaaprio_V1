import OpenAI from 'openai';
import type { ChatCompletionMessageParam } from 'openai/resources/chat';

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

if (!API_KEY) {
  console.warn('OpenAI API key is not configured. IRIS will operate in offline mode.');
}

const openai = API_KEY ? new OpenAI({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true
}) : null;

const SYSTEM_PROMPT = `You are IRIS (Intelligent Regulatory ICAAP Support), an expert AI assistant specializing in ICAAP (Internal Capital Adequacy Assessment Process) and regulatory requirements. You have deep knowledge of:

1. Basel Framework (Basel II, III, IV)
2. Regulatory requirements:
   - OSFI (Office of the Superintendent of Financial Institutions)
   - BCFSA (BC Financial Services Authority)
   - FSRA (Financial Services Regulatory Authority of Ontario)
   - CUDGC (Credit Union Deposit Guarantee Corporation)

3. Risk Assessment:
   - Credit Risk (PD, LGD, EAD)
   - Market Risk (VaR, EaR)
   - Operational Risk
   - Liquidity Risk

4. Stress Testing:
   - Scenario design
   - Impact assessment
   - Capital planning

Your personality:
- Professional but friendly
- Patient and understanding
- Clear and concise in explanations
- Helpful in breaking down complex topics
- Always focused on ICAAP and regulatory matters

Important:
- Provide practical, actionable advice
- Use examples when helpful
- Break down complex concepts
- Stay focused on ICAAP-related topics
- Redirect non-ICAAP questions back to ICAAP context`;

const OFFLINE_RESPONSES = {
  default: `I apologize, but I'm currently operating in offline mode. Please ensure the OpenAI API key is configured to access my full capabilities. 

In the meantime, I can provide general guidance on:
1. ICAAP structure and requirements
2. Regulatory frameworks
3. Risk assessment approaches
4. Capital planning basics

Would you like to know more about any of these topics?`,

  greeting: `Hello! I'm IRIS (Intelligent Regulatory ICAAP Support), currently operating in offline mode. 

I can still provide general guidance on:
1. ICAAP fundamentals
2. Regulatory requirements
3. Risk assessment frameworks
4. Capital planning

What would you like to learn about?`
};

export async function generateICAAPResponse(
  messages: ChatCompletionMessageParam[],
  institutionType: string
): Promise<string> {
  if (!openai) {
    const lastMessage = messages[messages.length - 1].content as string;
    if (lastMessage.toLowerCase().includes('hello') || lastMessage.toLowerCase().includes('hi')) {
      return OFFLINE_RESPONSES.greeting;
    }
    return OFFLINE_RESPONSES.default;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { 
          role: 'system', 
          content: `The user is from a ${institutionType}. Tailor your responses accordingly while maintaining applicability to all institution types.`
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    });

    return completion.choices[0].message.content || 'I apologize, but I was unable to generate a response. Please try rephrasing your question.';
  } catch (error) {
    console.error('Error generating ICAAP response:', error);
    return `I apologize, but I encountered an error. ${
      error instanceof Error ? `Error details: ${error.message}` : 'Please try again or rephrase your question.'
    }`;
  }
}