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
  value: RichTextEditor.createValueFromString('<p></p>','html'),
  file:[],
  title:"",
  erroDescription:"",
  ingredients:"",
  image:"",
  recipes:null,
  submit:"submit",
  message:"show",
  inform:false
  }
  this.onChange = this.onChange.bind(this);
  this.change = this.change.bind(this);
  this.onSubmit = this.onSubmit.bind(this);
}

componentWillMount() {
  
   this.props.actions.loadRecipe(this.props.match.params.recipeId);
 
    }
componentWillReceiveProps(newProps){
  if(newProps.recipes && newProps.recipes!=this.state.recipes){

    this.setState({
      value:RichTextEditor.createValueFromString(newProps.recipes.content,'html'),
      title: newProps.recipes.title,
      ingredients: newProps.recipes.ingredients,
      image: newProps.recipes.image,
      recipes:newProps.recipes
    })
  }

  if(newProps.message && this.state.inform){
    this.setState({submit:"submit",message:""})
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
    this.setState({file,image:""})
    }
    onSubmit(e){
      e.preventDefault();
      this.setState({submit:"submiting....",inform:true})
       const description = this.state.value.toString('html');
      //this.setState({val:description})
       const title = this.state.title;
       const ingredients = this.state.ingredients;
       const payload = new FormData();
       let file = this.state.file
       const filename = this.state.image
       if(description.length <= 11){
        
         return this.setState({erroDescription:"this field is required"})
         
       }else if(description.length <= 30){
      
        return this.setState({erroDescription:"Proper description of recipe greater than "+ description.length +" is required"})
       }else{this.setState({erroDescription:""})}
      for(let x=0;x<file.length;x++){
      payload.append('file',file[x]);
    }
    payload.append('filename', filename); 
    payload.append('title',title);
    payload.append('content',description)
    payload.append('ingredients',ingredients)
    this.props.actions.updateRecipe(payload,this.props.match.params.recipeId);
   
      
      
    }
  
render() {
  const {file}=this.state;
    return (
      <div>
          <div className="col-sm-12">
            <div className="alert alert-warning alert-dismissible" role="alert" id={`show`+this.props.message.updateMessage}>
                   <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <strong>
                    <span><font color='red'> 
                    {this.props.message.updateMessage }!
                    </font>
                    </span>
                    </strong>
           </div>
          <h3 className="text-center text-primary">Edit a recipe</h3>
      		   <div className="card my-4 bg-add-recipe text-default">
            <h5 className="card-header text-primary">Enter Recipe Details to edit</h5>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <fieldset className="form-group">
                 <label for="last_name" className="text-primary">Recipe Tittle</label>
                 <input type="text" className="form-control" onChange={this.change} id="tittle" name="title" value={this.state.title} required/>
                </fieldset>	
                <fieldset className="form-group">
                 <label className="text-primary" for="last_name">List important ingredients</label>
                 <textarea value={this.state.ingredients} cols="6" rows="8" className="form-control" onChange={this.change} id="ingredients" name="ingredients" required>
                </textarea>
                </fieldset>	
                <fieldset className="form-group" style={{background:"white"}}>              
                <div className="row">
                 <div className="col" style={{marginLeft:"1rem"}}>
                 <label for="image" className="text-primary">Photo of recipe(Optional)</label>
                 <Dropzone
                onDrop={this.onDrop.bind(this)}
                accept="image/jpeg,image/jpg,image/tiff,image/gif,image/png,image/svg"
                ref="dropzone"     
                multiple={false}>
                Drag and drop or click to select an image to upload.
              </Dropzone>
               </div>
               <div className="col">
               <img src={this.state.image} className="img-fluid"/>
                 {file.map(fil=><img src={fil.preview} className="img-fluid"/>)}
               </div>            
            </div>
             
  
                </fieldset>						
                <fieldset className="form-group">
                 <label className="text-primary" for="message">Description</label>
                 <font color="red"> {this.state.erroDescription} </font>
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
                    {this.props.message.updateSuccess }!
                    &nbsp;  {this.props.message.updateMessage }!
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
         recipes: state.recipes,
         message:state.message
        } 
  }
  function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)}
  }
  export default connect(mapStateToProps, mapDispatchToProps)(RecipeForm);