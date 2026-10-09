# Security Policy

## Reporting a vulnerability

Please do not open a public issue for a vulnerability that could expose credentials, allow unauthorized actions, or affect users.

Instead, contact the maintainer privately through the repository owner's GitHub profile and include:

- A clear description of the issue
- Steps to reproduce it
- Potential impact
- A suggested fix, if available

## Secrets

Discord tokens, API keys, and other credentials must never be committed to the repository. Use environment variables and keep local `.env` files excluded by `.gitignore`.

If a secret is exposed publicly, rotate or revoke it immediately before removing it from the repository.
