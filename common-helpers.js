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
    hexToRGB
};