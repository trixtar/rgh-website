import en from '../../messages/en/messages.json';

type Messages = typeof en;

declare module 'next-intl' {
  interface AppConfig {
    Messages: Messages;
  }
}

export {};