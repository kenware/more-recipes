import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import { PropTypes } from 'react';
import  * as actions from '../../redux/Action/action.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './index.scss'
import trim from '../trim';
import { Markup } from 'interweave';
import Header from '../App/common/header';
import Dropzone from 'react-dropzone';
import FormData from 'form-data';

class Update extends Component {
    constructor(props){
        super(props)
this.state = { 
  file:[],
  photo:'',
  fullName:'',
  user:"",
  update:"Update Profile",
  inform:"show",
  display:false
  }
  this.onChange = this.onChange.bind(this);
  this.onSubmit = this.onSubmit.bind(this)
}

componentWillReceiveProps(newProps){
  if(newProps.user && newProps.user!=this.state.user){

    this.setState({
      photo: newProps.user.image,
      user:newProps.user,
      update:"Update Profile",
      fullName:newProps.user.fullName
    })
  }
  if(newProps.message.update && this.state.display){
    
        this.setState({
          update:"Update Profile",inform:""
        })
      }
}

onChange(e){
  const state = this.state;
  state[e.target.name] = e.target.value;
  this.setState(state);
}


componentWillMount() {
   this.props.actions.user();
  } 

onDrop(file) {
    this.setState({file,photo:""})
    }


    onSubmit(e){
      e.preventDefault();
      this.setState({update:"updating....",display:true})
       const fullName = this.state.fullName;
       const payload = new FormData();
       let file = this.state.file
       const filename = this.state.photo

      for(let x=0;x<file.length;x++){
      payload.append('file',file[x]);
    }
    payload.append('filename', filename); 
    payload.append('fullName',fullName);
    this.props.actions.updateProfile(payload);
   
      
      
    }
 
render() {
 
    return (
   <div className="row update">
    <h3 className=" text-center text-info">Update the profile field</h3>

     <div className="col-sm-12">
	       <div className="card mb-4 text-info">           
            <div className="card-body">
            <form>
            <fieldset className="form-group">
              <label for="fullname">FUll Name</label>
              <input type="text" className="form-control" onChange={this.onChange} placeholder={this.props.user.fullName} name="fullName" />
            </fieldset>
            <fieldset className="form-group">
              <label for="last_name">Username</label>
              <input type="text" className="form-control"  name="username" value={this.props.user.username} readonly />
            </fieldset>
            <fieldset className="form-group">
              <label for="email">Email</label>
              <input type="email" className="form-control" id="email" name="email" value={this.props.user.email} readonly/>
            </fieldset>
           
         </form>
 
            </div>
           </div>        
        </div>

	  <div className="col-sm-12">
	       <div className="card mb-4">           
            <div className="card-body">
			  <h2 className="card-title">Profile Photo</h2>
              <form >
                <fieldset className="form-group">
                <div className="row">
                <div className="col text-primary" style={{marginLeft:"1rem"}}>
                <Dropzone
               onDrop={this.onDrop.bind(this)}
               accept="image/*"
               ref="dropzone"     
               multiple={false}>
               Drag and drop or click to select an image to upload.
             </Dropzone>
              </div>
              <div className="col-4">
                <img src={this.state.photo} className="img-fluid" />
                {this.state.file.map(fil=><img src={fil.preview} className="img-fluid"/>)}
              </div>            
           </div>
               </fieldset>
			   <button type="submit" onClick={this.onSubmit} className="btn btn-info">
			   {this.state.update}</button>
			  </form>
        <div className="alert alert-warning alert-dismissible" role="alert" id={this.state.inform }>
          <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <strong>{ this.props.message.update }!</strong>
        </div>
            </div>
           </div>        
        </div>
    </div>      
    );
  }
}

function mapStateToProps(state, ownProps) {   
   
        return {
          user: state.user,
          message:state.message
        };
     
    
  }
  function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)}
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Update);