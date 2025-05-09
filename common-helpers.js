/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * @param {number} min - The minimum value
 * @param {number} max - The maximum value
 */
export function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * For browsers that do not support str.replaceAll function, replaces all occurrences of a substring in a string
 * @param {string} str - The string to search in
 * @param {string} find - The substring to search for
 * @param {string} replace - The substring to replace find with
 * @returns - The string with all occurrences of find replaced with replace
 */
export function replaceAll(str, find, replace) {
    if(!str) {
        return "";
    }

    if(str.indexOf(find) < 0) {
        return str;
    }

    return str.replace(new RegExp(escapeRegExp(find), "g"), replace);
}

function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|[]\/\\])/g, "\\$1");
}

/**
 * Generates a GUID
 * @returns - A GUID
 */
export function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
}

/**
 * Returns a random element from an array
 * @param {Array} arr - The array to get a random element from
 * @returns - A random element from the array
*/
export function randomArrayElement(arr) {

    if(!arr || arr.length === 0) {
        return null;
    }

    return arr[randomIntFromInterval(0, arr.length - 1)];
}

/**
 * Returns the file (or directory) name from a path, platform agnostic
 * @param {string} path - The path to get the filename from
 * @returns - The filename
*/
export function filenameFromPath(path) {
    let sep = "/";

    if(path.indexOf(sep) == -1) {
        sep = "\\";
    }

    if(path.indexOf(sep) == -1) {
        return path;
    }

    const parts = path.split(sep);

    return parts[parts.length - 1];
}


/**
 * Creates an element with optional classes, content, color, and callback
 * @param {string} tag - The tag name of the element
 * @param {string} classes - The class name to add to the element
 * @param {string} content - The content of the element
 * @param {string} color - The color of the element
 * @param {function} callback - The callback function for the element
 * @returns - The created element
 * */
export function createClassedElement(tag, classes, content, color, callback) {
    if(!tag) {
        return null;
    }

    const ele = document.createElement(tag);

    if(classes) {
        ele.className = classes;
    }

    if(content) {
        ele.innerHTML = content;
    }

    if(color) {
        ele.style.color = color;
    }

    if(callback) {
        ele.onclick = callback;
    }

    return ele;
}

/**
 * Returns a color based on a percentage
 * @param {number} pct - The percentage to get the color for (between 0 and 1)
 * @param {array} percentColors - The colors to use for the percentage (optional)
 * @returns {string} - The hex color for the percentage
 */
