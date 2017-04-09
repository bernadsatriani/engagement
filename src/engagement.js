import R from 'ramda'

export const getLikesFromImages = R.map(R.path(['likes', 'count']))
export const getCommentsFromImages = R.map(R.path(['comments', 'count']))
export const getAllEngagements = R.converge(R.concat, [getLikesFromImages, getCommentsFromImages])
export default user => R.pipe(
  getAllEngagements,
  R.mean,
  R.divide(R.__, user.counts.followed_by)
)
