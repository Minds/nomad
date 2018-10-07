import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../auth/auth.service';
import ProfileService from './profile.service';
import PostsFeed from '../posts/feed.component';
import PostsCreator from '../posts/creator.component';

export default class ProfilePage extends Component {
    
    auth = AuthService.build();
    service = new ProfileService;

    state = {};

    componentDidMount() {
        this.loadUser();
    }

    async loadUser() {
        let username = this.props.match.params.username;
        let profile = await this.service.getByUsername(username);
        console.log(profile);

        this.setState({
            username: profile.username,
            uri: profile.uri,
        });
    }

    render() {
        return (
            <div class="n-profile">
                <h1>{ this.state.username }</h1>
                <h3>{ this.state.uri }</h3>
                
                { this.auth.username === this.state.username && <PostsCreator /> }

                { this.state.uri && <PostsFeed uri={this.state.uri} /> }
            </div>
        );
    }
}