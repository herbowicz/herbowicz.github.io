---
layout: single
comments: true
title: 'Get Github users using React & RestAPI'
Category: Tutorial
tags: [React, JavaScript, RestAPI]
lang: en-EN
---

Connected using Anxios. Updated on value input change. Type Username to get the info about Github users. 

{% highlight jsx %}
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component{
        constructor(props){
        super(props);
        this.state = {
            me: [],
            name: '' 
        };
    }
    componentWillUnmount() {
        this.serverRequest.abort();
    }
    handleChange = (e)=> {   
        this.setState({ name: e.target.value }, ()=> {    
            var self = this;
            axios.get('https://api.github.com/users/' + this.state.name ) 
            .then(function(response){
                console.log(response.data); 
                console.log(response.status);                    
                self.setState({
                    me: response.data
                })  
            }); 
        })
    }
    render() {
        if(this.state.name) {
            return  <div>
                        Github user: <input type="text" value={this.state.name} onChange={this.handleChange}></input>
                        <h5>ID: {this.state.me.id}</h5>
                        <h1>{this.state.me.login} </h1>
                        <h4>{this.state.me.name} from {this.state.me.location}</h4>
                        <img src={this.state.me.avatar_url} style={{width: '175px'}}/>
                        <h5>{this.state.me.bio}</h5>
                        <h5>Since: {this.state.me.created_at}</h5>
                        <h3>Repos: {this.state.me.public_repos}</h3>
                    </div>
        } else {
            return  <div>
                        Github user: <input type="text" value={this.state.name} onChange={this.handleChange}></input>
                    </div>
        }
    }
}
ReactDOM.render(
    <App />,
    document.getElementById('app')
);
{% endhighlight %}
