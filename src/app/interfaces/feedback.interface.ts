import { Emoji } from '../enums/emoji.enum';

export interface FeedbackInterface {
  readonly text: string;
  readonly reaction: Emoji | null;
  readonly message: string;
  readonly checked: boolean;
}
