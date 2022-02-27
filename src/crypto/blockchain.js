/**
    blockchain.js - Crypto functions
 */
import Web3 from 'web3';
import axios from 'axios';
import NetInfo from "@react-native-community/netinfo";
import { sleep } from '../utils/Utils'
import CONSTANTS from '../utils/Constants'



var isConnected = true
NetInfo.fetch().then(state => {
  console.log("Connection type", state.type);
  isConnected = state.isConnected;
  console.log("Is connected?", state.isConnected);
});


// UTIL START
export const createAccount = () => {
    const web3 = new Web3('http://localhost:7545');
    const newWallet = web3.eth.accounts.wallet.create(1);
    const newAccount = newWallet[0];
    console.log(newAccount);
    yoyo = JSON.stringify(newAccount)
    return(yoyo);
}

function pretty_print(json_data) {
    var pretty_text = JSON.stringify(json_data, null, 2);
    console.log(pretty_text);
}

// UTIL END


const abiDecoder = require('abi-decoder');
// const Tx = require('ethereumjs-tx').Transaction;
// const ethers = require("ethers");

const testnet_url  = 'https://ropsten.infura.io/v3/62bfebbc85964c33b44e2491504153bc';
const mainnet_url  = 'https://mainnet.infura.io/v3/62bfebbc85964c33b44e2491504153bc';
const ganache_url  = 'http://localhost:8545';

const testnet_acct = '0xfbb61b8b98a59fbc4bd79c23212addbefaeb289f';
const ganache_acct = '0xad970F81567Bb975cA04A989845f4eeb4172faa2';
const blogMainnet_acct = '0x90e63c3d53E0Ea496845b7a03ec7548B70014A91';

url  = mainnet_url;
acct = testnet_acct;
const web3 = new Web3(url);



// maybe need to promisify
export function isWeb3Listening() {
    web3.eth.net.isListening().then(function(output) {
    	console.log('isListening:' + output);
    });
}





/*  =========================================================================
1. Get all Txs for Address
2. Search for any Tx with input field with 'approval' function: '0x095ea7b3'
3. For each approval:
4. 		- GET ABI (contract address (to))
5.      - Decode input
========================================================================= */
// API_URL = 'https://api.etherscan.io/api'
// ETHERSCAN_API_KEY = 'II6C1KJAWN43ETC7P63H2J78ER3C6AEDFY'


export function getTxsForAccount(user_account_number) {
    return new  Promise(function(resolve, reject) {
        // const request = axios.get(url)
        // request
        const url  = `${CONSTANTS.ETHERSCAN_API_URL}?module=account&action=txlist&address=${user_account_number}&startblock=0&endblock=99999999&page=1&offset=1000&sort=asc&apikey=${CONSTANTS.ETHERSCAN_API_KEY}`;
        axios.get(url)
            .then(result => {
                tx_count = 0;
                ap_count = 0;
                approvals = [];
                contract_and_input_all = []
                contract_and_input_all_objects = []

                txs = result.data.result;
                console.log('Get Account Data:', result.data.message);

                // Build list of 'Approvals' (from single request)
                for(tx_id in txs) {
                    // console.log('tx_id - - - - - :', tx_id);
                    tx_count += 1;
                    tx = txs[tx_id];
                    input = tx.input;
                    if(input != '' || input != '0x') {
                        appropvalMethodId = '0x095ea7b3' // also see: setApprovalForAll
                        if(input.startsWith(appropvalMethodId)) {
                            ap_count += 1
                            console.log('ACCT: ', ap_count);
                            txHash = tx.hash;
                            contractAddr = tx.to;

                            const tx_object = {
                                contract_name: '',
                                ap_count: ap_count,
                                tx_hash: txHash,
                                contract_addr: contractAddr,
                                input: input,
                                timestamp: tx.timeStamp,
                                func: '',
                                delegate_to: '',
                                amount: 777
                            };
                            contract_and_input_all_objects.push(tx_object)
                        }
                    }
                } // end of for(tx...)

                console.log('ACCT: TOTAL TX FOUND --------->', tx_count);
                console.log('ACCT: TOTAL AP FOUND --------->', ap_count);
                console.log('----------------------------------------')

                resolve(contract_and_input_all_objects)
            }) // end of .then()
            .catch(error => {
                return(error)
            })
        }); /////// end of promise
} // end func


