import * as React from "react";
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ProjectsContainer} from './projects';
import About from './about';
import Chat from './Chat';
import Admin from './Admin';
import { connect } from "react-redux";
import { postsFetched,getAllStatPostsAction,getAllStatPostsImages } from "./config/actions/index";
import {fire  , base, storage}  from './config/Fire';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.sendState = this.sendState.bind(this);
    this.onSync = this.onSync.bind(this);
    this.onPush = this.onPush.bind(this);
    this.onAction= this.onAction.bind(this);
    this.onImage=this.onImage.bind(this);
    this.state = {
      articles: [
        { title: "React Redux Tutorial for Beginners", id: 1 },
        { title: "TypeScript tutorial for beginners", id: 2 }
      ],
      temporary: [],
      a: [],
      ref: [],
      ref2: []
    };
  }


 componentDidMount() {
    // fetch("https://randomuser.me/api/?format=json&results=10")
    //   .then(res => res.json())
    //   .then(json => this.props.postsFetched(json.results));
      
    
   //await this.sendState();
  this.onSync();
  this.onAction();
 //console.log(this.props);
 
    
  }
  ref2(temp){
    this.setState({
      ref2: temp
      
  });
}
  
  
  onAction(){
    this.props.getAllStatPostsAction();
    var temp =[];
    var storageRef = storage.ref("images");
   
    storageRef.list().then(function(result) {
      console.log(result.items);
      result.prefixes.forEach(function(imageRef) {
        
       console.log(imageRef);
        // And finally display them
        imageRef.list().then(function(result2) {
         
        result2.items.forEach(function(imageRef2) {
          imageRef2.getDownloadURL().then(function(url) {
            console.log(url);
            temp.push(url);
        });
      });
      });
      //console.log(imageRef.getDownloadURL());
     
        //this.onImage(imageRef);
        //console.log(imageRef.getDownloadURL());
      });
    }).catch(function(error) {
      // Handle any errors
    });

    this.ref2(temp);

        console.log(this.state.ref2);
   // const storageRef = storage.ref('/images/1576580835000').getDownloadURL();
    this.props.getAllStatPostsImages(temp);

    
    console.log(this.props.posts2);
    console.log(this.props.images);
  }
  async sendState(){
    this.postsRef =base.syncState('posts',{
      context: this,
      state: 'temporary'
  });
 
  //this.props.postsFetched(this.state.temporary);

  //console.log(this.state.temporary);
  
  }
  onImage(imageRef) {
    console.log(imageRef);
    var fileURLs = [];
    imageRef.getDownloadURL().then(function(url) {
      // TODO: Display the image on the UI
      console.log(url);
    //   this.setState({
    //     ref2: [
    //         ...this.state.ref2,
    //         url
    //     ]
    // });
    }).catch(function(error) {
      // Handle any errors
    });
    console.log(this.state.ref2);
  };
 async componentDidUpdate(){
   
   // console.log(this.props.posts);
  }
  onPush(){
    let ref = fire.database().ref().child("posts");
    var a = ["test"];
    this.props.postsFetched(a);
    let snap;
  ref.on('value', function(snapshot) {
      snap = snapshot.val();
      console.log(snap);
  });


  for (var i in snap){
   
    a.push({id: i, title: snap[i]["title"], text: snap[i]["text"]});
  console.log("\n" + snap[i]);
    //for (var n in snap[i]){
    //     console.log(n, snap[i][n])     
 // }
 
}
if(ref==null){
  console.log("pusta zmienna");
this.onPush();
}else{
  this.props.postsFetched(a);
 
}
  return a;
  }
  async onSync(){
    var b = [];
    b.push({id: 1, title: "test", text: "text"});
    
    //console.log(ref);
    var a = [];
    a=this.onPush();
    console.log(a);
    
    if (this.props.posts){
      console.log(this.props.posts);
    }    
  // if(a.length=0){
  //   console.log("nie jest 0");
  // this.props.postsFetched(a);
  // a=null;
  // }else{
  //     this.props.postsFetched(this.onPush());
  
  // }
    //console.log(this.state.temporary);
    //console.log(this.state.temporary);
    // var results = this.state.temporary;
    // console.log(results.length);
   

    //         var temporary = [], item;
    //         for (var i = 1, len = results.length; i < len; i++) {
    //             item = results[i];
    //             //console.log(item["title"]);
    //             //temporary.push({id: item.title, title: item.text});
    //         }
    //         //console.log(temporary);
            
            
    
    
            //console.log(a);
            //this.setState(a);
         
   
            
  }
  render() {
    if(this.props.posts.length==0){
     // this.onSync();//this.props.postsFetched(this.state.a);
   }
   
  return (
    <div className="App">
      <Router>
      
      <header className="App-header">
      <ul>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/chat">Chat</Link>
            </li>
            {/* <li>
            <button onClick={this.onSync}>sync</button>
            </li>
            <li>
            <button onClick={this.onAction}>test action</button>
            </li> */}
          </ul>
         
        
      </header>
      <Route exact path="/projects" component={ProjectsContainer}/>
      <Route path="/about" component={About} />
      <Route path="/chat" component={Chat} />
      <Route path="/admin" component={Admin} />
      </Router>
     
    </div>
    
  );
  }
}
const mapStateToProps = (state) => {
  
  return {
    posts2: state.allposts.statPostState,
    posts: state.posts,
    images: state.allposts.statPostImages
  }
};
const mapDispatchToProps = { postsFetched,getAllStatPostsAction,getAllStatPostsImages };

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);