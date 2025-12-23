import { Emoji } from '../enums/emoji.enum';

export interface FeedbackInterface {
  readonly text: string;
  readonly reaction: Emoji | null;
}
