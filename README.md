# BlockPing

BlockChain security scan app.

## Description

BlockPing is a collection of a few security tools that identify security risks
for individual Ethereum addresses (accounts and smart contracts). This is an early version experimenting
with the integration of real-time blockchain data feeds, while providing a framework for rapid integration
of additional tests. Any feedback is appreciated: j2abro@gmail.com.
Project on hold as I focus on other projects.

### Approval Scan:

This scans the blockchain for open approvals. This is similar to Etherscan's
checker (https://etherscan.io/tokenapprovalchecker) but incorporates an option to
automatically scan your address each day. Open appovals is the authority you approve
in dApps that enable a third-party to transfer tokens from your account.
Use the QR scan button ('Address') to scan an
address. Currently only one address can be scanned concurrently. Approvals are cancelled
by sendng another approval for and amount of zero. The scan output shows all approvals so you
can see all the approval transactions. Tapping on the 'Filter' button to elimate those approvals
that have been canceled - those that remain are the approvals that are currently at risk.

### Daily Approval Monitoring:

This performs the Approval Scan daily. Each day, 24 hours from the time that this is switched on.
This provides a notification for any

### Threat Scan:

This searches the real-time Forta (forta.org) threat feed, which is similar to a traditional security
intrusion detection system (IDS) in that it monitors the blockchain for adverse events. We filter those
events for any alerts that are relevant to the address you provide. This address can be any individual
address or a contract address. The top 20 DEX contract addresses are included in the 'Select Address' drop-down
menu. If you select the first item (QR Scanned Address) it will scan based on the address you scanned on the
'Scan' tab.

### Privacy:

BlockPing doesn't require a wallet connection and has no access to private keys. This only utilizes a public address,
which is not logged. No information is logged beyond basic usage statistics and app debugging information.


## Implementation

IoS app (React Native). Implements various APIs to get risk data and alerts about smart contracts and addresses.
 - Etherscan
 - Ethers
 - Web3.js
 - Infura

BlockPing on the app store: https://apps.apple.com/us/app/blockping/id1615147827

## Getting Started

### Dependencies
React Native: This app is built for IoS and has not yet been deployed to Android.

### Installing

Clone repo
Install dependencies
Deploy with XCode


## Example Deployment


## Version History

Version 0.1


## Acknowledgments

APIs
* [Covalent](https://www.covalenthq.com/docs/api/#/0/0/USD/1)

Inspiration
* [Etherscan Token Approvals](https://etherscan.io/tokenapprovalchecker)
