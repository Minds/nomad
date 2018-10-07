import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../auth/auth.service';
import PostsCreator from './creator.component';
import PostsFeed from './feed.component';
import PostService from './posts.service';

export default class Post extends Component {
    
    auth = AuthService.build();
    service = new PostService;

    state = {
        post: {}
    };

    async componentDidMount() {
        const id = this.props.id;
        const uri = this.props.uri;

        let post = await this.service.getById(id, { uri });

        let validated = await this.service.validate(post);
        console.log(validated);

        this.setState({
            post: post
        });
    }

    render() {
        return (
            <div class="n-posts__post">
                <p>{ this.state.post.message }</p>
                { this.state.post.signature }
                <span>{ this.state.post.username}</span>
            </div>
        );
    }
}