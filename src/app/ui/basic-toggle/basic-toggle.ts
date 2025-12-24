import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { FormCheckboxControl } from '@angular/forms/signals';

@Component({
  selector: 'cfc-basic-toggle',
  templateUrl: './basic-toggle.html',
  styleUrl: './basic-toggle.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicToggle implements FormCheckboxControl {
  checked = model(false);

  toggle(): void {
    this.checked.update((value: boolean) => !value);
  }
}
