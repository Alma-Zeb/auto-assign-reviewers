import * as core from '@actions/core'
import * as github from '@actions/github'
import {
  AssignReviewersPrams,
  AssignReviewersResponse
} from './types/assign-reviewers.entity'
import { Octokit } from './types/octokit.entiyt'

/**
 * Assigns random reviewers to a pull request.
 * @param repoToken Repository token.
 * @param numberReviewers Number of reviewers to assign to PR.
 * @param usernames List of user names of Github.
 * @returns {Promise<AssignReviewersResponse>} Assigned users and PR information.
 */
export async function assignReviewers({
  repoToken,
  numberReviewers,
  usernames
}: AssignReviewersPrams): Promise<AssignReviewersResponse | null> {
  const { eventName, payload } = github.context
  const pr = payload?.pull_request
  const repository = payload?.repository

  if (eventName !== 'pull_request') {
    core.error(`Invalid event: ${eventName}`)
    return null
  }

  if (!pr) {
    core.error(`No pull request found in the payload`)
    return null
  }

  const repositoryOwner = repository?.owner?.login ?? ''
  const repositoryName = repository?.name ?? ''
  const prUser = pr?.user?.login
  const prName = pr?.title
  const prNumber = pr?.number
  const prUrl = pr?.html_url ?? ''

  const octokit = github.getOctokit(repoToken)

  const reviewers = getRandomReviewers(usernames, numberReviewers, prUser)

  await assignReviewersToPullRequest(
    octokit,
    repositoryOwner,
    repositoryName,
    prNumber,
    reviewers
  )

  return {
    prUser,
    prName,
    prUrl,
    reviewers
  }
}

function getRandomReviewers(
  usernames: string[],
  numberReviewers: number,
  owner: string
): string[] {
  const filteredUsernames = usernames.filter(username => username !== owner)
  if (filteredUsernames.length < numberReviewers) {
    core.error(`Not enough reviewers to assign to PR`)
    return []
  }

  const reviewers = []
  for (let i = 0; i < numberReviewers; i++) {
    const randomIndex = Math.floor(Math.random() * filteredUsernames.length)
    reviewers.push(filteredUsernames[randomIndex])
    filteredUsernames.splice(randomIndex, 1)
  }

  return reviewers
}

async function assignReviewersToPullRequest(
  octokit: Octokit,
  owner: string,
  repo: string,
  prNumber: number,
  reviewers: string[]
): Promise<void> {
  await octokit.rest.pulls.requestReviewers({
    owner,
    repo,
    pull_number: prNumber,
    reviewers
  })
}
