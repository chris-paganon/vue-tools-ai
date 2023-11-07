import { H3Event } from 'h3';
import { useVerifyPb } from '@/server/utils/usePb';
import type { PbConversation } from '@/types/types';
import { fixTypesSerialization } from '@/server/utils/useServerUtils';

export function useCreateConversation(event: H3Event, message: string) {
  const pb = useVerifyPb(event);
  // TODO: Do not create new conversation if we can update existing one
  if ( pb.authStore.isValid && pb.authStore.model) {
    pb.collection('conversations').create({
      user: pb.authStore.model.id,
      name: message,
    });
  } else {
    // TODO: Probably need some sort of session to avoid creating new conversation every time
    pb.collection('conversations').create({
      name: message,
    });
  }
}

export async function useGetConversations(event: H3Event) {
  const pb = useVerifyPb(event);
  if ( pb.authStore.isValid && pb.authStore.model) {
    const conversations = await pb.collection('conversations').getFullList<PbConversation>({
      filter: `user="${pb.authStore.model.id}"`,
    });
    return fixTypesSerialization(conversations);
  }
}