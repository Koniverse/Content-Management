export const formatDiscordInfo = (discord_infos: any[]) => {
  let userInfo = ''
  let roleInfo = ''

  discord_infos.map(discord_info => {
    const {type, discord_id: discordId} = discord_info
    if (type === 'user') {
      userInfo = userInfo + `<@${discordId}> `
    } else {
      roleInfo = roleInfo + `<@&${discordId}> `
    }
  })
  return `\ncc: ${userInfo} ${roleInfo}`
}
