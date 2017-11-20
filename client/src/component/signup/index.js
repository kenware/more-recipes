import React, { Component } from 'react';
import './index.css'
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import token from '../auth.js';
import  up from 'react-icons/lib/fa/level-down';
import validator from 'validator';
import nave from '../app/nav'
class register extends Component {

 state = { 
    email:'',
    name:'',
    username:'',   
    password:'',
    vpassword:'',
    userErr:'', 
    validEmail:'',
    passwordmatch:'',
    passwordmismatch:'',
    navigate: false,
    inform:'inform'
  }

 onChange = (e) =>{
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
  onEmail = (e) =>{
    const email = e.target.value;
    this.setState({ email });
      if(!validator.isEmail(this.state.email+'')){
       const validEmail = 'Invalid Email Address';
      this.setState({ validEmail });
   }else{
    const validEmail = '';
      this.setState({ validEmail });
   };
  }
  change = (e) =>{
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



register = (e) => {
   e.preventDefault();
   const email = this.state.email;
   const password = this.state.password;
   const username = this.state.username;
   const name = this.state.name;
   if(this.state.passwordmismatch=='' && this.state.passwordmatch!=='' && validator.isEmail(this.state.email)){
   fetch('/api/users/signup', 
      {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          email:email,
          password:password,
          fullName:name,
          username:username
        })
      })
      .then(res => res.json())
      .then(user => {
        if(typeof user == 'string'){
        const userErr = user;
        const inform = ''; 
        this.setState({userErr});
        this.setState({ inform })
        }else{this.setState({ navigate: true });}
        });
    }
  }
render() {
    const { navigate } = this.state;
// here is the important part
    if (navigate) {
      return <Redirect to="/login" push={true} />
    };
    return (
      <div >
      <nave.nav />
      <div class="container py-5" id="regcontainer">
    <div class="row">
        <div class="col-md-12">
            <div class="row">
                <div class="col-md-6 mx-auto">
                    <div class="card border-secondary">
                        <div class="card-header">
                            <h4 class="mb-0 my-2 text-center">Enter your Details to Sign Up</h4>
                             <div class="alert alert-warning alert-dismissible" role="alert" id={ this.state.inform }>
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                   <strong>{this.state.userErr}!</strong>
                                       </div>
                            

                        </div>
                        <div class="card-body">
                            <form class="form" role="form" autocomplete="off" onSubmit={ this.register }>
                                <div class="form-group">
                                    <label for="inputName">FullName</label>
                                    <input type="text" name="name" onChange={ this.onChange } class="form-control" id="inputName" placeholder="full name"/>
                                </div>
                                <div class="form-group">
                                    <label for="inputName">Username</label>
                                    <input type="text" name="username" onChange={ this.onChange } class="form-control" id="inputName" placeholder="username" required/>
                                </div>
                                <div class="form-group">
                                    <label for="inputEmail3">Email</label>
                                    <input type="email" name="email" onChange={ this.onEmail } class="form-control" id="inputEmail3" placeholder="email@gmail.com"/>
                                    <font color='red'>{ this.state.validEmail }</font>
                                </div>
                                <div class="form-group">
                                    <label for="inputPassword3">Password</label>
                                    <input type="password" name="password" onChange={ this.onChange } class="form-control" id="inputPassword3" placeholder="password" title="At least 6 characters with letters and numbers" required/>
                                </div>
                                <div class="form-group">
                                    <label for="inputVerify3">Verify Password</label>
                                    <input type="password" name="vpassword" onChange={ this.change } class="form-control" id="inputVerify3" placeholder="password (again)" required/>
                                    <font color='green'>{ this.state.passwordmatch }</font>
                                    <font color='red'>{ this.state.passwordmismatch }</font>
                                </div>
                                <div class="form-group">
                                    <button type="submit" class="btn btn-info btn-lg">Register</button>
                                </div>
                                <Link to={'/login'} class="text-right mb-5">login</Link>
                                </form>
                            
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        
    </div>
    
</div>
</div>

    );
  }
}
export default register;