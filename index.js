const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require("discord.js");
const { DisTube } = require("distube");
const { config } = require("dotenv");

config();

const requiredEnv = ["DISCORD_TOKEN", "CLIENT_ID"];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);

if (missingEnv.length) {
  console.error(`Missing required environment variables: ${missingEnv.join(", ")}`);
  process.exit(1);
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

const distube = new DisTube(client, {
  leaveOnFinish: false,
  leaveOnStop: false,
  emitNewSongOnly: true,
  youtubeDL: true,
});

const commands = [
  new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play a song")
    .addStringOption((option) =>
      option.setName("query").setDescription("Song name or link").setRequired(true)
    ),
  new SlashCommandBuilder().setName("skip").setDescription("Skip the current song"),
  new SlashCommandBuilder().setName("stop").setDescription("Stop the music"),
].map((command) => command.toJSON());

async function registerCommands() {
  const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);
  console.log("Refreshing slash commands...");
  await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
  console.log("Slash commands registered.");
}

client.once("ready", () => {
  console.log(`Desi Music Bot is online as ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const voiceChannel = interaction.member?.voice?.channel;
  if (!voiceChannel) {
    await interaction.reply({ content: "⚠️ Join a voice channel first!", ephemeral: true });
    return;
  }

  try {
    if (interaction.commandName === "play") {
      const query = interaction.options.getString("query", true);
      await interaction.reply(`🎵 Loading: \`${query}\``);
      await distube.play(voiceChannel, query, {
        textChannel: interaction.channel,
        member: interaction.member,
      });
      return;
    }

    if (interaction.commandName === "skip") {
      await distube.skip(interaction);
      await interaction.reply("⏭ Skipped!");
      return;
    }

    if (interaction.commandName === "stop") {
      await distube.stop(interaction);
      await interaction.reply("⏹ Stopped!");
    }
  } catch (error) {
    console.error(error);
    const message = `❌ Error: ${error.message || "Unknown error"}`;
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: message, ephemeral: true });
    } else {
      await interaction.reply({ content: message, ephemeral: true });
    }
  }
});

distube.on("playSong", (queue, song) => {
  queue.textChannel?.send(`🎶 Now playing: **${song.name}**`);
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled promise rejection:", error);
});

(async () => {
  try {
    await registerCommands();
    await client.login(process.env.DISCORD_TOKEN);
  } catch (error) {
    console.error("Failed to start Desi Music Bot:", error);
    process.exit(1);
  }
})();
