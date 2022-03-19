/**
    blockchain.js - Crypto functions
 */
import Web3 from 'web3';
import axios from 'axios';
import NetInfo from "@react-native-community/netinfo";
import { sleep, getUtcDateTime } from '../utils/Utils'
import CONSTANTS from '../utils/Constants'



var isConnected = true
NetInfo.fetch().then(state => {
  console.log("Connection type", state.type);
  isConnected = state.isConnected;
  console.log("Is connected?", state.isConnected);
});




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
        const url  = `${CONSTANTS.ETHERSCAN_API_URL}?module=account&action=txlist&address=${user_account_number}&startblock=0&endblock=99999999&page=1&offset=1000&sort=asc&apikey=${CONSTANTS.ETHERSCAN_API_KEY}`;
        axios.get(url)
            .then(result => {
                let return_status = result.data.message;
                // if(return_status == 'NOTOK') {
                //   console.log('ERROR - return:', return_status);
                //   return;
                // }
                console.log('RESULT', result);
                tx_count = 0;
                ap_count = 0;
                approvals = [];
                contract_and_input_all = []
                contract_and_input_all_objects = []

                txs = result.data.result;
                console.log('Get Account Data:', return_status);

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
                            // pretty_print(tx)
                            txHash = tx.hash;
                            contractAddr = tx.to;

                            //1047652886655223395
                            //1,047,652,886,655,223,395 = 18  or 10e-18

                            let utcdatetime = getUtcDateTime();

                            const tx_object = {
                                owner_addr: user_account_number,
                                contract_name: '',
                                ap_count: ap_count,
                                tx_hash: txHash,
                                contract_addr: contractAddr,
                                input: input,
                                timestamp: tx.timeStamp,
                                utcdatetime: utcdatetime,
                                func: '',
                                delegate_to: '',
                                amount: 777,
                                amount_display: ''
                            };
                            contract_and_input_all_objects.push(tx_object)
                        }
                    }
                } // end of for(tx...)

                const return_object  = {
                    tx_object: contract_and_input_all_objects,
                    tx_count: tx_count,
                    ap_count: ap_count
                  }
                console.log('ACCT: TOTAL TX FOUND --------->', tx_count);
                console.log('ACCT: TOTAL AP FOUND --------->', ap_count);
                console.log('----------------------------------------')
                // resolve(contract_and_input_all_objects)
                resolve(return_object)
            }) // end of .then()
            .catch(error => {
                reject(error)
            })
        }); /////// end of promise
} // end func


/*
    getApprovalsForTxs()
        - contract_and_input_all is a passed by reference object.
        - Updates to each row are reflected in the table (UI) when updated.
*/
export async function getApprovalsForTxs(contract_and_input_all) {
    for (let i = 0; i < contract_and_input_all.length; i++) {
        await sleep(300) // rate limit
        row = contract_and_input_all[i];

        owner_addr = row.owner_addr;
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
                // console.log('pppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp 111')
                // const target1_addr = '0xe2993904204ab04e9579a5bf0a847fc6dca1a830'; // ORIG 7 items

                // addrTHIS = '0x5e3Ef299fDDf15eAa0432E6e66473ace8c13D908';
                // console.log('contractAddr', contractAddr);
                var contract888 = new web3.eth.Contract(contractABI, contractAddr);
                // contract888.methods.decimals().call() // <------- TEST (results: all were 18)
                contract888.methods.allowance(owner_addr, contractAddr).call()
                .then(result => {
                    console.log('-------------------------------------------> AllowanceDDDDD  = ', result);
                })
                .catch(error => {
                    console.error('-------------------------------------------> Allowance ERROR:', error)
                })

                // Print all function names with 'allowance'
                for(i in contractABI) {
                    name = contractABI[i].name //).toLowerCase()
                    // console.log('NAME', name)
                    if(name !== undefined) {
                        if((name.toLowerCase()).includes('decimal')) { //'allowance'
                            console.log('BOOOM ------', name)
                        }
                    }
                }
////
                // let num = 	1047652886655223395;
                // console.log('one', num);
                // let short = num/Math.pow(10, 18); //  1000000000000000000;
                // console.log('two', short);
                // let short2 = short.toFixed(4)
                // console.log('three', short2);
////


                row.func = decodedData.name;
                row.delegate_to = decodedData.params[0].value;
                let amount = decodedData.params[1].value;
                let amount_display = '';

                if(amount == CONSTANTS.MAX_INT) {
                  amount_display = 'Unlmtd';
                } else if (amount > 0) {
                  // Convert wei to eth so move left 18 decimal places
                  converted_amount = amount/Math.pow(10, 18);
                  amount_display = converted_amount.toFixed(4);
                } else {
                  amount_display = amount;
                }
                row.amount = amount;
                row.amount_display = amount_display;

                console.log('DETAIL: ', ap_count, amount);
                return('j2222222222345')
            })

            .catch(error => {
                console.error('delay error:', error)
            });
    } // end of for loop


    console.log('---- END LOOP ---- DONE DONE DONE')
    await sleep(2000)
    // pretty_print(final_table)

    //////////////getContractName(final_table)

    return('yoboom1111')
}

