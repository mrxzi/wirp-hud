-- $$\   $$\  $$$$$$\  $$\   $$\ $$\   $$\ $$$$$$$\  
-- $$$\  $$ |$$  __$$\ $$ |  $$ |$$ |  $$ |$$  __$$\ 
-- $$$$\ $$ |$$ /  \__|$$ |  $$ |$$ |  $$ |$$ |  $$ |
-- $$ $$\$$ |$$ |      $$$$$$$$ |$$ |  $$ |$$$$$$$\ |
-- $$ \$$$$ |$$ |      $$  __$$ |$$ |  $$ |$$  __$$\ 
-- $$ |\$$$ |$$ |  $$\ $$ |  $$ |$$ |  $$ |$$ |  $$ |
-- $$ | \$$ |\$$$$$$  |$$ |  $$ |\$$$$$$  |$$$$$$$  |
-- \__|  \__| \______/ \__|  \__| \______/ \_______/  
-- Discord.gg/wirp & Patreon.com/wirp
fx_version "cerulean"
game "gta5"
lua54 "yes"
--[[ Resource Information ]]
name "wirp-hud"
--[[ Manifest ]]
shared_scripts {
    "shared/**/*"
}
client_scripts {
    "client/utils.lua",
    "client/variables.lua",
    "client/functions.lua",
    "client/events.lua",
    "client/nui.lua",
    "client/threads.lua",
    "map.lua",
    "client/commands.lua",
}
server_scripts {
    "server/variables.lua",
    "server/functions.lua",
    "server/commands.lua",
    "server/events.lua",
    "server/threads.lua"
}
ui_page "ui/build/index.html"
files {
    "locales/**/*",
    "ui/build/index.html",
    "ui/build/**/*"
}
dependency '/assetpacks'