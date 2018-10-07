import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../auth/auth.service';
import formsStyle from '../styles/forms.css';
import style from './post.component.css';

export default class PostsCreator extends Component {
    
    auth = AuthService.build();

    datArchive = new DatArchive(window.location.host);

    state = {
        message: ''
    };
    
    async post() {
        const id = Date.now();
        let post = {
            message: this.state.message,
            username: this.auth.username,
            timestamp: Date.now(),
        };

        let signature = await this.auth.sign(post);
        
        post.signature = signature;

        this.datArchive.writeFile(`/data/posts/${id}.json`, JSON.stringify(post), 'utf8');
    
        this.props.onPosted({ id: id, uri: window.location.host });
    
        this.setState({
            message: '',
        })
    }

    render() {
        return (
            <div className={style.card}>
                <textarea 
                    placeholder="Enter a message here"
                    value={this.state.message}
                    onChange={(e) => this.setState({ message: e.target.value})}
                ></textarea>
                <button 
                    className={ formsStyle.button + ' ' + style.postButton }
                    onClick={ () => this.post() }
                >Submit</button>
            </div>
        );
    }
}