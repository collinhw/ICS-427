import React from 'react';
import { Groups } from '/imports/api/group/Group';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  className: {
    type: String,
    allowedValues: ['Choose A Class', 'ICS 111', 'ICS 141', 'ICS 211', 'ICS 241', 'ICS 212', 'ICS 222',
    'ICS 311', 'ICS 314', 'ICS 321', 'ICS 312', 'ICS 355'],
    defaultValue: 'Choose A Class',
  },
  location: String,
  time: {
    type: String,
    allowedValues: ['Choose A Start Time', '9:00AM', '10:00AM', '11:00AM', '12:00PM', '1:00PM', '2:00PM', 
    '3:00PM', '4:00PM', '5:00PM', '6:00PM', '7:00PM',
    '8:00PM', '9:00PM', '10:00PM', '11:00PM', '12:00AM'],
    defaultValue: 'Choose A Start Time',
  },
});

/** Renders the Page for adding a document. */
class AddGroup extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { className, location, time } = data;
    const owner = Meteor.user().username;
    Groups.insert({ className, location, time, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Study Group Added!', 'success');
          formRef.reset();
        }
      });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Group</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={formSchema} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <SelectField name='className'/>
                <TextField name='location'/>
                <SelectField name='time'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default AddGroup;
