import React, { Component } from 'react';
import {fire  , base}  from './config/Fire';
import {ListContainer} from './list';
import {AddContainer} from './Add';
import {EditContainer} from './Edit';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
  } from 'react-router-dom';

class Backend extends Component {
    constructor(props) {
        super(props);
       
        this.update = this.update.bind(this);
        this.logout = this.logout.bind(this);
       // this.handleChange = this.handleChange.bind(this);
        this.state = {
            posts: {},
            currentUser: null,
            title: 'sss',
            text: ''
          };
    }
    handleChangeTitle(e){
        e.preventDefault();
    
        const title = e.target.value;
        this.setState({title});
    
      
        console.log(this.state.title);

    }
    handleChangeText(e){
        e.preventDefault();
        const text = e.target.value;
       
        
    
        this.setState({text});
        console.log(e.target.value);
       

    }
    componentWillMount(){
        this.postsRef = base.syncState('posts',{
            context: this,
            state: 'posts'
        });
      
        
    }
    componentWillUnmount(){
        base.removeBinding(this.postsRef);
    }
    update(post){
        const posts  ={...this.state.posts};
        posts[post.id]= post;
        this.setState({posts});
    }


    logout() {
        fire.auth().signOut();
    }
    

    render() {
        return (<div className="container"> 
            <h1>Welcome to Backend!</h1>
            <div className="container">
            <div className="row justify-content-md-center">
            <div className="col-md-6"><ListContainer /></div>
       <div className="col-md-6 ">
           <div className="App">
           <Route exact path="/admin/edit" component={EditContainer} />
           <Route exact path="/admin" component={AddContainer} />
      </div>
      
 </div>
 </div>
 </div>
 
            <button className="btn btn-success" onClick={this.logout}>Wyloguj</button>
        </div>)

    }

}

export default Backend;

