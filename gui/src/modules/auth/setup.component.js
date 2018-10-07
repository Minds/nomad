import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from './auth.service';
import style from "./setup.component.css";
import formStyle from '../styles/forms.css';

export default class Setup extends Component {
    
    state = {
        username: ''
    };

    auth = AuthService.build();

    async login() {
        await this.auth.login(this.state.username);
        this.setState({
            loggedin: true,
        });
    }

    onUsernameChanging(e) {

        if (this.state.typingTimeout)
            clearTimeout(this.state.typingTimeout);
        
        let typingTimeout = setTimeout(() => {
            this.setState({ 
                typing: false,
            });
            this.onUsernameChanged();
        }, 300);
    
        this.setState({
            username: e.target.value,
            typing: true,
            typingTimeout
        });
    }

    async onUsernameChanged() {
        let datUri = await this.auth.getDatUriByUsername(this.state.username);
        console.log(datUri);
        if (datUri) {
            this.setState({
                usernameExists: true,
                datUri: datUri,
            })
        } else {
            this.setState({
                usernameExists: false,
                datUri: false,
            })
        }
    }

    goToLogin() {
        window.location.href = `dat://${this.state.datUri}/login/${this.state.username}`;
    }

    async goToRegister() {
        let datUri = await this.auth.fork();
        window.location.href = `dat://${datUri}/register/${this.state.username}`;
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
                        onChange={ this.onUsernameChanging.bind(this) }
                        className={formStyle.input}
                    />

                    { this.state.typing && <div>...</div> }
                </div>

                { this.state.usernameExists && this.state.username && <div class="n-grid__row">
                    <button 
                        className={[formStyle.button]}
                        onClick={this.goToLogin.bind(this)}
                    >
                        Login
                    </button>    
                </div> }
                { !this.state.usernameExists && this.state.username && <div class="n-grid__row">
                    <button 
                        className={[formStyle.button]}
                        onClick={this.goToRegister.bind(this)}
                    >
                        Register
                    </button>    
                </div> }
            </div>
        );
    }
}