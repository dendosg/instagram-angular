export const endPoints = {
  postLikesCount: `https://graph.facebook.com/:postId/likes?summary=total_count&access_token=:accessToken`,
  postCommentsCount: `https://graph.facebook.com/:postId/comments?summary=total_count&access_token=:accessToken`,
  postSharesCount: `https://graph.facebook.com/:postId?fields=shares&access_token=:accessToken`,
  pageCheckinCount: `https://graph.facebook.com/:pageId?fields=checkins&access_token=:accessToken`,
  groupJoined: `https://graph.facebook.com/:userId/groups?access_token=:accessToken`,
  pageLiked: `https://graph.facebook.com/:userId/likes?access_token=:accessToken`
};
