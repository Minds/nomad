import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import AuthService from './modules/auth/auth.service';
import PostsPage from './modules/posts/posts.page';
import ProfilePage from './modules/profile/profile.page';
import AuthPage from './modules/auth/auth.page';
import Login from './modules/auth/login.component';
import Register from './modules/auth/register.component';
import NewsfeedPage from './modules/newsfeed/newsfeed.page';

export default class App extends Component {
   
    auth = AuthService.build();

    render() {
        return (
            <div>
                <div class="n-header">
                    <Link to="/">
                        <h1>N O M A D</h1>
                        <h4>By Minds</h4>
                    </Link>
                </div>

                { this.auth.username && false && <div>
                    Logged in as { this.auth.username }
                    <a onClick={this.auth.logout}>Logout</a>
                </div> }

                <div>
                    <Route exact path="/" component={AuthPage}/>
                    <Route path="/login/:username" component={Login}/>
                    <Route path="/register/:username" component={Register}/>

                    <Route path="/newsfeed" component={NewsfeedPage} />

                    <Route path="/posts" component={PostsPage}/>
                    <Route path="/profile/:username" component={ProfilePage}/>
                </div>
            </div>
        );
    }
}