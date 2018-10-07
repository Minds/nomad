import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import AuthService from './auth.service';
import style from './auth.css';
import formStyle from '../styles/forms.css';


export default class Register extends Component {
    
    state = {
        username: ''
    };

    auth = AuthService.build();

    componentDidMount() {
        this.setState({
            username: this.props.match.params.username
        });
    }

    async register() {
        this.auth.setPrivateKey(this.state.privateKey);
        await this.auth.register(this.state.username);
        this.setState({
            loggedin: true
        });
    }
    
    render() {
        return (
            <div class="n-form n-grid" className={style.wrapper}>
                { this.state.loggedin && <Redirect to="/newsfeed" /> }
                <div class="n-grid__row">
                    <label>Username</label> 
                    <input 
                        type="text"
                        value={this.state.username}
                        className={formStyle.input}
                        disabled
                    />

                    { this.state.typing && <div>...</div> }
                </div>
                <div class="n-grid__row">
                    <label>Private Key</label> 
                    <input 
                        type="password"
                        value={this.state.privateKey}
                        onChange={ (e) => this.setState({privateKey: e.target.value})}
                        className={formStyle.input}
                    />

                    { this.state.typing && <div>...</div> }
                </div>
                <div class="n-grid__row">
                    <button 
                        className={formStyle.button}
                        onClick={ () => this.register() }
                    >
                        Register
                    </button>
                </div>
            </div>
        );
    }
}