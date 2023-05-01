import kaboom from "./node_modules/kaboom/dist/kaboom.mjs";
import "./node_modules/kaboom/dist/kaboom.mjs";


kaboom()

loadSprite("link", "assets/Link_LA.png")

const link = add([
    sprite("link"),
    pos(80, 40)
]);