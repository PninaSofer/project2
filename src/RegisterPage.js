import * as React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

import './App.css';

class RegisterPage extends React.Component {
    state = {
        username: "",
        password: ""
    }
    usernameHandler = (event) => {
        

        this.setState({username: event.target.value})
    }

    passwordHandler = (event) => {
        this.setState({password: event.target.value})
    }

    validateUsername = (phoneNumber) => {
        const phoneNumberPrefixes = ['054', '052', '050', '055', '053', '058'];

        if (phoneNumber.length !== 10) {
            alert("Username can must contain exactly 10 digits")
            return false; // to stop
        }

        let prefixValidated = false;
        for(const prefix of phoneNumberPrefixes){
            if(phoneNumber.startsWith(prefix)){
                prefixValidated = true;
            }
        }
        if(prefixValidated === false){
            alert("phone number must have a valid prefix\n i.e: 052, 054...")
            return false;
        }

        for (let i = 0; i<phoneNumber.length ; i++){
            const digit = phoneNumber.charAt(i) //digit is a char from "phoneNumber" variable
            if(!Number.isInteger(parseInt(digit))) { //if d isn't integer, it equal to 'true' and show alert
                alert("Username must contain digits")
                console.log(digit, Number.isInteger(digit));
                return false
            }
        }

        return true;
    }

    validatePassword = (password) => {
        if(password.length < 6){
            alert("password must have at least 6 characters")
            return false;
        }

        let hasLetter = false;
        let hasDigit = false;
        for (let i = 0; i<password.length ; i++){
            const charCode = password.charCodeAt(i);
            if(charCode >= 48 && charCode <= 57){
                hasDigit = true;
            } else if(charCode >= 65 && charCode <= 90){
                hasLetter = true;
            }else if(charCode >= 97 && charCode <= 122){
                hasLetter = true;
            }
        }
        if(hasLetter === false){
            alert('Password must contain letters');
            return false;
        }
        if(hasDigit === false){
            alert('Password must contain digits');
            return false;
        }
        return true;   
    }
    registerButton = () => {
        console.log(this.state.username , this.state.password)

        // if(this.validateUsername(this.state.username) === false){
        //     return;
        // }
        // if(this.validatePassword(this.state.password) === false){
        //     return;
        // }

        const user = {username : this.state.username, password :this.state.password}
        axios.get("http://localhost:8989/user/add", {params:user}).then((response) => {
           console.log(response)
           if(response.data === false){
               alert('username already exist');
           }else{
               this.setState({username: '', password: ''});
               const cookies = new Cookies();
               cookies.set("logged_in", response.data);               
               cookies.set("new_user", true);
           }
        }).catch(error => {
            console.log(error.response)
            console.log(error.request)
            console.log(error.message)
            console.log(error)
        })
    }

    render() {
        return (
            <div>
                <h2>Register</h2>
                <label> Username: <input type={"text"} value={this.state.username} onChange={this.usernameHandler} /></label>
                <label> Password: <input type={"password"} value={this.state.password} onChange={this.passwordHandler} /></label>
                <button onClick={this.registerButton}>Register</button>
                <br/>
                <NavLink to="/" exact className={"link"} activeClassName={"active"}>
                    <li style={{marginBottom: "10px", listStyleType:'none'}}>
                        <i> Goto Login </i>
                    </li>
                </NavLink>
            </div>
        )
    }
}

export default RegisterPage;