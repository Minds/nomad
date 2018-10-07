import * as Web3 from 'web3';

const URI = "http://localhost:9545";

export const web3 = new Web3(new Web3.providers.HttpProvider(URI));
