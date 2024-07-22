export type AssignReviewersPrams = {
  repoToken: string
  numberReviewers: number
  usernames: string[]
}

export type AssignReviewersResponse = {
  prUser: string
  prName: string
  prUrl: string
  reviewers: string[]
}
