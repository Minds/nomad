import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../auth/auth.service';

import PostsFeed from '../posts/feed.component';
import PostsCreator from '../posts/creator.component';
import Newsfeed from './feed.component';
import style from './newsfeed.css';
import FollowingList from '../following/list.component';

export default class NewsfeedPage extends Component {
    
    auth = AuthService.build();

    state = {};

    render() {
        return (
            <div className={style.wrapper}>
                <PostsCreator />
                <Newsfeed />
            </div>
        );
    }
}