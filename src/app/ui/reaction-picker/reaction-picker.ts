import { Component, computed, input, model, signal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { Emoji } from '../../enums/emoji.enum';

@Component({
  selector: 'cfc-reaction-picker',
  templateUrl: './reaction-picker.html',
  styleUrl: './reaction-picker.scss',
  host: {
    '[class.disabled-state]': 'disabled()',
  },
})
// Интерфейс FormValueControl (extends FormUiControl) - контракт для полей - value, required или disabled
export class ReactionPicker implements FormValueControl<string | null> {
  readonly reactions = signal<Emoji[]>([
    Emoji.First,
    Emoji.Second,
    Emoji.Third,
    Emoji.Fourth,
    Emoji.Fifth,
  ]).asReadonly();

  // Необязательное поле для кастомного контрола (из FormUiControl)
  readonly required = input(false);

  // Необязательное поле для кастомного контрола (из FormUiControl)
  readonly disabled = input(false);

  // Обязательное поле для кастомного контрола (из FormValueControl)
  readonly value = model<string | null>(null);

  isSelected(reaction: string): boolean {
    return this.value() === reaction;
  }

  updateValue(value: string): void {
    if (this.disabled()) {
      return;
    }

    this.value.set(value);
  }
}
