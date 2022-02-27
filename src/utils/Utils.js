/**
    utils.js - General utility functions
 */
import CONSTANTS from '../utils/Constants'

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
