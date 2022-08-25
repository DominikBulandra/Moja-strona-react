import React, { Component } from 'react';
import { connect } from "react-redux";
import {Spring} from 'react-spring/renderprops'
import { postsFetched,getAllStatPostsImages } from "./config/actions/index";
let lastScrollY = 0;
let ticking = false;
export class Project extends Component {
  constructor(props) {
    
    super(props);
    this.navRef = React.createRef();
    this.state = {
      email: '',
      password: ''
    };
  }
  componentDidMount(){
  
    window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
    }
    handleScroll = () => {
      lastScrollY = window.scrollY;
  
      if (!ticking) {
        window.requestAnimationFrame(() => {
          //this.navRef.current.style.top = `${lastScrollY}px`;
          console.log(this.navRef.current.style.top);
          const styles = getComputedStyle(this.navRef.current)
  
          //console.log(styles) // rgb(0, 0, 0)
         
          ticking = false;
        });
     
        ticking = true;
      }
    };  
  render() {
    console.log(this.props.images);
    const spanStyles = {
      color: "#fff",
      borderColor: "#00f"
    };
      let styles = {
        margin: '20px',
        width: '250px',
        height: '250px',
        backgroundColor: "yellow",
      };
      const renderAuthButton="";
      
    return (



      <Spring
  from={{ opacity: 0, marginTop: -500 }}
  to={{ opacity: 1, marginTop: 0 }}
  config={{duration:1000}}>
    
  {props => <div style={props}>      <div  ref={this.navRef} className="container" style={{backgroundColor: this.props.color,position: "relative",maxWidth: '100%'}}>
            <div className="row justify-content-md-center">
       <div className="col-12 " style={{height: 200}}>
       <h1 style={{marginTop: '50px', marginBottom: '50px'}}>{this.props.title}</h1>
    
  
    <div class="container">
  <div class="row">
    <div class="col">
    <p style={{Color: 'lightblue'}}>{this.props.text}</p>
    </div>
    <div class="col">
    {this.props.images.map(function(object,i){

return (

<div>
       {
            object[0] ==this.props.id && <p><img src={object[1]} style={{width: '600px', opacity: '80%'}}></img></p>
       }
    </div>)
},this)}
    </div>
  </div></div>



      
 

  
    
 </div>
 </div>
 </div></div>}
</Spring>
  
    );
  }
}



const mapStateToProps = (state) => {
  
  return {
   
    images: state.allposts.statPostImages
  }
};
const mapDispatchToProps = { getAllStatPostsImages };

export const ProjectContainer = connect(mapStateToProps, mapDispatchToProps)(Project);