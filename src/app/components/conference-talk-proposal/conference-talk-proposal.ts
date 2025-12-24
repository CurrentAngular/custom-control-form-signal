import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SessionPicker } from '../../ui/session-picker/session-picker';
import { TalkProposalInterface } from '../../interfaces/conference-proposal.interface';
import { form, Field, disabled, required } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'cfc-conference-talk-proposal',
  imports: [SessionPicker, Field, JsonPipe],
  templateUrl: './conference-talk-proposal.html',
  styleUrl: './conference-talk-proposal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConferenceTalkProposal {
  readonly #formModel = signal<TalkProposalInterface>({
    title: '',
    speaker: '',
    preferredDate: null,
    requestTravelSponsorship: false,
    travelJustification: '',
    sessionType: null,
  });

  readonly form = form(this.#formModel, (path) => {
    required(path.sessionType);
    disabled(path.sessionType, ({ valueOf }) => valueOf(path.preferredDate) === null);
  });

  onSubmit(event: Event): void {
    event.preventDefault();
  }
}
