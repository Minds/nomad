import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from './auth.service';
import Setup from './setup.component';

export default class AuthPage extends Component {
    
    auth = AuthService.build();

    render() {
        return (
            <div class="n-auth">
                { this.auth.username && <Redirect to="/newsfeed" /> }
                <Setup />
            </div>
        );
    }
}