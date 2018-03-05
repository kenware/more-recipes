import React, { Component } from 'react';
import './index.scss'
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import Header from '../App/common/header';
import { PropTypes } from 'react';
import  * as actions from '../../redux/Action/action.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import validator from 'validator';
class Register extends Component {
    constructor(props){
        super(props)
this.state = { 
    email:'',
    name:'',
    username:'',   
    password:'',
    vpassword:'', 
    validEmail:'',
    passwordmatch:'',
    passwordmismatch:'',
    inform:'inform',
    register:"Register"
  }
  this.onChange = this.onChange.bind(this);
  this.onEmail = this.onEmail.bind(this);
  this.register = this.register.bind(this);
  this.change = this.change.bind(this);
}

componentWillReceiveProps(newProps){
    if(newProps.message.regMessage){
        this.setState({register:"Register",inform:""})
    }
}

 onChange(e){
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
  onEmail(e){
    
      if(!validator.isEmail(e.target.value+'')){
       const validEmail = 'Invalid Email Address';
      this.setState({ validEmail });
   }else{
    const email = e.target.value;
    const validEmail = '';
    this.setState({ email });
    
      this.setState({ validEmail });
   };
  }
  change(e){
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
    if (e.target.value==this.state.password){
      const passwordmatch = "Password Match";
      this.setState({ passwordmatch });
      const passwordmismatch = "";
      this.setState({ passwordmismatch });
    }else{
      const passwordmismatch = "Password do not Match";
      this.setState({ passwordmismatch });
      const passwordmatch = "";
      this.setState({ passwordmatch });
    }
   

  }



register(e){
   e.preventDefault();

   const email = this.state.email;
   const password = this.state.password;
   const username = this.state.username;
   const name = this.state.name;
   if(this.state.passwordmismatch=='' && this.state.passwordmatch!=='' && validator.isEmail(this.state.email)){
      this.props.actions.register(email,password,name,username);
      this.setState({
          register:(<div><i className="fa fa-spinner fa-spin fa-2x fa-fw" aria-hidden="true"></i>registering...</div>)
        });
    }
  }
render() {
    return (
      <div >
      <Header.nav2 />
      <div className="container py-5" id="regcontainer">
    <div className="row">
        <div className="col-md-12">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card border-secondary">
                        <div className="card-header">
                            <h4 className="mb-0 my-2 text-center">Enter your Details to Sign Up</h4>
                             <div className="alert alert-warning alert-dismissible" role="alert" id={this.state.inform }>
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                   <strong>{ this.props.message.regMessage }!</strong>
                                       </div>
                            

                        </div>
                        <div className="card-body">
                            <form className="form" role="form" autocomplete="off" onSubmit={ this.register }>
                                <div className="form-group">
                                    <label for="inputName">FullName</label>
                                    <input type="text" name="name" onChange={ this.onChange } className="form-control" id="inputName" placeholder="full name"/>
                                </div>
                                <div className="form-group">
                                    <label for="inputName">Username</label>
                                    <input type="text" name="username" onChange={ this.onChange } className="form-control" id="inputName" placeholder="username" required/>
                                </div>
                                <div className="form-group">
                                    <label for="inputEmail3">Email</label>
                                    <input type="email" name="email" onChange={ this.onEmail } className="form-control" id="inputEmail3" placeholder="email@gmail.com"/>
                                    <font color='red'>{this.state.validEmail} </font>
                                </div>
                                <div className="form-group">
                                    <label for="inputPassword3">Password</label>
                                    <input type="password" name="password" onChange={ this.onChange } className="form-control" id="inputPassword3" placeholder="password" title="At least 6 characters with letters and numbers" required/>
                                </div>
                                <div className="form-group">
                                    <label for="inputVerify3">Verify Password</label>
                                    <input type="password" name="vpassword" onChange={ this.change } className="form-control" id="inputVerify3" placeholder="password (again)" required/>
                                    <font color='green'>{this.state.passwordmatch }</font>
                                    <font color='red'>{this.state.passwordmismatch }</font>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-info btn-lg">{this.state.register}</button>
                                </div>
                                <Link to={'/login'} className="text-right mb-5">login</Link>
                                </form>
                            
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        
    </div>
    
</div>
<Header.footer />
</div>

    );
  }
}
function mapStateToProps(state, ownProps) {  
      return {
        message: state.message
      };
  }
  function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)}
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Register);