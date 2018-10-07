Nomad = {
    version: '0.1',

    delegate: null, // If set, all XHR requests will be made to the delegate
                    // This is used in order to make register usernames for free
    address: '',


    trustedDatUris: [

    ],  // these are DAT Uris which can be trusted to provide updates
        // any DAT uri can do this, but safety needs to be taken into account

    checkForUpdates: () => {
        this.trustedDatUris;
    },

    register: (username) => {
        //this.usernames.register(username, add)
    },

    /**
     * Create a post
     * @param string message
     * @return Post
     */
    createPost: (message) => {
        const id = Date.now();
        let post = {
            message: message,
            timestamp: Date.now(),
        };

        // Generate a signature for the post object
        // Note: private key must be unlocked at this point
        web3.eth.sign(this.address, post)
            .then(signature => {
                post.signature = signature;
            });
        archive.writeFile(`/data/posts/${id}.json`, JSON.stringify(post), 'utf8');
    },

    getFeed: (username) => {
        // Read web3 to get DAT uri from username
        usernames.getUsernameDatUri(username);

        // grab all posts that this user has made
        archive.readdir('/data/posts', {stat: true})
            .then(stats => {
                console.log(stats);
            });
    },


    follow: (username) => {

    },

    unfollow: (username) => {

    },

    getFollowing: () => {

    },

}

window.Nomad = Nomad;