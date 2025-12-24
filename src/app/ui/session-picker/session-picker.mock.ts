import { signal } from '@angular/core';
import { SessionTypeInfo } from '../../types/session-info.type';

export const sessionsMock = signal<SessionTypeInfo[]>([
  {
    type: 'backpack',
    title: 'Backpack',
    icon: '/assets/icons/backpack.svg',
  },
  {
    type: 'bank',
    title: 'Bank',
    icon: '/assets/icons/bank.svg',
  },
  {
    type: 'box',
    title: 'Box',
    icon: '/assets/icons/box-fill.svg',
  },
]).asReadonly();
