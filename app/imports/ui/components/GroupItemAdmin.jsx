import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Group (Admin) table. See pages/ListGroupAdmin.jsx. */
class GroupItemAdmin extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.group.name}</Table.Cell>
          <Table.Cell>{this.props.group.quantity}</Table.Cell>
          <Table.Cell>{this.props.group.condition}</Table.Cell>
          <Table.Cell>{this.props.group.owner}</Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
GroupItemAdmin.propTypes = {
  group: PropTypes.object.isRequired,
};

export default GroupItemAdmin;
