import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import AuthService from '../auth/auth.service';
import PostsCreator from './creator.component';
import PostsFeed from './feed.component';
import PostService from './posts.service';
import style from './post.component.css';

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

        this.setState({
            post: post,
            validated
        });
    }

    render() {
        return (
            <div className={style.card}>
                <div className={style.ownerBlock}>
                    <div className={style.avatarPlaceholder}></div>
                    <div className={style.ownerBlockBody}>
                        <strong>{ this.state.post.username }</strong>
                        <span>
                            { moment(this.state.post.timestamp).fromNow() }
                            { this.state.validated && <span className={style.validated}>VALIDATED</span> }    
                        </span>
                    </div>
                </div>
                <p>{ this.state.post.message }</p>

                              
            </div>
        );
    }
}