import { auth } from '@/auth'
import { ISession, IUser } from '@/types/backend'
import { ComponentType } from 'react'

interface WithUserProps {
  userInfo: IUser
}

async function withUserInfo<P extends WithUserProps>(
  WrappedComponent: ComponentType<P>
) {
  const session = await auth()
  if (!session) {
    return null
  }
  const { user } = session as ISession

  if (!user) {
    return null
  }
  return function WithUserInfoWrapper(props: Omit<P, 'userInfo'>) {
    return <WrappedComponent {...(props as P)} userInfo={user} />
  }
}

export default withUserInfo
