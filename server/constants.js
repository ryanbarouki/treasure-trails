const BOARD_SIZE = 800;
const TILE_SIZE = BOARD_SIZE/10;
const OFFSET = (BOARD_SIZE - 7 * TILE_SIZE) / 2
const BOARD_SPEED = 10;
const FRAME_RATE = 25;
const ROTATE_SPEED = Math.PI/16;
const PLAYER_HEIGHT = 192/4
const PLAYER_WIDTH = 128/4;
const PLAYER_SPEED = 5;
const PLAYER_OFFSET_X = (TILE_SIZE - PLAYER_WIDTH) / 2;
const PLAYER_OFFSET_Y = (TILE_SIZE - PLAYER_HEIGHT) / 2;
const TREASURE_SIZE = 32;
const TREASURE_OFFSET = (TILE_SIZE - TREASURE_SIZE) /2;
const treasure = {"bag" : 0,
                "pearl" : 1,
                "blueStone" : 2,
                "chest1" : 3,
                "chest2" : 4, 
                "chest3" : 5,
                "chest4" : 6,
                "chest5" : 7,
                "crown1" : 8,
                "crown2" : 9,
                "diamond" : 10,
                "emerald" : 11,
                "gold" : 12,
                "jewellery" : 13,
                "key" : 14,
                "pinkStone" : 15,
                "ring1" : 16,
                "ring2" : 17,
                "ruby" : 18,
                "scepter" : 19,
                "scroll" : 20,
                "scull" : 21,
                "vessel" : 22,
                "violetStone" : 23 }

module.exports = {PLAYER_OFFSET_X, PLAYER_OFFSET_Y, TILE_SIZE, FRAME_RATE, BOARD_SIZE, 
    OFFSET, BOARD_SPEED, ROTATE_SPEED, PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_SPEED,
    TREASURE_OFFSET, treasure};