//////////////////////////////
var final_table222 = []
export async function getContractName(contract_and_input_all) {
    final_table222 = []
    for (let i = 0; i < contract_and_input_all.length; i++) {
        await sleep(300)
        row = contract_and_input_all[i];
        contractAddr = row.contract_addr;
        ap_count = row.ap_count;
        tx_hash = row.tx_hash;
        input = row.input

        contract_source_url  = `${CONSTANTS.ETHERSCAN_API_URL}?module=contract&action=getsourcecode&address=${contractAddr}&apikey=${CONSTANTS.ETHERSCAN_API_KEY}`
        const request = axios.get(contract_source_url)
        request
            .then(result => {
                contract = result.data.result;
                // console.log('33333333333333333333333333333333333333333333333333333333 aaa');
                // pretty_print(contract)
                // console.log('33333333333333333333333333333333333333333333333333333333 bbb');
                console.lo
                name = contract[0].ContractName;
                // pretty_print(contract);
                // console.log('---', result.data.message, ap_count);
                console.log(ap_count, 'Contract name: ', name);
                row.contract_name = name; // add name to object so we have in table at end

                final_table222.push(row)
            }) // end of .then()
            .catch(error => {
                console.error('ccccccc error:', error)
            })
    } // end of for loop
    await sleep(3000)

    // console.log('33333333333333333333333333333333333333333333333333333333 aaa');
    // console.log(final_table222)
    // console.log('33333333333333333333333333333333333333333333333333333333 bbb');

    console.log('-------------------------------------------- END  LOOP 2222')
    return('yoboom2222')
}

export function filterSettledApprovals(tableDataFull) {
    filtered = []
    for(let orig of tableDataFull) {
        console.log('ORIG');
        console.log(orig.tx_hash);
        if  (orig.amount > 0 ){
            console.log('ADD')
            filtered.push(orig)
        } else {
            console.log('ELSE')
            filtered = filtered.filter((short, index) => {
                if(short.delegate_to == orig.delegate_to && short.contract_addr == orig.contract_addr) {
                    console.log('----> BINGO')
                    return(false);
                }
                return(true);
            })
        }
    }
    console.log('FILTERED ');
    for(row of filtered) {
        console.log(row.tx_hash);
    }
    return(filtered)
}


const unlimitedAllowance = "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
export function anotherApproach(user_account_number) {
    return new  Promise(function(resolve, reject) {
        const url  = `${CONSTANTS.ETHERSCAN_API_URL}?module=account&action=txlist&address=${user_account_number}&startblock=0&endblock=99999999&page=1&offset=1000&sort=asc&apikey=${CONSTANTS.ETHERSCAN_API_KEY}`;
        axios.get(url)
            .then(result => {

        let data = 'STUFF FROM GET: await request.get(query);'
        let approveTransactions = [];
        // let dataObj = JSON.parse(data.text).result;
        let dataObj = result.data.result;

            for(let tx of dataObj) {
                if(tx.input.includes('0x095ea7b3')) {
                    console.log('======================================================================================');
                    let approveObj = {};

                    approveObj.contract = web3.utils.toChecksumAddress(tx.to);
                    approveObj.approved = web3.utils.toChecksumAddress("0x" + tx.input.substring(34, 74));
                    console.log('approved', approveObj.approved)
                    let allowance = tx.input.substring(74);
                    if(allowance.includes(unlimitedAllowance)) {
                        approveObj.allowance = "unlimited";
                    } else {
                        approveObj.allowance = "some";
                        approveObj.allowanceUnEdited = allowance;
                    }

                    if(parseInt(allowance, 16) !== 0) {
                        approveTransactions.push(approveObj);
                    } else {
                        // Remove all previous additions of this approval transaction as it is now cleared up
                        approveTransactions = approveTransactions.filter((val, index) => {
                            console.log('======================================================================', index);
                            console.log('val.approved        ', val.approved);
                            console.log('approveObj.approved ', approveObj.approved);
                            console.log('------------');
                            console.log('val.contract        ', val.contract);
                            return !(val.approved === approveObj.approved && val.contract === val.contract);
                        });
                    }
                }
            }
        console.log('a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2');
        // console.log(approveTransactions);
        for(i in approveTransactions) {
            console.log('---------', i)
            pretty_print(approveTransactions[i])
        }
    });
});
}

otherApproachResults = {
  "contract": "0xf4d2888d29D722226FafA5d9B24F9164c092421E",
  "approved": "0xBcD7254A1D759EFA08eC7c3291B2E85c5dCC12ce",
  "allowance": "unlimited"
},
{
  "contract": "0x3b484b82567a09e2588A13D54D032153f0c0aEe0",
  "approved": "0xEDd27C961CE6f79afC16Fd287d934eE31a90D7D1",
  "allowance": "unlimited"
},
{
  "contract": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "approved": "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F",
  "allowance": "unlimited"
},
{
  "contract": "0xa6dD98031551C23bb4A2fBE2C4d524e8f737c6f7",
  "approved": "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F",
  "allowance": "unlimited"
},
{
  "contract": "0x0Bd2B9116f1e2f88E4FD4Cc0fcE3E15178de8Df5",
  "approved": "0xc92B80Ffd48A944Be210961d0daD45D8eFcC992c",
  "allowance": "some",
  "allowanceUnEdited": "0000000000000000000000000000000000000000000000000e8a02bfecff4663"
},
{
  "contract": "0xf4d2888d29D722226FafA5d9B24F9164c092421E",
  "approved": "0x881D40237659C251811CEC9c364ef91dC08D300C",
  "allowance": "unlimited"
},
{
  "contract": "0x1E4EDE388cbc9F4b5c79681B7f94d36a11ABEBC9",
  "approved": "0xc8C3CC5be962b6D281E4a53DBcCe1359F76a1B85",
  "allowance": "some",
  "allowanceUnEdited": "00000000000000000000000000000000000000000052b7d2dcc80cd2e4000000"
}
