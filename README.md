# random-review-request-google-chat

Randomly select a team member from reviewers.json and automatically send the review request via Google Chat.

## Usage

### 1. Fork this repository

### 2. Copy `reviewers.example.json` to `reviewers.json`

### 3. Add team members to `reviewers.json`

```json
[
  {
    "github": "REVIEWER_01_GITHUB_ID",
    "gchat": "REVIEWER_01_GOOGLE_CHAT_ID"
  },
  {
    "github": "REVIEWER_02_GITHUB_ID",
    "gchat": "REVIEWER_02_GOOGLE_CHAT_ID"
  },
  {
    "github": "REVIEWER_03_GITHUB_ID",
    "gchat": "REVIEWER_03_GOOGLE_CHAT_ID"
  }
]
```

### 4. Create a new Google Chat Space

### 5. Add a new Webhook to the Google Chat Space

### 6. Add the Webhook URL to the repository secrets

### 7. Create GitHub Actions workflow in your project repository

Example of the workflow file:

```yaml
name: Random Reviewer Assignment

on:
  pull_request:
    types: [opened, reopened]

jobs:
  assign:
    if: github.actor != 'dependabot[bot]'
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          repository: "your-username/random-review-request-google-chat"
          token: ${{ secrets.your_github_token }}
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 21
      - name: Assign Random Reviewer
        run: node index.js
        env:
          PR_TITLE: ${{ github.event.pull_request.title }}
          PR_AUTHOR: ${{ github.actor }}
          PR_URL: ${{ github.event.pull_request.html_url }}
          PR_BASE: ${{ github.base_ref }}
          GCHAT_WEBHOOK_URL: ${{ secrets.gchat_webhook_url }}
          REQUIRED_REVIEWERS: ${{ secrets.required_reviewers }}
```

### 8. Done

## How did this project come about?

Have you ever had a small collaborative development project where you shared a repository owned by your personal account with several team members?
Now, let's say you set up a branch protection rule for that repository that says you cannot merge a Pull Request unless you get a code review from at least one person, including Code Owners.
Then you register all team members in the CODEOWNERS file.
Then any Pull Request created in that repository will automatically have a review request sent to all team members registered in the CODEOWNERS file automatically.
As a result, there may be a mentality among team members that “even if I don't review it, someone else will, so I can ignore this request.
If there are team members who love code reviews, this may not be a problem, but what do you think will happen if this mentality is applied to all team members?
The Pull Request will not be reviewed by anyone, and the Pull Request will be left unmergeable.
On the other hand, if the branch protection rules are made less enforceable, the possibility of problematic code getting into the master branch will increase, making the rules meaningless.
And you will have to spend extra time to fix the problematic code.
This is not a good situation because it slows down the progress of the project.
Therefore, to solve this issue in this project, the bot will randomly mentions a pre-defined team member and sends a message “You should review this Pull Request” to Google Chat.
In this way, it is clear who should review the code, and the situation where no one reviews the code can be avoided.

This issue can also be solved by introducing GitHub Organization to your team and using the Teams feature.
However, you will need to subscribe to a Team plan or higher to enforce branch protection rules in GitHub Organization's private repositories.
While a company might be able to treat this as a necessary expense, a team composed of students might have a difficult time finding the budget.
Instead, utilizing GitHub Pro from the GitHub Student Developer Pack would be a good option for applying the branch protection rule.
It is in this situation that this project was born.
This project has a very simple implementation and can be applied to a variety of services, not only Google Chat, but also email, Slack, Discord, and so on.
I would be happy if this project could help someone else who has the same problems as I do.

## License

Please see the [LICENSE](LICENSE) file for more information.
