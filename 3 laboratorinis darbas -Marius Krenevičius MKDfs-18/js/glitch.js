// Set up the variables needed and loads the images to create the effect.
// Once the images are loaded the ‘setup’ function will be called.

var app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
});
const showcase = document.querySelector(".tv");
showcase.appendChild(app.view);

app.stage.interactive = true;
var posX, displacementSprite, displacementFilter, bg, vx;
var container = new PIXI.Container();
app.stage.addChild(container);

PIXI.loader
  .add("../images/glitch.png")
  .add("../images/DSC_0298.jpg")
  .load(setup);

// In the ‘setup’ function the displacement sprite is created
// that will create the effect and this is added to a displacement filter.
// It’s then set to move its anchor point to the centre of the image and positioned on the screen.
function setup() {
  posX = app.renderer.width / 2;
  displacementSprite = new PIXI.Sprite(
    PIXI.loader.resources["../images/glitch.png"].texture
  );
  displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
  displacementSprite.anchor.set(0.5);
  displacementSprite.x = app.renderer.width / 2;
  displacementSprite.y = app.renderer.height / 2;
  vx = displacementSprite.x;

  // To finish off the ‘setup’ function, the displacement filter scale is set and the background positioned.
  // Notice the scale is ‘0’ for the displacement, that’s because it will be set to a height as soon as the mouse moves.

  app.stage.addChild(displacementSprite);
  container.filters = [displacementFilter];
  displacementFilter.scale.x = 0;
  displacementFilter.scale.y = 0;
  bg = new PIXI.Sprite(PIXI.loader.resources["../images/DSC_0298.jpg"].texture);
  bg.width = app.renderer.width;
  bg.height = app.renderer.height;
  container.addChild(bg);
  app.stage.on("mousemove", onPointerMove).on("touchmove", onPointerMove);
  loop();
}

// grab the position of the mouse on the x-axis whenever the mouse moves.

function onPointerMove(eventData) {
  posX = eventData.data.global.x;
}

// create a function that continually updates the screen. A velocity for the x-axis is worked out using the position of the mouse and the ripple.

function loop() {
  requestAnimationFrame(loop);
  vx += (posX - displacementSprite.x) * 0.045;
  displacementSprite.x = vx;
  var disp = Math.floor(posX - displacementSprite.x);
  if (disp < 0) disp = -disp;
  var fs = map(disp, 0, 500, 0, 120);
  disp = map(disp, 0, 500, 0.1, 0.6);
  displacementSprite.scale.x = disp;
  displacementFilter.scale.x = fs;
}

// Finally, the map function is declared that maps value ranges to new values.

map = function (n, start1, stop1, start2, stop2) {
  var newval = ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
  return newval;
};
