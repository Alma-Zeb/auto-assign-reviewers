# Random Pull Request Reviewers

Configuration:

**webhook-url**: Google Chat webhook url (Optional)

**repo-token**: Github repository token secret

**reviewers**: Number of reviewers (Optional)

**usernames**: List of Github usernames

## Example YAML file

```yaml
name: Random assign reviewers
on:
  pull_request:
    types:
      - opened
      - reopened
      - ready_for_review
jobs:
  assignReviewers:
    if: github.event.pull_request.draft == false
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: Alma-Zeb/auto-assign-reviewers@v1.0.4
        with:
          webhook-url: '${{ secrets.GOOGLE_CHAT_WEBHOOK_URL }}'
          repo-token: '${{ secrets.TOKEN }}'
          reviewers: 1
          usernames: |
            user1
            user2
            user3
```
