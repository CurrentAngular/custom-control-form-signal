import { ChangeDetectionStrategy, Component, computed, input, model, signal } from '@angular/core';
import { SessionTypeInfo } from '../../types/session-info.type';
import { NgOptimizedImage } from '@angular/common';
import { FormValueControl } from '@angular/forms/signals';
import { SessionType } from '../../types/session.type';
import { sessionsMock } from './session-picker.mock';

@Component({
  selector: 'cfc-session-picker',
  imports: [NgOptimizedImage],
  templateUrl: './session-picker.html',
  styleUrl: './session-picker.scss',
  host: {
    '[class.disabled]': 'disabled()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionPicker implements FormValueControl<SessionType> {
  readonly value = model<SessionType>('backpack');

  readonly required = input(false);
  readonly disabled = input(false);

  readonly show = computed(() => !this.disabled() && this.required());

  readonly sessions = sessionsMock;
}
