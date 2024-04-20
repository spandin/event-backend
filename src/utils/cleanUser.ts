import { user as IUser } from '@prisma/client'

export default (user: IUser) => {
  const { id, email, avatar_url } = user

  return {
    id,
    email,
    avatar_url
  }
}
