// Configuration settings for the game
export const config = {
    screen: {
        width: window.innerWidth,
        height: window.innerHeight,
    },
    physics: {
        gravity: 0,
        debug: false,
    },
    gameSettings: {
        maxPlayers: 1,
        enableSound: true,
        enableMusic: true,
    },
    assets: {
        images: {
            player: 'assets/images/player.png',
            npc: 'assets/images/npc.png',
            background: 'assets/images/background.png',
        },
        audio: {
            backgroundMusic: 'audio/background.mp3',
            clickSound: 'audio/click.mp3',
        },
    },
};