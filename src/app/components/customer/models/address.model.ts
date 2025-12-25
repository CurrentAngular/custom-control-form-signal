import { z } from 'zod';

export const Address = z.strictObject({
  city: z.string(),
  street: z.string(),
  zipCode: z.string(),
});

export type Address = z.infer<typeof Address>;
