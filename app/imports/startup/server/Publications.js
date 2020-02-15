import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Groups } from '../../api/group/Group';

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Group', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Groups.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('GroupAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Groups.find();
  }
  return this.ready();
});