export function getColorForPercentage(pct, percentColors) {
    if(!percentColors) {
        percentColors = [
            { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
            { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
            { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } } 
        ];
    }

    let iVal = 2;

    for (let i = 1; i < percentColors.length - 1; i++) {
        if (pct < percentColors[i].pct) {
            iVal = i;
            break;
        }
    }

    let lower = percentColors[iVal - 1];
    let upper = percentColors[iVal];
    let range = upper.pct - lower.pct;
    let rangePct = (pct - lower.pct) / range;
    let pctLower = 1 - rangePct;
    let pctUpper = rangePct;

    let color = {
        r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
        g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
        b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    };

    return rgbToHex(color.r, color.g, color.b);
}

/**
 * Converts an RGB color to a hex color
 * @param {number} r - The red value
 * @param {number} g - The green value
 * @param {number} b - The blue value
 * @returns {string} - The hex color
 */

export function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function componentToHex(c) {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

/**
 * Returns a random hex color
 * @param {number} maxLightness - The maximum lightness value
 * @param {number} minLightness - The minimum lightness value
 * @returns {string} - The random hex color
 */
export function randomHexColor(maxLightness,minLightness) {
    if(!maxLightness) {
        maxLightness = 255;
    }

    if(!minLightness) {
        minLightness = 0;
    }

    let r = randomIntFromInterval(minLightness,maxLightness);
    let g = randomIntFromInterval(minLightness,maxLightness);
    let b = randomIntFromInterval(minLightness,maxLightness);

    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

/**
 * Converts a hex color to an RGB color
 * @param {string} hex - The hex color
 * @returns {object} - The RGB color
 */
export function hexToRGB(hex) {

    let result;

    if (hex.length == 6 || hex.length == 7) {
        result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            a: 255,
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    if (hex.length == 8 || hex.length == 9) {
        result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            a: parseInt(result[1], 16),
            r: parseInt(result[2], 16),
            g: parseInt(result[3], 16),
            b: parseInt(result[4], 16)
        } : null;
    }

    return {
        a: 255,
        r: 0,
        g: 0,
        b: 0
    };
}

/**
 * Abbreviates a number
 * @param {number} number - The number to abbreviate
 * @param {number} maxPlaces - The maximum number of decimal places
 * @param {number} forcePlaces - The number of decimal places to
 * @param {string} forceLetter - The letter to force the abbreviation to
 * @returns {string} - The abbreviated number
 * */
export function abbreviateNumber(number, maxPlaces, forcePlaces, forceLetter) {
    number = Number(number);
    forceLetter = forceLetter || false;

    if(forceLetter !== false) {
        return annotateNumber(number, maxPlaces, forcePlaces, forceLetter);
    }

    let abbr;

    if(number >= 1e18) {
        abbr = "Q";
    }
    else if(number >= 1e15) {
        abbr = "q";
    }
    else if(number >= 1e12) {
        abbr = "T";
    }
    else if(number >= 1e9) {
        abbr = "B";
    }
    else if(number >= 1e6) {
        abbr = "M";
    }
    else if(number >= 1e3) {
        abbr = "K";
    }
    else {
        abbr = "";
    }

    return annotateNumber(number, maxPlaces, forcePlaces, abbr);
}

/**
 * Annotates a number
 * @param {number} number - The number to annotate
 * @param {number} maxPlaces - The maximum number of decimal places
 * @param {number} forcePlaces - The number of decimal places to
 * @param {string} abbr - The abbreviation to use
 * @returns {string} - The annotated number
 * */
export function annotateNumber(number, maxPlaces, forcePlaces, abbr) {
    // set places to false to not round
    let rounded = 0;

    switch(abbr) {
    case "Q":
        rounded = number / 1e18;
        break;
    case "q":
        rounded = number / 1e15;
        break;
    case "T":
        rounded = number / 1e12;
        break;
    case "B":
        rounded = number / 1e9;
        break;
    case "M":
        rounded = number / 1e6;
        break;
    case "K":
        rounded = number / 1e3;
        break;
    case "":
        rounded = number;
        break;
    }

    if(maxPlaces !== false) {
        let test = new RegExp("\\.\\d{" + (maxPlaces + 1) + ",}$");

        if(test.test(("" + rounded))) {
            rounded = rounded.toFixed(maxPlaces);
        }
    }

    if(forcePlaces !== false) {
        rounded = Number(rounded).toFixed(forcePlaces);
    }

    return rounded + abbr;
}

/**
 * Returns a human-readable time ago string
 * @param {number} time - The time to convert to a time ago string
 * @returns {string} - The time ago string
 */
export function getTimeAgo(time) {
    const now = new Date();
    const diff = now - new Date(time);

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
        return years + " year" + (years > 1 ? "s" : "") + " ago";
    }

    if (months > 0) {
        return months + " month" + (months > 1 ? "s" : "") + " ago";
    }

    if (weeks > 0) {
        return weeks + " week" + (weeks > 1 ? "s" : "") + " ago";
    }

    if (days > 0) {
        return days + " day" + (days > 1 ? "s" : "") + " ago";
    }

    if (hours > 0) {
        return hours + " hour" + (hours > 1 ? "s" : "") + " ago";
    }

    if (minutes > 0) {
        return minutes + " minute" + (minutes > 1 ? "s" : "") + " ago";
    }

    if (seconds > 0) {
        return seconds + " second" + (seconds > 1 ? "s" : "") + " ago";
    }

    return "just now";
}

/**
 * Returns the distance between two points
 * @param {number} x1 - The x-coordinate of the first point
 * @param {number} y1 - The y-coordinate of the first point
 * @param {number} x2 - The x-coordinate of the second point
 * @param {number} y2 - The y-coordinate of the second point
 * @returns {number} - The distance between the two points
 */
export function distBetweenPoints(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

/**
 * Splits a string into chunks of a specified length
 * @param {string} str - The string to split
 * @param {number} length - The length of each chunk
 * @returns {Array} - An array of chunks
 */
export function chunkString(str, length) {
    return str.match(new RegExp(".{1," + length + "}", "g"));
}

/**
 * Converts a data URL to a Blob
 * @param {string} dataurl - The data URL to convert
 * @returns {Blob} - The Blob
 */
export function dataURLtoBlob(dataurl) {
    let arr = dataurl.split(","), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

/**
 * Removes a value from an array
 * @param {Array} arr - The array to remove the value from
 * @param {any} value - The value to remove
 * @returns {Array} - The array with the value removed
 */
export function removeFromArray(arr, value) {
    const index = arr.indexOf(value);

    if (index > -1) {
        arr.splice(index, 1);
    }

    return arr;
}

/**
 * Returns a hash of a string
 * @param {string} str - The string to hash
 * @returns {number} - The hash of the string
 */
export function hash(str) {
    if(Array.isArray(str)) {
        const og = str;
        str = "";

        for(let i = 0; i < og.length; i++) {
            str += og[i];
        }
    }

    let hash = 0, i, chr;

    if (str.length === 0) return hash;

    for (i = 0; i < str.length; i++) {
        chr   = str.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0;
    }

    return hash;
}

/**
 * Returns a colored SVG image
 * @param {string} src - The source of the SVG image
 * @param {Array} colorReplacements - The colors to replace in the SVG image
 * @returns {Promise} - The colored SVG image
 */
export function getColoredSVG(src, colorReplacements = []) {

    

    return new Promise(function(resolve, reject) {
        if(src.toLowerCase().startsWith("<?xml")) {
            buildImageFromSVGString(src, colorReplacements, resolve);
            return;
        }

        const xhr = new XMLHttpRequest();
        xhr.open("GET", src, true);
        xhr.responseType = "document";
        xhr.onload = function() {
            const svgAsXml = xhr.responseXML;
            let svgAsString = new XMLSerializer().serializeToString(svgAsXml);

            buildImageFromSVGString(svgAsString, colorReplacements, resolve);
        };
        xhr.onerror = function() {
            reject();
        };
        xhr.send();
    });
}

function buildImageFromSVGString(svgAsString, colorReplacements, resolve) {
    for(const replacement of colorReplacements) {
        svgAsString = replaceAll(svgAsString, "fill:" + replacement.from + ";", "fill:" + replacement.to + ";");
        svgAsString = replaceAll(svgAsString, "stroke:" + replacement.from + ";", "stroke:" + replacement.to + ";");
    }

    const svgBlob = new Blob([svgAsString], {type: "image/svg+xml"});
    const url = window.URL.createObjectURL(svgBlob);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = function() {
        window.URL.revokeObjectURL(svgBlob);
        resolve(img);
    };
    img.src = url;
}

/**
 * Merges and colors SVG images
 * @param {Array} instructions - The instructions for the SVG images
 * @param {string} imgType - The type of image to return
 * @param {number} imgQuality - The quality of the image
 * @returns {Promise} - The merged and colored SVG images
 */
export async function mergeAndColorSVGs(instructions, imgType = "image/png", imgQuality = 1) {
    const allImages = [];

    while(instructions.length > 0) {
        const instruction = instructions.shift();
        const colorReplacements = instruction.colors;
        const img = await getColoredSVG(instruction.src, colorReplacements);
        allImages.push(img);
    }

    if(allImages.length === 0) {
        return null;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = allImages[0].width;
    canvas.height = allImages[0].height;

    allImages.forEach(function(img) {
        ctx.drawImage(img, 0, 0);
    });

    return canvas.toDataURL(imgType, imgQuality);
}

/**
 * Formats a number with commas
 * @param {number} x - The number to format
 * @returns {string} - The formatted number
 */
export function numberWithCommas(x) {
    if(!x) {
        x = 0;
    }

    x = parseFloat(x);

    let formattedNumber = x.toFixed(2).replace(/[.,]00$/, "");
    return formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Rebuilds a standard object
 * @param {object} obj - The object to rebuild
 * @param {object} type - The type of object to rebuild
 * @returns {object} - The rebuilt object
 */
export function rebuildStandardObject(obj, type) {
    const newOb = new type();

    for(const key in newOb) {
        if(obj[key] !== undefined) {
            newOb[key] = obj[key];
        }
    }

    return newOb;
}

/**
 * Shuffles an array
 * @param {Array} array - The array to shuffle
 * @returns {Array} - The shuffled array
 */
export function shuffleArray(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

export default {
    randomIntFromInterval,
    replaceAll,
    guid,
    randomArrayElement,
    filenameFromPath,
    createClassedElement,
    getColorForPercentage,
    rgbToHex,
    randomHexColor,
    hexToRGB,
    abbreviateNumber,
    annotateNumber,
    getTimeAgo,
    distBetweenPoints,
    chunkString,
    dataURLtoBlob,
    removeFromArray,
    hash,
    getColoredSVG,
    mergeAndColorSVGs,
    numberWithCommas,
    rebuildStandardObject,
    shuffleArray
};