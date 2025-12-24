import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SessionPicker } from '../../ui/session-picker/session-picker';
import { TalkProposalInterface } from '../../interfaces/conference-proposal.interface';
import { form, Field } from '@angular/forms/signals';

@Component({
  selector: 'cfc-conference-talk-proposal',
  imports: [SessionPicker, Field],
  templateUrl: './conference-talk-proposal.html',
  styleUrl: './conference-talk-proposal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConferenceTalkProposal {
  readonly #formModel = signal<TalkProposalInterface>({
    title: '',
    speaker: '',
    preferredDate: new Date(),
    requestTravelSponsorship: false,
    travelJustification: '',
    sessionType: null,
  });

  readonly form = form(this.#formModel);

  onSubmit(event: Event): void {
    event.preventDefault();
  }
}
