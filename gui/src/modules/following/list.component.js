import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../auth/auth.service';
import Post from '../posts/post.component';
import ProfileService from '../profile/profile.service';

export default class FollowingList extends Component {
    
    auth = AuthService.build();

    state = {
        following: []
    };

    componentDidMount() {
        this.loadFollowing();
    }

    // grab who we are following
    async loadFollowing() {
        let archive = new DatArchive(this.auth.datUri);
        let rawJSON = await archive.readFile('/data/following.json');
        return JSON.parse(rawJSON);
    }
    
    async addFollower(username) {
        let profile = await ProfileService.getByUsername(username);
    }

    render() {
        let feed;

        return (
            <div>
                { this.state.following.map((profile) => {
                    return <div>{this.state.username}</div>
                }) }

                <input />
            </div>
        );
    }
}