import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../auth/auth.service';
import PostsCreator from './creator.component';
import PostsFeed from './feed.component';

export default class PostsPage extends Component {
    
    auth = AuthService.build();

    render() {
        return (
            <div class="n-posts">
                { !this.auth.username && <Redirect to="/unlock" /> }
                <PostsCreator />
                <PostsFeed />
            </div>
        );
    }
}