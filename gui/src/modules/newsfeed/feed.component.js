import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../auth/auth.service';
import Post from '../posts/post.component';
import ProfileService from '../profile/profile.service';

export default class Newsfeed extends Component {
    
    auth = AuthService.build();

    state = {
        feed: []
    };

    componentDidMount() {
        this.loadFeed();
    }

    // grab who we are following
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
        let feed = [];

        for (let profile of following) {
            archive = new DatArchive(profile.uri);
            stats = await archive.readdir('/data/posts', { stat: true })    
            console.log(stats);
            for (let stat of stats) {
                let id = stat.name.replace('.json', '');
                feed.push({ id, uri: profile.uri});
            }
        }

        this.setState({
            feed
        });
    }

    render() {
        let feed;

        return (
            <div class="n-posts__feed">
                { this.state.feed.map((post) => {
                    return <Post id={post.id} uri={post.uri} />
                }) }
            </div>
        );
    }
}