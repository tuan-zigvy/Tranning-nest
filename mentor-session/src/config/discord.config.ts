export default (): Record<string, string> => ({
  token: process.env.DISCORD_TOKEN,
  channelID: process.env.DISCORD_SERVER_ID,
});
