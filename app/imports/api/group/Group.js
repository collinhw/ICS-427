import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Groups = new Mongo.Collection('Groups');

/** Define a schema to specify the structure of each document in the collection. */
const GroupSchema = new SimpleSchema({
  className: {
    type: String,
    allowedValues: ['Choose A Class', 'ICS 111', 'ICS 141', 'ICS 211', 'ICS 241', 'ICS 212', 'ICS 222',
    'ICS 311', 'ICS 314', 'ICS 321', 'ICS 312', 'ICS 355'],
    defaultValue: 'Choose A Class',
  },
  location: String,
  owner: String,
  time: {
    type: String,
    allowedValues: ['Choose A Start Time', '9:00AM', '10:00AM', '11:00AM', '12:00PM', '1:00PM', '2:00PM', 
    '3:00PM', '4:00PM', '5:00PM', '6:00PM', '7:00PM',
    '8:00PM', '9:00PM', '10:00PM', '11:00PM', '12:00AM'],
    defaultValue: 'Choose A Start Time',
  },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Groups.attachSchema(GroupSchema);

/** Make the collection and schema available to other code. */
export { Groups, GroupSchema };
