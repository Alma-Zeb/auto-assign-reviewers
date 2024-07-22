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
  pull_request_target:
    types:
      - ready_for_review
jobs:
  assignReviewers:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: Alma-Zeb/random-pr-reviewers@v1
        with:
          webhook-url: '${{ secrets.GOOGLE_CHAT_WEBHOOK_URL }}'
          repo-token: '${{ secrets.GITHUB_TOKEN }}'
          reviewers: 2
          usernames: |
            user1
            user2
            user3
            user4
```
