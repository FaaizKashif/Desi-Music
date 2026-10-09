# Desi Music 🎵

Desi Music is an open-source Discord music bot built with Node.js, Discord.js, and DisTube. It is designed to provide a straightforward music experience inside Discord voice channels while remaining easy for contributors to understand and extend.

## Features

- `/play` — play a song from a search query or supported link
- `/skip` — skip the current track
- `/stop` — stop playback
- Slash-command based interaction
- Voice-channel validation and user-friendly errors
- Deployable as a worker process

## Tech stack

- Node.js
- Discord.js
- DisTube
- FFmpeg
- dotenv

## Getting started

### Prerequisites

- Node.js 18 or newer
- A Discord application and bot token
- FFmpeg support on the host system

### Installation

```bash
git clone https://github.com/FaaizKashif/Desi-Music.git
cd Desi-Music
npm install
cp .env.example .env
```

Edit `.env` and provide your credentials:

```env
DISCORD_TOKEN=your_discord_bot_token_here
CLIENT_ID=your_discord_application_id_here
```

Then start the bot:

```bash
npm start
```

## Security

Never commit `.env`, Discord bot tokens, API keys, or other secrets. If a token is accidentally committed or uploaded publicly, rotate it immediately.

Please see [SECURITY.md](SECURITY.md) for responsible disclosure guidance.

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

## Roadmap

Planned improvements include queue controls, richer playback status, better source handling, automated tests, logging improvements, and contributor-friendly development tooling. See [ROADMAP.md](ROADMAP.md).

## License

This project is provided under the MIT License. See [LICENSE](LICENSE).
