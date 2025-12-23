import { Component, signal } from '@angular/core';
import { FeedbackInterface } from '../../interfaces/feedback.interface';
import { disabled, Field, form, required } from '@angular/forms/signals';

@Component({
  selector: 'cfc-feedback',
  imports: [Field],
  templateUrl: './feedback.html',
  styleUrl: './feedback.scss',
})
export class Feedback {
  readonly #formModel = signal<FeedbackInterface>({
    text: '',
    reaction: '😊',
  });

  readonly form = form(this.#formModel, (schemaPath) => {
    required(schemaPath.reaction);
    disabled(schemaPath.reaction, ({ valueOf }) => valueOf(schemaPath.text).length === 0);
  });

  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.form().valid()) {
      console.log(this.form().value());
    }
  }
}
