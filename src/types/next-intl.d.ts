import englishMessages from '../messages/en/messages.json';

type Messages = typeof englishMessages;

declare module 'next-intl' {
  interface AppConfig {
    Messages: Messages;
  }
}

export {};