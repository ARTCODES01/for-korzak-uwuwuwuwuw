// const {
//   ChatInputCommandInteraction,
//   PermissionFlagsBits,
//   EmbedBuilder,
//   ActionRowBuilder,
//   SelectMenuBuilder,
// } = require("discord.js");
// const BOT = require("../../handlers/Client");

// module.exports = {
//   // options
//   name: "setuproles",
//   description: `setup menu role system`,
//   userPermissions: PermissionFlagsBits.Administrator,
//   botPermissions: PermissionFlagsBits.ManageRoles,
//   category: "Settings",
//   // command start

//   /**
//    *
//    * @param {BOT} client
//    * @param {ChatInputCommandInteraction} interaction
//    */
//   run: async (client, interaction) => {
//     // Code
//     try {
//       let msgfilter = (m) => m.author?.id === interaction.user?.id;
//       let rrfiler = (reaction, user) => user?.id === interaction.user?.id;

//       let rembed = new EmbedBuilder()
//         .setColor(client.config.embed.color)
//         .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
//         .setTitle("** For Guide Check Below **")
//         .setFooter({
//           text: interaction.guild.name,
//           iconURL: interaction.guild.iconURL(),
//         })
//         .setDescription(
//           `1. React Emoji On Below Message\n2. Then Ping a Role Which You Want to add in Reaction Role\n3. If You Want to add More Roles Follow Same Process else type \`finish\` to Stop Proccess \n 4. Then Bot Ask You Multi Reaction Role or Single Reaction , Select Which You Want \n 5. Then Bot Will Ask Tittle Of Embed \n 6. Then Bot ask For Channel to Send Reaction Role Embed \n 7. Congratulations.. Your Reaction Role Ready To Use \n *You have 30 seconds for each input!* `
//         );

//       interaction.followUp({ embeds: [rembed] });
//       let objet = {
//         MESSAGE_ID: "",
//         remove_others: false,
//         Parameters: [],
//       };
//       var counters = 0;
//       ask_emoji();

//       function ask_emoji() {
//         counters++;
//         if (counters.length === 21) return finished();
//         let object2 = {
//           Emoji: "",
//           Emojimsg: "",
//           Role: "",
//         };
//         let rermbed = new EmbedBuilder()
//           .setColor(client.config.embed.color)
//           .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
//           .setFooter({
//             text: interaction.guild.name,
//             iconURL: interaction.guild.iconURL(),
//           })
//           .setTitle("React a Emoji Which You Want to add In Reaction Role")
//           .setDescription(
//             "Type `finish` when you're done\n\n If You Want to add More Emoji Just React Emoji Follow Again Same Proccess"
//           );
//         var cancel = false;
//         interaction.channel.send({ embeds: [rermbed] }).then((msg) => {
//           msg
//             .awaitReactions({
//               filter: rrfiler,
//               max: 1,
//               time: 30000,
//             })
//             .then((collected) => {
//               if (
//                 collected.first().emoji?.id &&
//                 collected.first().emoji?.id.length > 2
//               ) {
//                 msg.delete();
//                 object2.Emoji = collected.first().emoji?.id;
//                 if (collected.first().emoji.animated)
//                   object2.Emojimsg =
//                     "<" +
//                     "a:" +
//                     collected.first().emoji.name +
//                     ":" +
//                     collected.first().emoji?.id +
//                     ">";
//                 else
//                   object2.Emojimsg =
//                     "<" +
//                     ":" +
//                     collected.first().emoji.name +
//                     ":" +
//                     collected.first().emoji?.id +
//                     ">";
//                 return ask_role();
//               } else if (collected.first().emoji.name) {
//                 msg.delete();
//                 object2.Emoji = collected.first().emoji.name;
//                 object2.Emojimsg = collected.first().emoji.name;
//                 return ask_role();
//               } else {
//                 interaction.channel.send({
//                   embeds: [
//                     new EmbedBuilder()
//                       .setColor(client.config.embed.color)
//                       .setTitle(`Proccess Canceled`)
//                       .setFooter({
//                         text: interaction.guild.name,
//                         iconURL: interaction.guild.iconURL(),
//                       }),
//                   ],
//                 });
//                 return finished();
//               }
//             })
//             .catch(() => {
//               if (!cancel) {
//                 interaction.channel.send({
//                   embeds: [
//                     new EmbedBuilder()
//                       .setColor(client.config.embed.color)
//                       .setTitle(
//                         `No Emoji Reacted in Give Time ||Proccess Canceled`
//                       )
//                       .setFooter({
//                         text: interaction.guild.name,
//                         iconURL: interaction.guild.iconURL(),
//                       }),
//                   ],
//                 });
//                 return finished();
//               }
//             });
//           msg.channel
//             .awaitMessages({
//               filter: msgfilter,
//               max: 1,
//               time: 30000,
//             })
//             .then((collected) => {
//               if (collected.first().content.toLowerCase() === "finish") {
//                 cancel = true;
//                 return finished();
//               }
//             })
//             .catch(() => {
//               if (!cancel) {
//                 interaction.channel.send({
//                   embeds: [
//                     new EmbedBuilder()
//                       .setColor(client.config.embed.color)
//                       .setTitle(
//                         `No Emoji Reacted in Give Time ||Proccess Canceled`
//                       )
//                       .setFooter({
//                         text: interaction.guild.name,
//                         iconURL: interaction.guild.iconURL(),
//                       }),
//                   ],
//                 });
//                 return finished();
//               }
//             });
//         });

