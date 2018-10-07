import { web3 } from '../web3.factory';
import { UsernamesContract } from '../blockchain/contracts/usernames.factory';
import AuthService from '../auth/auth.service';

export default class NewsfeedService {

    static _;

    auth = AuthService.build();

    feed = [];

    constructor() {
    }

     // Grab who we are following
     async getFollowing() {
        let archive = new DatArchive(this.auth.datUri);
        let rawJSON = await archive.readFile('/data/following.json');
        return JSON.parse(rawJSON);
    }

    async loadFeed() {

        let following = await this.getFollowing();

        following.push({
            username: this.auth.username,
            uri: this.auth.datUri
        });

        let archive, stats;
        this.feed = [];

        for (let profile of following) {
            archive = new DatArchive(profile.uri);
            stats = await archive.readdir('/data/posts', { stat: true })    
            
            stats.reverse();

            for (let stat of stats) {
                let id = stat.name.replace('.json', '');
                this.feed.push({ id, uri: profile.uri});
            }
        }

        this.onFeedUpdated(this.feed);
    }

    prependToFeed(post) {
        this.feed.unshift(post);
        this.onFeedUpdated(this.feed);
    }

    static build() {
        return this._ || (this._ = new NewsfeedService);
    }

}