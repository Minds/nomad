import ProfileService from "../profile/profile.service";
import { web3 } from "../web3.factory";

export default class PostService {

    profileService = new ProfileService;

    async getById(id, opts = {}) {
        let archive = new DatArchive(opts.uri);
        let raw = await archive.readFile(`/data/posts/${id}.json`);

        return JSON.parse(raw);
    }

    async validate(post) {
        try {
            let username = post.username;
            let profile = await this.profileService.getByUsername(username);

            let signature = post.signature;
            delete post.signature;

            let owner = await web3.eth.accounts.recover(JSON.stringify(post), signature);
            
            return owner.toLowerCase() == profile.address.toLowerCase();
        } catch (err) {
            console.log('validating err', err);
            return false;
        }
    }

}