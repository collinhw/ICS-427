import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { Groups } from '/imports/api/group/Group';
import GroupItemAdmin from '/imports/ui/components/GroupItemAdmin';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Group documents. Use <GroupItem> to render each row. */
class ListGroupAdmin extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">List Group (Admin)</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Quantity</Table.HeaderCell>
                <Table.HeaderCell>Condition</Table.HeaderCell>
                <Table.HeaderCell>Owner</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.groups.map((group) => <GroupItemAdmin key={group._id} group={group} />)}
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

/** Require an array of Group documents in the props. */
ListGroupAdmin.propTypes = {
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
})(ListGroupAdmin);
