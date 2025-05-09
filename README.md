# common-helpers

There are a handful of functions I often use in various projects, so I decided to start throwing them into one common helper module, mainly as a way for me to test out github and ES6 modules.  I will update this with more functions as time goes on.

## for npm

```json
"dependencies": {
    "common-helpers": "git+ssh://git@github.com:bastecklein/common-helpers.git#main"
}
```

## Usage

```javascript
// node
import commonHelpers from "common-helpers";

// browser
import commonHelpers from "./common-helpers.js";

const num = commonHelpers.randomIntFromInterval(1, 5);
// 3

const str = "I am so fat."
const newStr = commonHelpers.replaceAll(str, "fat", "thin");
// I am so thin.

const myGuid = commonHelpers.guid();
// 905a7e0c-1262-4839-b7b6-79d3af592aef

const arr = ["one", "two", "three"];
const rndItem = commonHelpers.randomArrayElement(arr);
// one

const path = "/drive/personal/pictures/cat.png";
const filename = commonHelpers.filenameFromPath(path);
// cat.png

const myEle = commonHelpers.createClassedElement("div", "adl-box", "This is a box with red text.", "#ff0000", function() { alert("clicked me!"); });
// Created a div with classname adl-box with the above content, red letters, and an onclick listener

const rgb = commonHelpers.hexToRGB("#ff0000");
// { r: 255, g: 0. b: 0 }

const hex = commonHelpers.rgbToHex(255, 0, 0);
// #ff0000

const rndHex = commonHelpers.randomHexColor();
// some random hex color, like #a3b3c2

const perHex = commonHelpers.getColorForPercentage(0.35);
// a hex color between red and green based on the percent
// you can also specify your own colors

// add: abbreviateNumber, annotateNumber, getTimeAgo, distBetweenPoints, chunkString, dataURLtoBlob, removeFromArray, hash, getColoredSVG, mergeAndColorSVGs, numberWithCommas, rebuildStandardObject, shuffleArray
```

That is the basic overview of how each function works, but I will add more detailed info below as I have time.