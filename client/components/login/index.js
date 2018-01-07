import React, { Component } from 'react';
import './login.scss'
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import Header from '../App/common/header';
import { PropTypes } from 'react';
import  * as actions from '../../redux/Action/action.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { appMessage } from '../../redux/Action/action.js';


class Login extends Component {
constructor(props){
    super(props);
  this.state = { 
    email:'', 
    password:'',
    navigate: false,
    inform:'inform',
    login:"Login",

  }
  this.onChange = this.onChange.bind(this);
  this.login = this.login.bind(this);

}

componentWillReceiveProps(newProps){
    if(newProps.message.loginMessage){
        this.setState({login:"Login",inform:""})
    }
}

 onChange(e){
    const state = this.state;
    state[e.target.name] = e.target.value;
   this.setState(state);

  }



login(e){
   e.preventDefault();
   this.setState({login:"verifying..."})
   const email = this.state.email;
   const password = this.state.password;
   this.props.actions.login(email,password);

}
render() {
    /*const { navigate } = this.state
    if(this.props.message.message == "success"){
        this.setState({navigate:true})
    }else if(this.props.message.message){
        this.setState({inform:""})
    }
    // here is the important part
    if (navigate) {
       this.props.actions.login()
      return 
    }
    */
    return (
<div>
<Header.nav2 />
<div className="container py-5" id="bg">
<div className="row">
<div className="col-md-12">
    <h2 className="text-center mb-5"><font color="white">Login To Your Account</font></h2>
    <div className="row">
        <div className="col-md-6 mx-auto">
            <div className="card border-secondary">
                <div className="card-header">
                    <h3 className="mb-0 my-2 text-center">Login To Your Account</h3>
                    <div className="alert alert-warning alert-dismissible" role="alert" id={`show` + this.props.appMessage.appMessage }>
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <strong>{this.props.appMessage.appMessage}!</strong>
                            </div>
                    <div className="alert alert-warning alert-dismissible" role="alert" id={this.state.inform}>
                      <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      <strong>{this.props.message.loginMessage}!</strong>
                   </div>
                </div>
                <div className="card-body">
                    <form className="form" role="form" autocomplete="off" onSubmit={ this.login }>
                        <div className="form-group">
                            <label for="inputEmail3">Email</label>
                            <input type="email" onChange={ this.onChange } name="email" className="form-control" id="inputEmail3" placeholder="email@gmail.com" required=""/>
                        </div>
                        <div className="form-group">
                            <label for="inputPassword3">Password</label>
                            <input type="password" onChange={ this.onChange }  name="password" className="form-control" id="inputPassword3" placeholder="password" title="At least 6 characters with letters and numbers" required=""/>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-success btn-lg">{this.state.login}</button>
                        </div>
                        <div className="form-group">
                        <label for="inputPassword3"><Link to="/signup">signup</Link></label>|
                        <label for="inputPassword3"><Link to="/signup">forgot password?</Link></label>
                        </div>
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
   
        return{
         message: state.message,
         appMessage:state.appMessage 
        } 
  }
  function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)}
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Login);