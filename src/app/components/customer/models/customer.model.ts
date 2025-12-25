import { z } from 'zod';

export const formModel = z.strictObject({
  firstName: z.string(),
  lastName: z.string(),
  hasBillingAddress: z.boolean().default(false), // Zod подставит false - если это поле не будет передано, потому что есть .default(false)
  billingAddress: z.strictObject({
    city: z.string(),
    street: z.string(),
    zipCode: z.string(),
  }),
  hasShippingAddress: z.boolean().default(false), // Zod подставит false - если это поле не будет передано, потому что есть .default(false)
  shippingAddress: z.strictObject({
    city: z.string(),
    street: z.string(),
    zipCode: z.string(),
    note: z.string(),
  }),
});

export type FormModel = z.infer<typeof formModel>;
