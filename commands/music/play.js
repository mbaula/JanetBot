const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const client = require("../../index");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play a song.")
    .addStringOption(option =>
        option.setName("query")
            .setDescription("Provide the name or url for the song.")
            .setRequired(true)
    ),
  async execute(interaction, client) {

    const { options, member, guild, channel } = interaction;
    
    const queryOption = options.get('song_link');
    const query = queryOption.value;
    console.log(query);
    const voiceChannel = member.voice.channel;
    
    const embed = new EmbedBuilder();

    if (!voiceChannel) {
        embed.setColor('#FF0000').setDescription("You must be in a voice channel to execute music commands.");
        return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    if (!member.voice.channelId == guild.members.me.voice.channelId) {
        embed.setColor('#800080').setDescription(`You can't use the music player as it is already active in <#${guild.members.me.voice.channelId}>`);
        return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    try {

        client.distube.play(voiceChannel, query, { textChannel: channel, member: member });
        return interaction.reply({ content: "🎶 Request received." });

    } catch (err) {
        console.log(err);

        embed.setColor('#800080').setDescription("⛔ | Something went wrong...");

        return interaction.reply({ embeds: [embed], ephemeral: true });
    }
  }
};
