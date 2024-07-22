import { AssignReviewersResponse } from './assign-reviewers.entity'

export type GoogleChatNotificationParams = AssignReviewersResponse & {
  webhookUrl: string
}
