import { web3 } from '../../web3.factory';

export const USERNAMES_CONTRACT_ADDRESS = '0x0093b9e1fcd792b9876a2281af876de50595d24c';

const abi = [
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "usernamesMap",
      "outputs": [
        {
          "name": "owner",
          "type": "address"
        },
        {
          "name": "delegate",
          "type": "address"
        },
        {
          "name": "username",
          "type": "bytes32"
        },
        {
          "name": "datUri",
          "type": "bytes"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_username",
          "type": "bytes32"
        },
        {
          "name": "owner",
          "type": "address"
        },
        {
          "name": "datUri",
          "type": "bytes"
        }
      ],
      "name": "register",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_username",
          "type": "bytes32"
        }
      ],
      "name": "getUsernameOwner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_username",
          "type": "bytes32"
        }
      ],
      "name": "getUsernameDatUri",
      "outputs": [
        {
          "name": "",
          "type": "bytes"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_username",
          "type": "bytes32"
        }
      ],
      "name": "remove",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

export const UsernamesContract = new web3.eth.Contract(abi, USERNAMES_CONTRACT_ADDRESS);