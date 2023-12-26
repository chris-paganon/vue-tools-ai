import { RecordModel } from 'pocketbase';
import OpenAI from 'openai';
import Stripe from 'stripe';

export interface PocketbaseSignupErrors {
  email?: PocketbaseErrorItem;
  password?: PocketbaseErrorItem;
  passwordConfirm?: PocketbaseErrorItem;
  unknownError?: string;
}
export interface PocketbaseErrorItem {
  code: string;
  message: string;
}
export interface localSignupErrors {
  email?: string;
  password?: string;
  passwordConfirm?: string;
  privacyConsent?: string;
}

// TODO: Verify these types or get them directly from JS migrations
export interface Chat {
  id: string;
  name: string;
  messages: OpenAI.Chat.ChatCompletionMessage[];
}
export interface PbConversation extends RecordModel {
  name: string;
};
export interface PbChatMessage extends RecordModel {
  chat?: string;
  role: 'system' | 'user' | 'assistant' | 'function';
  content: string;
};
export interface PbTransaction extends RecordModel {
  user: string;
  session_id: string;
  status: 'open' | 'complete' | 'expired';
};

/**
 * Stripe
 */
export type EnabledStripeWebhookEvents = Stripe.CheckoutSessionCompletedEvent | Stripe.CheckoutSessionExpiredEvent;

export function isEnabledStripeWebhookEvents(event: Stripe.Event): event is EnabledStripeWebhookEvents {
  return event.type === 'checkout.session.completed' || event.type === 'checkout.session.expired';
}