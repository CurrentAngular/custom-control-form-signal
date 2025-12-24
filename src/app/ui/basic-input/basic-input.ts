import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

@Component({
  selector: 'cfc-basic-input',
  templateUrl: './basic-input.html',
  styleUrl: './basic-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicInput implements FormValueControl<string> {
  readonly value = model('');

  updateValue(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value.set(target.value);
  }
}
