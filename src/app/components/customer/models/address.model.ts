import { z } from 'zod';

// zod-схема модели формы Address
export const Address = z.strictObject({
  city: z.string(),
  street: z.string(),
  zipCode: z.string(),
});

// тип модели формы Address
export type Address = z.infer<typeof Address>;

// модель формы Address
export const initAddress = (): Address => {
  return {
    city: '',
    street: '',
    zipCode: '',
  };
};
