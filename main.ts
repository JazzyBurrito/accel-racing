enum RadioMessage {
    message1 = 49434
}
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.floorLight0, function (sprite, location) {
    checkPoint = 1
})
function initTimeView () {
    scene.createRenderable(0, function (target: Image, camera: scene.Camera) {
    const s = "Time " + formatTime(lapTime)+"  Best "+formatTime(bestTime)
    const font = image.font8
    const width = font.charWidth * s.length;
    const left = (screen.width >> 1) - (width >> 1) + 1;
    screen.fillRect(left, 0, width, font.charHeight, 0);
    screen.print(s, left, 0, 3, font);
})
function formatTime(t:number) {
    if (t==0) {
        return "--.--"
    }
    const seconds = Math.idiv(t, 1000)
    const remainder = Math.idiv(t % 1000, 10)
    return formatDecimal(seconds) + "." + formatDecimal(remainder)
}
function formatDecimal(val: number) {
    val |= 0;
    if (val < 10) {
        return "0" + val;
    }
    return val.toString();
}
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    music.playTone(392, music.beat(BeatFraction.Eighth))
    direction2 += 1
    direction2 = direction2 % 4
    setSpriteDirection2()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    music.playTone(392, music.beat(BeatFraction.Eighth))
    direction += 1
    direction = direction % 4
    setSpriteDirection()
})
function setSpriteDirection2 () {
    mySprite2.setImage(cars2[direction2])
    mySprite2.ax = accel2 * dx2[direction2]
    mySprite2.ay = accel2 * dy2[direction2]
}
function setSpriteDirection () {
    mySprite.setImage(cars[direction])
    mySprite.ax = accel * dx[direction]
    mySprite.ay = accel * dy[direction]
}
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.floorMixed, function (sprite, location) {
    if (checkPoint == 1) {
        checkPoint = 0
        startTime = game.runtime()
        if (bestTime == 0 || lapTime < bestTime) {
            bestTime = lapTime
            music.powerUp.play()
        }
    }
})
let startTime = 0
let checkPoint = 0
let cars2: Image[] = []
let cars: Image[] = []
let dy2: number[] = []
let dx2: number[] = []
let direction2 = 0
let accel2 = 0
let dy: number[] = []
let dx: number[] = []
let direction = 0
let accel = 0
let mySprite2: Sprite = null
let mySprite: Sprite = null
scene.setBackgroundColor(13)
mySprite = sprites.create(sprites.vehicle.carRedLeft, SpriteKind.Player)
mySprite2 = sprites.create(sprites.vehicle.carBlueLeft, SpriteKind.Player)
mySprite.setPosition(192, 48)
mySprite2.setPosition(192, 80)
scene.cameraFollowSprite(mySprite)
tiles.setTilemap(tilemap`level1`)
accel = 220
direction = 0
dx = [-1, 0, 1, 0]
dy = [0, 1, 0, -1]
accel2 = 220
direction2 = 0
dx2 = [-1, 0, 1, 0]
dy2 = [0, 1, 0, -1]
cars = [sprites.vehicle.carRedLeft, sprites.vehicle.carRedFront, sprites.vehicle.carRedRight, sprites.vehicle.carRedBack]
cars2 = [sprites.vehicle.carBlueLeft, sprites.vehicle.carBlueFront, sprites.vehicle.carBlueRight, sprites.vehicle.carBlueBack]
setSpriteDirection()
setSpriteDirection2()
let bestTime = 0
let lapTime = 0
initTimeView()
checkPoint = 0
game.showLongText("Turn your car by \"A\" button.", DialogLayout.Bottom)
startTime = game.runtime()
game.onUpdate(function () {
    mySprite.vx = mySprite.vx * 0.97
    mySprite.vy = mySprite.vy * 0.97
    lapTime = game.runtime() - startTime
})
game.onUpdate(function () {
    mySprite2.vx = mySprite2.vx * 0.97
    mySprite2.vy = mySprite2.vy * 0.97
    lapTime = game.runtime() - startTime
})
