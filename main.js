"use strict";

(() => {
  // Set how many numbers to use.
  const NO_OF_NUM = 40;

  // This boolean decides weather the app is stopped or not.
  let isPaused = false;

  // Set how fast the image changes. Smaller number means faster.
  const SPEED = [10, 5, 10, 5, 10, 5];

  const ONE_SECOND = 1000;

  // Set the image paths.
  const IMAGE_PATH = "images/numbers.png";

  // Array for canvas elements.
  const canvasList = [
    document.getElementById("number1"),
    document.getElementById("number2"),
    document.getElementById("number3"),
    document.getElementById("number4"),
    document.getElementById("number5"),
    document.getElementById("number6")
  ];

  const stopButton = document.getElementById("stop_button");
  const restartButton = document.getElementById("restart_button");

  // Set an array for object with canvas info.
  const canvasConfigList = canvasList.map((canvas, index) => {
    return {
      currentFrame: index,
      speed: SPEED[index],
      canvas,
      context: canvas.getContext("2d")
    };
  });

  // Create new Image objects.
  const imageObj = new Image();

  // Set src for image objects.
  imageObj.src = IMAGE_PATH;

  // Main function for this app.
  function main() {
    restartButton.addEventListener("click", () => {
      window.location.reload();
    });

    stopButton.addEventListener("click", () => {
      if (!isPaused) {
        fixDuplication();
        isPaused = true;
      }
    });

    imageObj.onload = () => {
      canvasConfigList.forEach(canvasConfig => {
        // Destructuring assignment
        // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
        const { canvas, context, speed } = canvasConfig;

        setInterval(() => {
          if (!isPaused) {
            canvasConfig.currentFrame++;
            draw(canvas, context, canvasConfig.currentFrame);
          }
        }, ONE_SECOND / speed);
      });
    };
  }

  // Function for drawing the image on each canvas repeatedly.
  function draw(canvas, context, currentFrame) {
    // indexOfImage === 39 % 40 (Index of image is 39)
    // indexOfImage === 40 % 40 (Index of image is 0)
    // indexOfImage === 41 % 40 (Index of image is 1)
    const indexOfImage = currentFrame % NO_OF_NUM;

    const sx = 20;
    const sy = 40 + 94.5 * indexOfImage; // 40 is where the first number of y-axis is and if you add 94.5 the image will jump to the next number.
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.drawImage(
      imageObj,
      sx,
      sy,
      80,
      80,
      0,
      0,
      canvas.width,
      canvas.height
    );
  }

  function fixDuplication() {
    // Set an array for current indexes.
    const currentIndexes = canvasConfigList.map(canvasConfig => {
      return canvasConfig.currentFrame % NO_OF_NUM;
    });

    const uniqueIndexes = [];
    currentIndexes.forEach(index => {
      let uniqueIndex = index;
      while (uniqueIndexes.indexOf(uniqueIndex) !== -1) {
        uniqueIndex = Math.floor(Math.random() * NO_OF_NUM) + 1;
      }
      uniqueIndexes.push(uniqueIndex);
    });

    canvasConfigList.forEach((canvasConfig, index) => {
      const { canvas, context } = canvasConfig;
      const uniqueIndex = uniqueIndexes[index];
      draw(canvas, context, uniqueIndex);
    });
  }

  main();
})();
