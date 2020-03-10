import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { Profiles } from '/imports/api/profile/Profile';
import ProfileItem from '/imports/ui/components/ProfileItem';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Profile documents. Use <ProfileItem> to render each row. */
class ListProfile extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">Student Profiles</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>FirstName</Table.HeaderCell>
                <Table.HeaderCell>LastName</Table.HeaderCell>
                <Table.HeaderCell>Major</Table.HeaderCell>
                <Table.HeaderCell>GradYear</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.profiles.map((profile) => <ProfileItem key={profile._id} profile={profile} />)}
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

/** Require an array of Profile documents in the props. */
ListProfile.propTypes = {
  profiles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Profile documents.
  const subscription = Meteor.subscribe('Profile');
  return {
    profiles: Profiles.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListProfile);