//         function ask_role() {
//           counters++;
//           let rermbed = new EmbedBuilder()
//             .setColor(client.config.embed.color)
//             .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
//             .setTitle(`Mention a Role Which you want to add With Reacted Emoji`)
//             .setFooter({
//               text: interaction.guild.name,
//               iconURL: interaction.guild.iconURL(),
//             });
//           interaction.channel.send({ embeds: [rermbed] }).then((msg) => {
//             msg.channel
//               .awaitMessages({
//                 filter: msgfilter,
//                 max: 1,
//                 time: 30000,
//               })
//               .then((collected) => {
//                 let role = collected
//                   .first()
//                   .mentions.roles.filter(
//                     (role) => role.guild?.id == interaction.guild?.id
//                   )
//                   .first();
//                 if (!role)
//                   interaction.channel.send({
//                     embeds: [
//                       new EmbedBuilder()
//                         .setColor(client.config.embed.color)
//                         .setTitle(
//                           `Pinged Role is Not Valid ||Proccess Canceled`
//                         )
//                         .setFooter({
//                           text: interaction.guild.name,
//                           iconURL: interaction.guild.iconURL(),
//                         }),
//                     ],
//                   });
//                 if (role) {
//                   object2.Role = role?.id;
//                   objet.Parameters.push(object2);

//                   try {
//                     msg.delete();
//                   } catch {}
//                   try {
//                     msg.channel.bulkDelete(1);
//                   } catch {}

//                   return ask_emoji();
//                 } else {
//                   interaction.channel.send({
//                     embeds: [
//                       new EmbedBuilder()
//                         .setColor(client.config.embed.color)
//                         .setTitle(`Finished ||Proccess Canceled`)
//                         .setFooter({
//                           text: interaction.guild.name,
//                           iconURL: interaction.guild.iconURL(),
//                         }),
//                     ],
//                   });
//                   return finished();
//                 }
//               })
//               .catch((e) => {
//                 console.log(e);
//                 interaction.channel.send({
//                   embeds: [
//                     new EmbedBuilder()
//                       .setColor(client.config.embed.color)
//                       .setTitle(
//                         `No Emoji Reacted in Give Time ||Proccess Canceled`
//                       )
//                       .setFooter({
//                         text: interaction.guild.name,
//                         iconURL: interaction.guild.iconURL(),
//                       }),
//                   ],
//                 });
//                 return finished();
//               });
//           });
//         }
//       }

//       async function finished() {
//         let thisembed = new EmbedBuilder()
//           .setColor(client.config.embed.color)
//           .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
//           .setFooter({
//             text: interaction.guild.name,
//             iconURL: interaction.guild.iconURL(),
//           })
//           .setTitle("Give A Tittle for Reaction Role Embed")
//           .setDescription(
//             "This embed Will Store all added Emoji and Role name \n Embed Tittle Must be Below Than 256 Words"
//           );
//         interaction.channel
//           .send({
//             embeds: [thisembed],
//           })
//           .then((msg) => {
//             msg.channel
//               .awaitMessages({
//                 filter: msgfilter,
//                 max: 1,
//                 time: 120000,
//                 errors: ["TIME"],
//               })
//               .then((collected) => {
//                 let title = String(collected.first().content).substring(0, 256);

