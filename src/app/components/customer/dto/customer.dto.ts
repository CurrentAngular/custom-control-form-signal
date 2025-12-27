import { FormModel } from '../models';

export type CustomerDto = Omit<FormModel, 'billingAddress' | 'shippingAddress'> & {
  billingAddress: FormModel['billingAddress'] | null;
  shippingAddress: FormModel['shippingAddress'] | null;
};
