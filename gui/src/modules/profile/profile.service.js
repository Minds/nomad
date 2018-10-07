import { UsernamesContract } from '../blockchain/contracts/usernames.factory';
import { web3 } from '../web3.factory';

export default class ProfileService {

    async getByUsername(username) {

        // grab from web3
        let datUriHex = await UsernamesContract.methods.getUsernameDatUri(web3.utils.toHex(username)).call();
        let datUri = web3.utils.toUtf8(datUriHex);

        let archive = new DatArchive(datUri);

        let profileRaw = await archive.readFile('/data/profile.json');
        let profile = JSON.parse(profileRaw);

        profile.uri = datUri;

        return profile;
    }

}