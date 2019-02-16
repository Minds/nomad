import { web3 } from '../web3.factory';
import { UsernamesContract, USERNAMES_CONTRACT_ADDRESS } from '../blockchain/contracts/usernames.factory';

export default class AuthService {

    static _;

    // DAT URI to fork from
    baseDatUri = '0a69de666238867a69f54acc8ec5dc90422f85772dc64bcb4645042886fc1a5a';
    
    // Current DAT URI
    datUri;
    datArchive;

    privateKey;
    username;

    constructor() {
        this.datUri = window.location.host;
        this.datArchive = new DatArchive(this.datUri);
        this.privateKey = window.sessionStorage.getItem('private-key');
        this.username = window.sessionStorage.getItem('username');
    }

    setPrivateKey(key) {
        this.privateKey = key;
        window.sessionStorage.setItem('private-key', key);
    }

    async fork() {
        let archive = await DatArchive.fork(this.baseDatUri, { prompt: false });
        return archive.url.replace('dat://', '');
    }

    async register(username) {
        let response = await web3.eth.accounts.privateKeyToAccount(this.privateKey);

        let address = response.address;

        console.log(response, address);
        
        try {
            let abi = await UsernamesContract.methods.register(
                        web3.utils.toHex(username),
                        address,
                        web3.utils.toHex(this.datUri)
                    ).encodeABI();
          
            let signedTx = await web3.eth.accounts.signTransaction({
                from: address,
                to: USERNAMES_CONTRACT_ADDRESS,
                gas: 440000,
                data: abi,
            }, this.privateKey);      

            console.log(signedTx);

            let tx = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            console.log(tx);

            this.username = username;
            // we have the tx, now save this to our profile.json

            let profile = {
                username: username,
                address: address,
                uri: this.datUri,
            };

            this.datArchive.writeFile('/data/profile.json', JSON.stringify(profile));

            return profile; // TODO: forward to their new fork.
        } catch (err) {
            console.log('err', err);
        }
    }

    async login(username) {
        let response = await web3.eth.accounts.privateKeyToAccount(this.privateKey);
        let address = response.address;

        try {
            let owner = await UsernamesContract.methods.getUsernameOwner(web3.utils.toHex(username)).call();
            if (owner.toLowerCase() !== address.toLowerCase()) {
                throw "Owner of this username doesn't match your ethereum address";
            }

            let datUri = await UsernamesContract.methods.getUsernameDatUri(web3.utils.toHex(username)).call();
            this.datUri = datUri; // TODO: redirect to own dat uri site
           
            this.username = username;
            window.sessionStorage.setItem('username', this.username);
        } catch (err) {
            console.log('err', err);
            throw err;
        }

        return true;
    }

    async getDatUriByUsername(username) {
        let result = await UsernamesContract.methods.getUsernameDatUri(web3.utils.toHex(username)).call();
        if (result)
            return web3.utils.toUtf8(result);
        return null;
    }

    async sign(object) {
        //let address = await web3.eth.personal.importRawKey(this.privateKey, '');
        //await web3.eth.personal.unlockAccount(address, ''); //unlock

        let signed = await web3.eth.accounts.sign(JSON.stringify(object), this.privateKey);
        return signed.signature;
    }

    logout() {
        window.sessionStorage.clear();
        this.username = '';
        this.privateKey = null;
    }

    static build() {
        return this._ || (this._ = new AuthService);
    }

}