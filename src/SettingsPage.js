import * as React from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import AssociationItem from "./AssociationItem";

import "./App.css";

class SettingsPage extends React.Component {
  state = {
    userAssociations: [],
    allAssociations: [],
    isNewUser: false,
    showError: "",
  };

  componentDidMount() {
    const cookies = new Cookies();
    const newUser = cookies.get("new_user");
    let isNewUser = false;
    if(newUser){
      cookies.remove("new_user");
      this.setState({isNewUser: true});
    }
    axios
      .get("http://localhost:8989/user/get-associations", {
        params: {
          token: cookies.get("logged_in"),
        },
      })
      .then((response) => {
        if (response.data && response.data.length > 0) {
          console.log(response.data);
          this.setState({ userAssociations: response.data, isNewUser });
        } else {
          this.setState({
            showError: true,
          });
        }
      });
    axios
      .get("http://localhost:8989/user/get-non-user-associations", {
        params: {
          token: cookies.get("logged_in"),
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data && response.data.length > 0) {
          this.setState({ allAssociations: response.data, isNewUser });
        } else {
          this.setState({
            showError: true,
          });
        }
      });

  }

  render() {
    return (
      <div>
        <img
          src={
            "https://i2.wp.com/www.cssscript.com/wp-content/uploads/2020/12/Customizable-SVG-Avatar-Generator-In-JavaScript-Avataaars.js.png?fit=438%2C408&ssl=1"
          }
          alt="profile Avatar"
          width={80}
          height={80}
        />
        {this.state.userAssociations.map((association) => {
          return (
            <AssociationItem
              key={association.id}
              name={association.name}
              checked={true}
              id={association.id}
            />
          );
        })}
        {this.state.allAssociations.map((association) => {
          return (
            <AssociationItem
              key={association.id}
              name={association.name}
              checked={false}
              id={association.id}
            />
          );
        })}
      </div>
    );
  }
}

export default SettingsPage;
