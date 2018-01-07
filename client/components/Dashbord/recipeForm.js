import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import { PropTypes } from 'react';
import  * as actions from '../../redux/Action/action.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RichTextEditor from 'react-rte';
import "./dashbord.scss";
import Dropzone from 'react-dropzone';
import FormData from 'form-data';

class RecipeForm extends Component {
    constructor(props){
        super(props)
this.state = { 
  value: RichTextEditor.createEmptyValue(),
  file:[],
  title:"",
  val:"",
  ingredients:"",
  continue:false,
  show:"show",
  submit:'Submit',
  inform:false,
  message:'show'
  }
  this.onChange = this.onChange.bind(this);
  this.change = this.change.bind(this);
  this.onSubmit = this.onSubmit.bind(this);
  this.onCancel = this.onCancel.bind(this)
}

componentWillReceiveProps(newProps){
  if((newProps.message.createRecipeSuccess || newProps.message.createRecipeError) && this.state.inform){
    this.setState({submit:'Submit',message:''})
  }
}
change(e){
  const state = this.state;
  state[e.target.name] = e.target.value;
  this.setState(state);
}

  onChange(value){
    this.setState({value});
  };
  
  onDrop(file) {
    this.setState({file})
    }
    onSubmit(e){
      e.preventDefault();
      this.setState({show:"show",inform:true})
       const description = this.state.value.toString('html');
      //this.setState({val:description})
       const title = this.state.title;
       const ingredients = this.state.ingredients;
       const payload = new FormData();
       let file = this.state.file
       
     if(file.length==0 && !this.state.continue){
       this.setState({show:""})
        this.setState({continue:true})
     }else{
       if(description.length <= 11){
        this.setState({continue:false})
         return this.setState({val:"this field is required"})
         
       }else if(description.length <= 30){
        this.setState({continue:false})
        return this.setState({val:"Proper description of recipe greater than "+ description.length +" is required"})
       }
       this.setState({submit:'Sending..'})
      for(let x=0;x<file.length;x++){
      payload.append('file',file[x]);}
       
    payload.append('title',title);
    payload.append('content',description)
    payload.append('ingredients',ingredients)
    this.props.actions.creatRecipe(payload);
    this.setState({continue:false})
      }
      
    }

 onCancel(e){
    this.setState({show:"show"})
    this.setState({continue:false})
  }
  
render() {
  const {file}=this.state;
    return (
      <div>
          <div className="col-sm-12">
          <h3 className="text-center text-primary">Add a recipe</h3>
      		   <div className="card my-4 bg-add-recipe text-default">
            <h5 className="card-header text-primary">Enter Recipe Details</h5>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <fieldset className="form-group text-primary">
                 <label for="last_name">Recipe Tittle</label>
                 <input type="text" className="form-control" onChange={this.change} id="tittle" name="title" placeholder="recipe name" required/>
                </fieldset>	
                <fieldset className="form-group text-primary">
                 <label for="last_name">List important ingredients</label>
                 <textarea cols="6" rows="8" className="form-control" onChange={this.change} id="ingredients" name="ingredients" required>
                 
                </textarea>
                
                
                  <div className="content emptyPhoto" id={this.state.show}>
                    <div className="modal-header">
                      <h4 className="modal-title text-danger">warning</h4>
                      <button type="button" onClick={ this.onCancel }  className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body text-danger text-center">
                     You have not added uploaded any photo/image of a recipe. 
                     The photo below will be used as the photo of your recipe
                    <img src={`upload/g.jpg`} className="rounded-circle img-default"/>
                    </div>
                    <div className="modal-footer">
                    <button className="delete btn btn-info" type="button"
                    onClick={ this.onSubmit }><i className="fa fa-trash-o" aria-hidden="true"></i>&nbsp;Continue</button>
                      <button type="button" onClick={ this.onCancel } className="btn btn-info" data-dismiss="modal">Cancel</button>
                    </div>

                  </div>
               
                
                
                </fieldset>	
                <fieldset className="form-group" style={{background:"white"}}>              
                <div className="row">
                 <div className="col text-primary" style={{marginLeft:"1rem"}}>
                 <label for="image">Photo of recipe(Optional)</label>
                 <Dropzone
                onDrop={this.onDrop.bind(this)}
                accept="image/jpeg,image/jpg,image/tiff,image/gif"
                ref="dropzone"     
                multiple={false}>
                Drag and drop or click to select an image to upload.
              </Dropzone>
               </div>
               <div className="col">
                 {file.map(fil=><img src={fil.preview} className="img-fluid"/>)}
               </div>            
            </div>
             
  
                </fieldset>						
                <fieldset className="form-group text-primary">
                 <label for="message">Description</label>
                 <font color="red"> {this.state.val} </font>
                 <RichTextEditor
                  value={this.state.value}
                  onChange={this.onChange}
                  />
                  
                 </fieldset>          
                 <button type="submit" className="btn btn-warning">{this.state.submit}</button>
                 <div className="alert alert-warning alert-dismissible" role="alert" id={this.state.message}>
                   <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                     <strong>
                      <span><font color='red'> 
                      {this.props.message.createRecipeError}&nbsp;
                      {this.props.message.createRecipeSuccess}
                       </font>
                      </span>
                    </strong>
                   </div>
              </form>
            </div>
          </div>
      </div>
</div>

    );
  }
}

function mapStateToProps(state, ownProps) {   
   
        return{
         message: state.message 
        } 
  }
  function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)}
  }
  export default connect(mapStateToProps, mapDispatchToProps)(RecipeForm);