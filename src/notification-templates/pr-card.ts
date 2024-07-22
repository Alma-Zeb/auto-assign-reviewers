import { AssignReviewersResponse } from '../types/assign-reviewers.entity'

export function buildPullRequestCard({
  prUser,
  prName,
  prUrl,
  reviewers
}: AssignReviewersResponse): object {
  const widgets = reviewers.map(reviewer => ({
    decoratedText: {
      startIcon: {
        knownIcon: 'PERSON'
      },
      text: reviewer
    }
  }))

  const prLink = prUrl
    ? [
        {
          buttonList: {
            buttons: [
              {
                text: 'Pull Request',
                onClick: {
                  openLink: {
                    url: prUrl
                  }
                }
              }
            ]
          }
        }
      ]
    : []
  return {
    cardsV2: [
      {
        card: {
          header: {
            title: `Pull Request Open by ${prUser}`,
            subtitle: `Pull Request: ${prName}`,
            imageUrl:
              'https://developers.google.com/workspace/chat/images/quickstart-app-avatar.png',
            imageType: 'CIRCLE',
            imageAltText: 'avatar robot'
          },
          sections: [
            {
              header: 'Reviewers',
              widgets: [widgets, ...prLink]
            }
          ]
        }
      }
    ]
  }
}
