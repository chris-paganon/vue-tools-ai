import OpenAI from 'openai';
import compositionIndex from '../../assets/vue-docs/composition-index.json';
import optionsIndex from '../../assets/vue-docs/options-index.json';

export const useChatStore = defineStore('chat', () => {

  const compositionIndexString = JSON.stringify(compositionIndex);
  const optionsIndexString = JSON.stringify(optionsIndex);

  const currentChatId = ref('');
  const baseSystemMessage = 'You are an AI assistant on vuetools.ai, a website that provides AI-Powered tools Fine-tuned for VueJS Documentation. You are a specialized AI assistant, expert in HTML, CSS, Jasvascript and the VueJS framework.'
  const messages = ref<OpenAI.Chat.ChatCompletionMessage[]>([{
    role: 'system',
    content: `${baseSystemMessage} Here is an index of all the pages in the Vue documentation: VUE_DOCUMENTATION_INDEX: ${compositionIndexString}.`,
  }]);

  function addMessage(message: OpenAI.Chat.ChatCompletionMessage) {
    messages.value.push(message);
    console.log('message added to the list:', messages.value);
  }
  function setMessages(value: OpenAI.Chat.ChatCompletionMessage[]) {
    messages.value = value;
  }
  function replaceSystemMessage(message: string) {
    messages.value[0] = {
      role: 'system',
      content: `${baseSystemMessage} ${message}`,
    };
  }
  function setPlainGptSystemMessage() {
    replaceSystemMessage('');
  }
  function setCompositionIndexSystemMessage() {
    replaceSystemMessage(`Here is an index of all the pages in the Vue documentation (using the Composition API): VUE_DOCUMENTATION_INDEX: ${compositionIndexString}.`);
  }
  function setOptionsIndexSystemMessage() {
    replaceSystemMessage(`Here is an index of all the pages in the Vue documentation (using the Options API): VUE_DOCUMENTATION_INDEX: ${optionsIndexString}.`);
  }
  function setCurrentChatId(value: string) {
    currentChatId.value = value;
  }
  function addUserMessage(message: string) {
    addMessage({
      role: 'user',
      content: message,
    });
  }
  function addAssistantMessage(message: string) {
    addMessage({
      role: 'assistant',
      content: message,
    });
  }

  return {
    currentChatId,
    messages,
    replaceSystemMessage,
    setPlainGptSystemMessage,
    setCompositionIndexSystemMessage,
    setOptionsIndexSystemMessage,
    setCurrentChatId,
    addUserMessage,
    setMessages,
    addAssistantMessage,
  };
});