import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../auth/auth.service';
import formsStyle from '../styles/forms.css';

export default class PostsCreator extends Component {
    
    auth = AuthService.build();

    datArchive = new DatArchive(window.location.href);

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
    }

    render() {
        return (
            <div class="n-posts__creator">
                <textarea 
                    className={formsStyle.input}
                    value={this.state.message}
                    onChange={(e) => this.setState({ message: e.target.value})}
                ></textarea>
                <button 
                    className={formsStyle.button}
                    onClick={ () => this.post() }
                >Submit</button>
            </div>
        );
    }
}