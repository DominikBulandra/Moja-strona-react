import React, { Component } from 'react';
import { postsFetched,getAllStatPostsImages } from "./config/actions/index";
import { connect } from "react-redux";
import Project, { ProjectContainer } from './Project';
import {fire  , base, storage}  from './config/Fire';
let lastScrollY = 0;
let ticking = false;
export class Projects extends Component {
  constructor(props) {
    super(props);
    this.navRef = React.createRef();
    this.onLog = this.onLog.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
        data: ["1","2"],
        posts: [],
        posts2: [],
        ref2: [],
        licznik: 1
      };
}
ref2(temp){
  this.setState({
    ref2: temp
    
});

}
licznik(temp){
  this.setState({
    licznik: temp
    
});
}
componentDidMount(){
  if (this.props.posts2){
  this.props.posts2.forEach( (post) => {
    this.onAction(post.id);
    
  })
  }

  
//window.addEventListener('scroll', this.handleScroll);
}
componentDidUpdate(){
  console.log(this.props.posts);
  
 }
 componentWillUnmount() {
 // window.removeEventListener('scroll', this.handleScroll);
}


  
  handleScroll = () => {
    lastScrollY = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        //this.navRef.current.style.top = `${lastScrollY}px`;
        console.log(this.navRef.current.style);
        const styles = getComputedStyle(this.navRef.current)

        //console.log(styles) // rgb(0, 0, 0)
       
        ticking = false;
      });
   
      ticking = true;
    }
  };
  onAction(id){
    
    var temp =[];
    var storageRef = storage.ref('/images/'+id);
   
    storageRef.list().then(function(result) {
      console.log(result.items);
      result.items.forEach(function(imageRef) {
        imageRef.getDownloadURL().then(function(url) {
          console.log( "adres obrazka",url);
          temp.push(url);
          return url;
      });
       console.log(imageRef);
        // And finally display them
     
      //console.log(imageRef.getDownloadURL());
     
        //this.onImage(imageRef);
        //console.log(imageRef.getDownloadURL());
      });
    }).catch(function(error) {
      // Handle any errors
    });

    this.ref2(temp);

        console.log("aktualny",this.state.ref2);
   // const storageRef = storage.ref('/images/1576580835000').getDownloadURL();
    //this.props.getAllStatPostsImages(temp);

    
    //console.log(this.props.posts2);
    //console.log(this.props.images);
  }

 
 onLog(){
   console.log(this.props.posts);
 }
  render() {
    
      //wyśietlanie listy projektów
      var dane=this.props.posts;
      console.log(this.props.images);
   
      var div;
    if(this.props.posts2!= null){
      div =this.props.posts2.map(function(item, i){
        
        //console.log({item});
        //console.log(this.props.images);
        // return <li className="list-group-item list-group-item-action" key={i}><div className="row"><div className="col-md"></div><div className="col-md">{item.title}</div><div className="col-md">{item.text}</div></div></li>
        return <section id={"#Section" + i}><ProjectContainer key={item.id} id={item.id}  title={item.title} text={item.text} color={item.color} /></section>
      
      }, this)
      //this.licznik(this.state.licznik+1)

    }else
    {
      return <li className="list-group-item list-group-item-action">Ładowanie..</li>
    }
      
      

      return (
        
<div>
{div}
          <ul className="list-group">
              
              
             
             
          </ul>
           </div>
      )
  }
}

const mapStateToProps = (state) => {
  
  return {
    posts2: state.allposts.statPostState,
    posts: state.posts,
    images: state.allposts.statPostImages
  }
};
const mapDispatchToProps = { postsFetched,getAllStatPostsImages };

export const ProjectsContainer = connect(mapStateToProps, mapDispatchToProps)(Projects);