import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../auth/auth.service';
import Post from '../posts/post.component';
import ProfileService from '../profile/profile.service';
import NewsfeedService from './newsfeed.service';

export default class Newsfeed extends Component {
    
    auth = AuthService.build();
    service = NewsfeedService.build();

    state = {
        feed: []
    };

    componentDidMount() {
        this.service.loadFeed();
        this.service.onFeedUpdated = (feed) => {
            this.setState({
                feed: feed,
                updated: true,
            })
        };
    }

    render() {
        let feed;

        return (
            <div class="n-posts__feed">
                { this.state.feed.map((post) => {
                    return <Post id={post.id} uri={post.uri} key={post.id} />
                }) }
            </div>
        );
    }
}