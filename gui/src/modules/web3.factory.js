import * as Web3 from 'web3';

const URI = "https://rinkeby.infura.io/v3/3ef6c9ca8b594324978351060558ba8f";

export const web3 = new Web3(new Web3.providers.HttpProvider(URI));
