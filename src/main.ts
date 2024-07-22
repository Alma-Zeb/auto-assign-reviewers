import * as core from '@actions/core'
import { assignReviewers } from './assign-random-reviewers'
import { sendGoogleChatNotification } from './chat-notification'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const webhookUrl: string = core.getInput('webhook-url')
    const repoToken: string = core.getInput('repo-token')
    const numberReviewers = Number(core.getInput('reviewers'))
    const usernames: string[] = core.getMultilineInput('usernames')
    console.log('Assigning reviewers to PR')
    const response = await assignReviewers({
      repoToken,
      numberReviewers,
      usernames
    })

    if (!response) {
      core.error('There was an error assigning reviewers to the PR')
      return
    }
    console.log(`Assigned ${numberReviewers} reviewers to PR`)

    if (webhookUrl) {
      console.log(`Sending notification to Google Chat`)
      await sendGoogleChatNotification({
        ...response,
        webhookUrl
      })
      console.log(`Notification sent to Google Chat`)
    }
  } catch (error) {
    core.error('There was an error running the action')
    core.error(JSON.stringify(error))
    if (error instanceof Error) core.setFailed(error.message)
  }
}
