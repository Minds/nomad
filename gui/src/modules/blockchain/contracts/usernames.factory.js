import { web3 } from '../../web3.factory';

const USERNAMES_CONTRACT_ADDRESS = '0xb87db38433d421d1de7f18ff67ae460925f4c608';

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