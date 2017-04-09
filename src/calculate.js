import R from 'ramda'
import userForHandle from './user'
import imagesForUser from './images'
import calculateEngagement from './engagement'


export default async handle => {
  const user = await userForHandle(handle)
  return R.pipeP(
    imagesForUser,
    calculateEngagement(user),
    R.invoker(1, 'toFixed')(3)
  )(user)
}
