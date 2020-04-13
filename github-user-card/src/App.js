import React from "react";
import "./App.css";
import styled from "styled-components";
import GetHubCalendar from "react-github-calendar";
import { moreStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      gitHubUser: [],
      gitHubFollowing: [],
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

    fetch("https://api.github.com/users/miragekamran/following")
      .then((res) => res.json())
      .then((followingUsers) => {
        console.log("following:", followingUsers);
        this.setState({ gitHubFollowing: followingUsers });
      })
      .catch((err) => {
        console.log("error", err);
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

    const UserContribution = styled.div`
      width: 50%;
    `;

    const FollowersContainer = styled.div`
      display: flex;
      flex-wrap: wrap;
      margin: 0 auto;
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
            <strong>Repositories: </strong> {userState.public_repos} <br />
            <strong>Followers Link: </strong>{" "}
            <a href={userState.followers_url}>{userState.followers_url}</a>{" "}
            <br />
            <strong>Following Link: </strong>{" "}
            <a href={userState.followers_url}>{userState.following_url}</a>{" "}
            <br />
            <strong>Biography: </strong> {userState.bio} <br />
            <strong>Location: </strong> {userState.location} <br />
          </UserInfoRight>
        </UserInfo>
        <UserContribution className="userContribution">
          <strong>Contributions:</strong>
          <GetHubCalendar username={userState.login} fullYear={false} />
        </UserContribution>

        <FollowersContainer className="followersContainer">
          {this.state.gitHubFollowing.map((theFollowing) => (
            <Card className='userCard' key={theFollowing.login} >
            <CardActionArea>
              <CardMedia
              component='img'
                className='userCardImage'
                height='350'
                image={theFollowing.avatar_url}
                title={theFollowing.login}
              />
            </CardActionArea>
              
            </Card>
          ))}
        </FollowersContainer>
        
      </div>
    );
  }
}
