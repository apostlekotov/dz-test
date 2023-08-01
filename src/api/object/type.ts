import z from 'zod';

export const objectSchema = z.object({
  objectID: z.number(),
  objectURL: z.string().url(),
  title: z.string(),
  name: z.string(),
  primaryImage: z.string().url(),
  primaryImageSmall: z.string().url(),
  medium: z.string(),
  dimensions: z.string(),
  elementName: z.string(),
  accessionYear: z.string()
});

export type ArtObject = z.infer<typeof objectSchema>;
