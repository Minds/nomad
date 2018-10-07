import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../auth/auth.service';
import Post from './post.component';

export default class PostsFeed extends Component {
    
    auth = AuthService.build();

    state = {
        feed: []
    };

    componentDidMount() {
        this.loadFeed();
    }
    
    async loadFeed() {
        let archive = new DatArchive(this.props.uri);
        let stats = await archive.readdir('/data/posts', { stat: true })
        let feed = [];

        for (let stat of stats) {
            let id = stat.name.replace('.json', '');
            feed.push({ id });
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
                    return <Post id={post.id} uri={this.props.uri} />
                }) }
            </div>
        );
    }
}