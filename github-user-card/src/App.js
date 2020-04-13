import React from "react";
import "./App.css";
import styled from "styled-components";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      gitHubUser: [],
    };
  }

  componentDidMount() {
    fetch("https://api.github.com/users/miragekamran")
      .then((res) => res.json())
      .then((user) => {
        console.log("User: ", user);
        this.setState({ gitHubUser: user });
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  render() {
    const Title = styled.h1`
      with: 20%;
      margin: 0 auto;
    `;

    const UserInfo = styled.div`
      width: 50%;
      margin: 0 auto;
      padding: 30px;
      display: flex;
    `;

    const UserInfoLeft = styled.div`
      width: 50%;
    `;

    const UserInfoRight = styled.div`
      width: 50%;
    `;

    let userState = this.state.gitHubUser;

    return (
      <div className="App">
        <Title>User GitHub Card</Title>
        <UserInfo className="userInfo">
          <UserInfoLeft className="userInfoLeft">
            <img
              src={userState.avatar_url}
              alt={userState.avatar_url}
              key={userState.avatar_url}
              width="250"
              height="250"
            />
          </UserInfoLeft>
          <UserInfoRight className="userInfoRight">
            <strong>Name: </strong> {userState.name} <br />
            <strong>User Login: </strong> {userState.login} <br />
            <strong>User ID: </strong> {userState.id} <br />
            <strong>Number of Followers: </strong> {userState.followers} <br />
            <strong>Number of Following: </strong> {userState.following} <br />
            <strong>Followers Link: </strong> <a href={userState.followers_url}>{userState.followers_url}</a> <br />
            <strong>Following Link: </strong> <a href={userState.followers_url}>{userState.following_url}</a> <br />
          </UserInfoRight>
        </UserInfo>
      </div>
    );
  }
}
