import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader, Grid, Segment } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import { Groups } from '/imports/api/group/Group';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';

const formSchema = new SimpleSchema({
    firstName: String, 
    lastName: String,
    major: {
        type: String,
        allowedValues: ['Choose A Major', 'Computer Science', 'Computer Engineering'],
        defaultValue: 'Choose A Major'
    },
    gradYear: String
  });

/** Renders a table containing all of the Group documents. Use <GroupItem> to render each row. */
class UserProfile extends React.Component {
    /** On submit, insert the data. */
  submit(data, formRef) {
    const { firstName, lastName, major, gradYear } = data;
    const owner = Meteor.user().username;
    Groups.insert({ firstName, lastName, major, gradYear, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'success');
          formRef.reset();
        }
      });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    let fRef = null;
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Profile</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={formSchema} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField name='firstName'/>
                <TextField name='lastName'/>
                <SelectField name='major'/>
                <TextField name='gradYear'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require an array of Group documents in the props. */
UserProfile.propTypes = {
  groups: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Group documents.
  const subscription = Meteor.subscribe('GroupAdmin');
  return {
    groups: Groups.find({}).fetch(),
    ready: subscription.ready(),
  };
})(UserProfile);