//                 interaction.channel
//                   .send({
//                     embeds: [
//                       new EmbedBuilder()
//                         .setColor(client.config.embed.color)
//                         .setThumbnail(
//                           interaction.guild.iconURL({ dynamic: true })
//                         )
//                         .setFooter({
//                           text: interaction.guild.name,
//                           iconURL: interaction.guild.iconURL(),
//                         })
//                         .setTitle(
//                           "Ping a Channel in Which You want to Send Reaction Role Embed.."
//                         )
//                         .setDescription(
//                           "Ping the Channel **now** with #channel"
//                         ),
//                     ],
//                   })
//                   .then((msg) => {
//                     msg.channel
//                       .awaitMessages({
//                         filter: msgfilter,
//                         max: 1,
//                         time: 120000,
//                         errors: ["TIME"],
//                       })
//                       .then((collected) => {
//                         if (
//                           collected
//                             .first()
//                             .mentions.channels.filter(
//                               (ch) => ch.guild?.id == interaction.guild?.id
//                             )
//                             .first()
//                         ) {
//                           let channel = collected
//                             .first()
//                             .mentions.channels.filter(
//                               (ch) => ch.guild?.id == interaction.guild?.id
//                             )
//                             .first();
//                           let embed = new EmbedBuilder()
//                             .setColor(client.config.embed.color)
//                             .setThumbnail(
//                               interaction.guild.iconURL({ dynamic: true })
//                             )
//                             .setTitle(title)
//                             .setFooter({
//                               text: interaction.guild.name,
//                               iconURL: interaction.guild.iconURL(),
//                             });
//                           let buffer = "";
//                           for (let i = 0; i < objet.Parameters.length; i++) {
//                             try {
//                               buffer += `> ${objet.Parameters[i].Emojimsg}  •  <@&${objet.Parameters[i].Role}> \n\n`;
//                               // objet.Parameters[i].Emojimsg + "   <@&" + objet.Parameters[i].Role + ">\n";
//                             } catch (e) {
//                               console.log(e);
//                             }
//                           }
//                           channel
//                             .send({
//                               embeds: [embed.setDescription(buffer)],
//                             })
//                             .then(async (msg) => {
//                               console.log(objet);
//                               let targetMessage = await channel.messages.fetch(
//                                 msg?.id,
//                                 {
//                                   cache: true,
//                                   force: true,
//                                 }
//                               );
//                               for (
//                                 let i = 0;
//                                 i < objet.Parameters.length;
//                                 i++
//                               ) {
//                                 try {
//                                   let menuRole =
//                                     interaction.guild.roles.cache.get(
//                                       objet.Parameters[i].Role
//                                     );
//                                   let raw = targetMessage.components[0];
//                                   if (!raw) {
//                                     raw = new ActionRowBuilder();
//                                   }
//                                   let option = [];
//                                   option.push({
//                                     label: menuRole.name,
//                                     value: menuRole?.id,
//                                     description: `Select to Get Role`,
//                                     emoji: objet.Parameters[i].Emoji,
//                                   });
//                                   let menu = raw.components[0];
//                                   if (menu) {
//                                     console.log(`if`);
//                                     for (const o of menu.options) {
//                                       if (o.value === option[0].value) {
//                                         return interaction.channel.send(
//                                           `<@${o.value}> is Already Added in The Menu`
//                                         );
//                                       }
//                                     }

//                                     menu.addOptions(
//                                       option.map((options) => {
//                                         let Obj = {
//                                           label: options.label
//                                             ? options.label.substring(0, 50)
//                                             : options.value.substring(0, 50),
//                                           value: options.value.substring(0, 50),
//                                           description:
//                                             options.description.substring(
//                                               0,
//                                               50
//                                             ),
//                                           emoji: options.emoji,
//                                         };
//                                         if (options.emoji)
//                                           Obj.emoji = options.emoji;
//                                         return Obj;
//                                       })
//                                     );
//                                   } else {
//                                     console.log(`else`);
//                                     raw.addComponents(
//                                       new SelectMenuBuilder()
//                                         .setCustomId(`auto_roles`)
//                                         .setPlaceholder(
//                                           `Click to See all Roles`
//                                         )
//                                         .setMinValues(1)
//                                         .addOptions(
//                                           option.map((options) => {
//                                             let Obj = {
//                                               label: options.label
//                                                 ? options.label.substring(0, 50)
//                                                 : options.value.substring(
//                                                     0,
//                                                     50
//                                                   ),
//                                               value: options.value.substring(
//                                                 0,
//                                                 50
//                                               ),
//                                               description:
//                                                 options.description.substring(
//                                                   0,
//                                                   50
//                                                 ),
//                                               emoji: options.emoji,
//                                             };
//                                             if (options.emoji)
//                                               Obj.emoji = options.emoji;
//                                             return Obj;
//                                           })
//                                         )
//                                     );
//                                   }
//                                   await targetMessage.edit({
//                                     components: [raw],
//                                   });
//                                   // menu
//                                 } catch (e) {
//                                   console.log(e);
//                                 }
//                               }
//                               interaction.channel.send({
//                                 embeds: [
//                                   new EmbedBuilder()
//                                     .setColor(client.config.embed.color)
//                                     .setThumbnail(
//                                       interaction.guild.iconURL({
//                                         dynamic: true,
//                                       })
//                                     )
//                                     .setTitle(
//                                       `✅ SuccessFully Setup Reaction Role ✅`
//                                     )
//                                     .setDescription(
//                                       `Now You Can Use Reaction Role in <#${msg.channel?.id}>`
//                                     )
//                                     .setFooter({
//                                       text: interaction.guild.name,
//                                       iconURL: interaction.guild.iconURL(),
//                                     }),
//                                 ],
//                               });
//                             });
//                         } else {
//                           interaction.channel.send({
//                             embeds: [
//                               new EmbedBuilder()
//                                 .setColor(client.config.embed.color)
//                                 .setThumbnail(
//                                   interaction.guild.iconURL({
//                                     dynamic: true,
//                                   })
//                                 )
//                                 .setTitle(`Please Ping a Valid Channel`)
//                                 .setFooter({
//                                   text: interaction.guild.name,
//                                   iconURL: interaction.guild.iconURL(),
//                                 }),
//                             ],
//                           });
//                           return;
//                         }
//                       })
//                       .catch((e) => console.log(e));
//                   });
//               })
//               .catch((e) => console.log(e));
//           });
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   },
// };
