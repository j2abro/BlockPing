/**
    utils.js - General utility functions
 */
import CONSTANTS from '../utils/Constants'

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function pretty_print(json_data) {
    let pretty_text = JSON.stringify(json_data, null, 2);
    console.log(pretty_text);
}

export function trimString(str, len) {
    var trimmed = str.substring(0, len);
    return(trimmed)
}