var final_table = []
export async function getApprovalsForTxs(contract_and_input_all) {
    final_table = []
    for (let i = 0; i < contract_and_input_all.length; i++) {
        await sleep(300) // rate limit
        row = contract_and_input_all[i];

        contractAddr = row.contract_addr;
        ap_count = row.ap_count;
        tx_hash = row.tx_hash;
        input = row.input

        abi_url  = `${CONSTANTS.ETHERSCAN_API_URL}?module=contract&action=getabi&address=${contractAddr}&apikey=${CONSTANTS.ETHERSCAN_API_KEY}`
        request = await axios.get(abi_url)
            .then(result => {
                abi = result.data.result;
                contractABI = JSON.parse(abi);
                abiDecoder.addABI(contractABI);
                const decodedData = abiDecoder.decodeMethod(input);

                row.func = decodedData.name;
                row.delegate_to = decodedData.params[0].value;
                row.amount = decodedData.params[1].value

                console.log('DETAIL: ', ap_count, result.data.message);
                // console.log(ap_count + ' TX: ' + tx_hash)
                // console.log(decodedData.name + ': ' + decodedData.params[0].value + ' ---> ' + decodedData.params[1].value);
                final_table.push(row)
                return('j2222222222345')
            })

            .catch(error => {
                console.error('delay error:', error)
            });
    } // end of for loop

    await sleep(2000)
    console.log('-------------------------------------------- END LOOP    ---- DONE DONE DONE')
    // console.log('22222222222222222222222222222222222222222222222222222222 bbb`');
    // pretty_print(final_table)
    // console.log('22222222222222222222222222222222222222222222222222222222 bbb`');

    //////////////getContractName(final_table)

    return('yoboom1111')
}

//////////////////////////////


/*
export function doSomethingAsync(row) {
     return new Promise((resolve) => {
         contractAddr = row.contract_addr;
         ap_count = row.ap_count;
         tx_hash = row.tx_hash;
         input = row.input

         abi_url  = `${CONSTANTS.ETHERSCAN_API_URL}?module=contract&action=getabi&address=${contractAddr}&apikey=${CONSTANTS.ETHERSCAN_API_KEY}`
         request = axios.get(abi_url) //request = await axios.get(abi_url)
             .then(result => {
                 abi = result.data.result;
                 contractABI = JSON.parse(abi);
                 abiDecoder.addABI(contractABI);
                 const decodedData = abiDecoder.decodeMethod(input);

                 row.func = decodedData.name;
                 row.delegate_to = decodedData.params[0].value;
                 row.amount = decodedData.params[1].value

                 console.log('======>', result.data.message, ap_count);
                 // console.log(ap_count + ' TX: ' + tx_hash)
                 // console.log(decodedData.name + ': ' + decodedData.params[0].value + ' ---> ' + decodedData.params[1].value);
                 resolve(result.data);
             })
             .catch(error => {
                 console.error('delay error:', error)
             });
     });
   }
   */


    function sleeper(ms) {
      return function(x) {
        return new Promise(resolve => setTimeout(() => resolve(x), ms));
      };
    }

   // export  function getApprovalsForTxs222(contract_and_input_all) {
   //     return new Promise((resolve) => {
   //         const promises = [];
   //         // for (let i = 0; i < contract_and_input_all.length; i++) {
   //         for (let i = 0; i < 3; i++) {
   //             // await sleep(300) // rate limit
   //             row = contract_and_input_all[i];
   //             promises.push(doSomethingAsync(row));
   //         }
   //         Promise.all(promises)
   //             .then((results) => {
   //                 console.log('=====================');
   //                 console.log('Promises', results.length);
   //                 console.log('=====================');
   //                 return(results);
   //             })
   //             .catch((e) => {
   //                 console.log("OOOOPS --->", e);
   //             });
   //     })
   //  }
