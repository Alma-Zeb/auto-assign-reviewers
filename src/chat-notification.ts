import { buildPullRequestCard } from './notification-templates/pr-card'
import { GoogleChatNotificationParams } from './types/chat-notification.entity'
/**
 * Send a notification to Google Chat about PR reviewers.
 * @param webhookUrl Webhook url.
 * @param prOwner Pull Request owner name.
 * @param prName Pull Request name.
 * @param prUrl Pull Request url.
 * @param reviewers List of reviewers names.
 * @returns {Promise<void>} Resolves when the notification is sended.
 */
export async function sendGoogleChatNotification({
  webhookUrl,
  ...rest
}: GoogleChatNotificationParams): Promise<void> {
  const template = buildPullRequestCard(rest)

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(template)
  })

  const responseBody = await response.json()

  if (!response.ok) {
    throw new Error(
      `Failed to send notification to Google Chat: ${responseBody.error.message}`
    )
  }
}
