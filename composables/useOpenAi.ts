import type OpenAI from 'openai';
import type { LegacyChatCompletionMessage } from '@/types/types';

interface ChatCompletionRequest {
  messages: LegacyChatCompletionMessage[];
  functions?: OpenAI.Chat.ChatCompletionCreateParams.Function[];
  function_call?: OpenAI.Chat.ChatCompletionFunctionCallOption;
}

export async function useCompletion(payload: ChatCompletionRequest) {
  // TODO: Add error handling. $fetch needs to be wrapped in a try/catch block. throw createError needs to be added in API. Do the same for all other API endpoints.
  const response = await $fetch('/api/completion', {
    method: 'POST',
    body: payload,
  });

  // TODO: handle errors

  if (!response) return;
  return response;
}

export async function useAskQuestion() {
  const { messages } = storeToRefs(useChatStore());

  const response = await useCompletion({
    messages: messages.value,
  });

  if (!response?.[0].message?.content) {
    console.log('No response from useAskQuestion');
    return;
  }
  return response[0].message.content;
}

export async function useAskAssistant() {
  const { messages } = storeToRefs(useChatStore());
  // TODO: Add error handling. $fetch needs to be wrapped in a try/catch block. throw createError needs to be added in API. Do the same for all other API endpoints.
  const response = await $fetch('/api/docCompletion', {
    method: 'POST',
    body: { messages: messages.value },
  });

  // TODO: handle errors

  if (!response) return;
  return response;
}
