import { ChangeDetectionStrategy, Component, model, signal } from '@angular/core';
import { SessionTypeInfo } from '../../types/session-info.type';
import { NgOptimizedImage } from '@angular/common';
import { FormValueControl } from '@angular/forms/signals';
import { SessionType } from '../../types/session.type';

@Component({
  selector: 'cfc-session-picker',
  imports: [NgOptimizedImage],
  templateUrl: './session-picker.html',
  styleUrl: './session-picker.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionPicker implements FormValueControl<SessionType> {
  readonly value = model<SessionType>('backpack');
  readonly sessions = signal<SessionTypeInfo[]>([
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
}
