import { ZodSchema } from 'zod';

export default (schema: ZodSchema, data: unknown) => {
  try {
    schema.parse(data);
    return true;
  } catch (error) {
    return false;
  }
};
