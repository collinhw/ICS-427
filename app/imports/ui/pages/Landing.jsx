import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Icon, Header, Image, Button, Modal } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (

        <div>
          <Grid>
            <Grid.Row centered>
              <Grid.Column textAlign='center'>
                <Header as='h1' className='title'> Welcome to Never Alone!</Header>
                <Header as='h3' className='subheader'>Find the Right Study Group for You!</Header>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row className='blankspace'>
            </Grid.Row>
          </Grid>

          <Grid stackable centered columns={3}>
            <Grid.Column textAlign='center'>
              <Icon size='huge' name='group'/>
              <Header as='h1'>Individual Accounts</Header>
              <Header as='h3'>When a user creates an account, it will be personalized towards them</Header>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Icon size='huge' name='file text'/>
              <Header as='h1'>View Study Groups</Header>
              <Header as='h3'>Find out information about different study groups</Header>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Icon size='huge' name='checked calendar'/>
              <Header as='h1'>Create Study Group Schedules</Header>
              <Header as='h3'>Create study groups and schedule when they would meet</Header>
            </Grid.Column>
            <Grid.Row className='blankspace'>
            </Grid.Row>
          </Grid>

          {!Meteor.userId() &&
            <Grid>
              <Grid.Row centered>
                <Grid.Column textAlign='center'>
                  <Header as='h1' className='instruct'> To get started, login or register now</Header>
                  <Button className='buttoning' as={NavLink} activeClassName="active" exact to="/signin" key='signin'>
                    Log In
                  </Button>
                  <Button as={NavLink} activeClassName="active" exact to="/signup" key='signup'>Register Now</Button>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row className='blankspace'>
              </Grid.Row>
            </Grid>
          }
        </div>
    );
  }
}

export default Landing;
