const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');
const command = require('./command');
const firstMessage = require('./first-message');

client.on('ready', () => {
	console.log('Pervy Sage is ready!');

	firstMessage(client, '835654308786602025', 'hello world', [ '🔥', '🍉' ]);

	command(client, 'ping', (message) => {
		message.channel.send('Pong!');
	});

	command(client, 'servers', (message) => {
		client.guilds.cache.forEach((guild) => {
			message.channel.send(`${guild.name} has a total of ${guild.memberCount} members`);
		});
	});

	command(client, [ 'cc', 'clearchannel' ], (message) => {
		if (message.member.hasPermission('ADMINISTRATORS')) {
			message.channel.messages.fetch().then((results) => {
				message.channel.bulkDelete(results);
			});
		}
	});

	command(client, 'status', (message) => {
		const content = message.content.replace('!status ', '');
		client.user.setPresence({
			activity: {
				name: content,
				type: 0
			}
		});
	});
});

client.login(config.token);
