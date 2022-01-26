import './App.css';
import * as React from "react";
import Cookies from "universal-cookie";
import axios from "axios";

class LoginPage extends React.Component {
    state = {
        username: "",
        password: "",
        showError: false,
        response: "Ready"
    }

    onUsernameChange = (e) => {
        let username = e.target.value;
        this.setState({
            username: username
        })
    }

    onPasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }


    login = () => {
        axios.get("http://localhost:8989/user/sign-in", {
            params: {
                username: this.state.username,
                password: this.state.password
            }
        })
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    const cookies = new Cookies();
                    cookies.set("logged_in", response.data);
                    const newUser = cookies.get("new_user");
                    console.log(newUser);
                    if(newUser)
                        window.location.href="settings";
                    else
                        window.location.href = "dashboard";
                } else {
                    this.setState({
                        showError: true,
                        response: "username or password does not exist"
                    })
                }
            })

    }

    signUp = () => {
        axios.get("http://localhost:8989/user/create-account", {
            params: {
                username: this.state.username,
                password: this.state.password
            }
        })
            .then((response) => {
                if (response.data) {
                    const cookies = new Cookies();
                    cookies.set("new_user", true);
                    this.setState({
                        response: "Your account has been created!"
                    })
                } else {
                    this.setState({showError: true, response: "This username is already taken"})
                }
            })
    }

    render() {


        const inputStyle = {
            margin: "10px",
            width: "200px"
        }

        const buttonStyle = {
            margin: "10px",
            width: "200px",
            backgroundColor: "black",
            color: "white",
            borderRadius: "5px"
        }

        const signUpButtonStyle = {
            margin: "10px",
            width: "200px",
            backgroundColor: "green",
            color: "white",
            borderRadius: "5px",
            marginTop: "20px"
        }

        const hasRequiredDetails = !(this.state.username === "" || this.state.password === "");

        return (
            <div style={{margin: "auto", width: "50%", padding: "10px"}}>
                <fieldset style={{width: "300px"}}>
                    <legend>
                        <div style={{fontSize: "20px"}}>
                            Login to your account
                        </div>
                    </legend>
                    <input style={inputStyle}
                           onChange={this.onUsernameChange}
                           value={this.state.username}
                           placeholder={"Enter username"}
                    />
                    <input style={inputStyle}
                           onChange={this.onPasswordChange}
                           value={this.state.password}
                           placeholder={"Enter password"}
                    />
                    <div>
                        <button style={buttonStyle} onClick={this.login} disabled={!hasRequiredDetails} >Login</button>
                    </div>
                    <div>
                        <button style={signUpButtonStyle} onClick={this.signUp}  disabled={!hasRequiredDetails} >Sign Up</button>
                    </div>
                </fieldset>
                <div style={{color: "red"}}>{this.state.response}</div>
            </div>
        )
    }
}

export default LoginPage;
