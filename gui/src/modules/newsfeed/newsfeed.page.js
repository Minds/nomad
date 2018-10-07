import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../auth/auth.service';

import PostsFeed from '../posts/feed.component';
import PostsCreator from '../posts/creator.component';
import Newsfeed from './feed.component';
import style from './newsfeed.css';
import layout from '../styles/layout.css';
import FollowingList from '../following/list.component';
import NewsfeedService from './newsfeed.service';

export default class NewsfeedPage extends Component {
    
    auth = AuthService.build();
    service = NewsfeedService.build();

    state = {};

    onPosted(post) {
        setTimeout(() => {
            this.service.prependToFeed(post);
        }, 300);
    }

    render() {
        return (
            <div className={layout.wrapper}>
                { !this.auth.username && <Redirect to="/" /> }
                <PostsCreator onPosted={this.onPosted.bind(this)} />
                <Newsfeed />
            </div>
        );
    }
}