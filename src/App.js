import './App.css';
import * as React from "react";
import {BrowserRouter} from "react-router-dom";
import SettingsPage from "./SettingsPage";
import DashboardPage from "./DashboardPage";
import {Route} from "react-router";
import NavigationBar from "./NavigationBar";
import LoginPage from "./LoginPage";
import Cookies from "universal-cookie";
import StoresPage from "./StoresPage";
import StorePage from "./StorePage";
import SearchPage from "./SearchPage";
import MessagesBar from './MessagesBar';

class App extends React.Component {

    state = {
        isLoggedIn: false,
        token : ""
    }

    componentDidMount() {
        const cookies = new Cookies();
        if (cookies.get("logged_in")) {
            this.setState({
                isLoggedIn: true,
                token : cookies.get("logged_in")
            })
        }
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    {
                        this.state.isLoggedIn ?
                            <div>
                                <MessagesBar />
                                <div style={{display: "flex", alignItems: "start", marginTop: "50px"}}>
                                    <NavigationBar/>
                                    <Route path={"/"} component={SettingsPage} exact={true}/>
                                    <Route path={"/settings"} component={SettingsPage} exact={true}/>
                                    <Route path={"/dashboard"} component={DashboardPage} exact={true}/>
                                    <Route path={"/stores/:id"} component={StorePage} exact={true}/>
                                    <Route path={"/stores"} component={StoresPage} exact={true}/>
                                    <Route path={"/search"} component={SearchPage}/>
                                </div>
                            </div>
                            :
                            <div>
                                <Route path={"/"} component={LoginPage}/>
                            </div>
                    }
                </BrowserRouter>
            </div>
        )
    }

}

export default App;
