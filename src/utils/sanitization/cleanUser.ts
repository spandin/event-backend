import { user as IUser } from '@prisma/client'

export const cleanUser = (user: IUser) => {
  const { id, email, avatar_url } = user

  return {
    id,
    email,
    avatar_url
  }
}
