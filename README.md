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

const num = commonHelpers.randomIntFromInverval(1, 5);

const str = "I am so fat."
const newStr = commonHelpers.replaceAll(str, "fat", "thin");

const myGuid = commonHelpers.guid();

const arr = ["one", "two", "three"];
const rndItem = commonHelpers.randomArrayElement(arr);
```