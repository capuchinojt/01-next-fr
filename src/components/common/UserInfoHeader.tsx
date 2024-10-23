import { UserInfoComponent } from '@/components/common/UserInfoComponent'
import withUserInfo from '@/components/common/UserInfoWrapper'

const UserInfoHeader = async () => {
  const WrappedUserInfoComponent = await withUserInfo(UserInfoComponent)
  return WrappedUserInfoComponent ? <WrappedUserInfoComponent /> : null
}

export default UserInfoHeader
