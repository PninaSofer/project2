import './App.css';
import * as React from "react";
import { NavLink} from "react-router-dom";
import Cookies from "universal-cookie";

class NavigationBar extends React.Component {
    

    state = {
        links: [{title: "Settings", path: "/settings"}, {title: "Dashboard", path: "/dashboard"}
            , {title: "Stores", path: "/stores"},
            {title: "Search", path: "/search"}
        ],
    }

 


    logout = () => {
        const cookies = new Cookies();
        cookies.remove("logged_in");
        window.location.reload();
    }

    render() {
        return (
            <div style={{marginRight: "20px", marginLeft: "20px", borderRight: "1px solid", paddingRight: "20px"}}>
                <ul>
                    {
                        this.state.links.map(link => {
                            return (
                                <NavLink key={link.path} to={link.path} className={"link"} activeClassName={"active"}>
                                    <li style={{marginBottom: "10px"}}>
                                        <i>
                                            {link.title}
                                        </i>
                                    </li>
                                </NavLink>
                            )
                        })
                    }

                    <button onClick={this.logout}>
                        Logout
                    </button>
                </ul>
            </div>
        )
    }
}
export default NavigationBar;
