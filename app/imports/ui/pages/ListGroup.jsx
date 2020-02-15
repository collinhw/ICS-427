import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { Groups } from '/imports/api/group/Group';
import GroupItem from '/imports/ui/components/GroupItem';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Group documents. Use <GroupItem> to render each row. */
class ListGroup extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">List Group</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Quantity</Table.HeaderCell>
                <Table.HeaderCell>Condition</Table.HeaderCell>
                <Table.HeaderCell>Edit</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.groups.map((group) => <GroupItem key={group._id} group={group} />)}
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

/** Require an array of Group documents in the props. */
ListGroup.propTypes = {
  groups: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Group documents.
  const subscription = Meteor.subscribe('Group');
  return {
    groups: Groups.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListGroup);
