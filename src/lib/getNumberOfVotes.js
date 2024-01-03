export function getNumberOfVotes(postId, votes) {
  const votesForPost = votes.filter((vote) => vote.postId === postId);
  let numberOfVotes = 0;

  for (let i = 0; i < votesForPost.length; i++) {
    if (votesForPost[i].isUpvote === true) {
      numberOfVotes += 1;
    } else if (votesForPost[i].isUpvote === false) {
      numberOfVotes -= 1;
    }
  }

  return numberOfVotes;
}
