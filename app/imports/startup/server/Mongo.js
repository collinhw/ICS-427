import { Meteor } from 'meteor/meteor';
import { Groups } from '../../api/group/Group.js';

function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Groups.insert(data);
}

if (Groups.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}
