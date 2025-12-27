import { z } from 'zod';

// Схема для DTO, который мы отправляем на сервер
export const customerRequestDtoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  hasBillingAddress: z.boolean(),
  billingAddress: z
    .object({
      city: z.string(),
      street: z.string(),
      zipCode: z.string(),
    })
    .nullable(), // адрес может быть null
  hasShippingAddress: z.boolean(),
  shippingAddress: z
    .object({
      city: z.string(),
      street: z.string(),
      zipCode: z.string(),
      note: z.string(),
    })
    .nullable(), // адрес может быть null
});

// Тип можно вывести из схемы, чтобы он точно соответствовал
export type CustomerDto = z.infer<typeof customerDtoSchema>;
