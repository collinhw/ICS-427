import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Group table. See pages/ListGroup.jsx. */
class GroupItem extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.group.className}</Table.Cell>
          <Table.Cell>{this.props.group.location}</Table.Cell>
          <Table.Cell>{this.props.group.time}</Table.Cell>
          <Table.Cell>
            <Link to={`/edit/${this.props.group._id}`}>Edit</Link>
          </Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
GroupItem.propTypes = {
  group: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(GroupItem);
