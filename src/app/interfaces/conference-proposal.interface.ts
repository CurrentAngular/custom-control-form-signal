import { SessionType } from '../types/session.type';

export interface TalkProposalInterface {
  readonly title: string;
  readonly speaker: string;
  readonly preferredDate: Date | null;
  readonly requestTravelSponsorship: boolean;
  readonly travelJustification: string;
  readonly sessionType: SessionType;
}
