import { maxLength, minLength, required, schema } from '@angular/forms/signals';
import { Address } from './models';

const MIN_LENGTH = 3;
const MAX_LENGTH = 3;

export const addressSchema = schema<Address>((path) => {
  required(path.city);
  minLength(path.city, MIN_LENGTH);

  required(path.street);
  minLength(path.street, MIN_LENGTH);

  required(path.zipCode);
  minLength(path.zipCode, MIN_LENGTH, {
    message: `Zip code must be between ${MIN_LENGTH} and ${MAX_LENGTH} characters long.`,
  });
  maxLength(path.zipCode, MIN_LENGTH, {
    message: `Zip code must be between ${MIN_LENGTH} and ${MAX_LENGTH} characters long.`,
  });
});
