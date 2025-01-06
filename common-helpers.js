/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * @param {number} min - The minimum value
 * @param {number} max - The maximum value
 */
export function randomIntFromInverval(min, max) {
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

    return arr[randomIntFromInverval(0, arr.length - 1)];
}

export default {
    randomIntFromInverval,
    replaceAll,
    guid,
    randomArrayElement
};