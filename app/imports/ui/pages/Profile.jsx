import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader, Card, Icon } from 'semantic-ui-react';
import { Groups } from '/imports/api/group/Group';
import GroupItem from '/imports/ui/components/GroupItem';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Group documents. Use <GroupItem> to render each row. */
class Profile extends React.Component {

    /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
    render() {
        return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
    }

    /** Render the page once subscriptions have been received. */
    renderPage() {
        return (
            <Container>
                <Header as="h2" textAlign="center">User Profile</Header>
                <Card>
                    {/* <Image src='/images/avatar/large/matthew.png' wrapped ui={false} /> */}
                    <Card.Content>
                        <Card.Header>Matthew</Card.Header>
                        <Card.Meta>
                            <span className='date'>Joined in 2015</span>
                        </Card.Meta>
                        <Card.Description>
                            Matthew is a musician living in Nashville.
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <a>
                            <Icon name='user' />
                            22 Friends
      </a>
                    </Card.Content>
                </Card>
            </Container>
        );
    }
}

/** Require an array of Group documents in the props. */
Profile.propTypes = {
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
})(Profile);
