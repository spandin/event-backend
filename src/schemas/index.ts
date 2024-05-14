import z from 'zod'

export const registrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

export const createEventSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  location: z.string().optional(),
  date: z.coerce.date()
})

export const updateEventSchema = z.object({
  event_id: z.string(),
  data: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    location: z.string().optional(),
    date: z.coerce.date().optional(),
    isArchived: z.boolean().optional()
  })
})

export const addMemberToEventSchema = z.object({
  event_id: z.string(),
  member_id: z.string()
})

export const containsEventIdSchema = z.object({
  event_id: z.string()
})

export const deleteMemberFromEventSchema = addMemberToEventSchema
