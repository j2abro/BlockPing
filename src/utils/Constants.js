/**
    Constanst.js - Global constants
 */
 let millisecondsInHour = 60 * 60 * 24 * 1000;
 let millisecondsInTenSeconds = 10 * 1000;

export default {
  ETHERSCAN_API_URL: 'https://api.etherscan.io/api',
  ETHERSCAN_API_KEY: 'II6C1KJAWN43ETC7P63H2J78ER3C6AEDFY',
  MAX_INT: 115792089237316195423570985008687907853269984665640564039457584007913129639935,
  USER_ADDRESS_KEY: '@user_address_key',
  TX_COUNT_KEY: '@tx_count_key',
  AP_COUNT_KEY: '@ap_count_key',
  MONITOR_SHOULD_RUN_KEY: '@monitor_should_run_key',
  MONITOR_INTERVAL: millisecondsInTenSeconds,
  TRUE: 'true',
  FALSE: 'false',
  COLOR: {
      SAND:       '#C7CFC7',
      BLUE_LIGHT: '#899AAA',
      BLUE_MED:   '#70859F',
      RED:        '#DB1C05',
      BLUE_DARK:  '#47607F',
  },
};


// 1,047,652,886,655,223,395 = 1.04 e18
