import React from 'react';
import ModalButton from './ModalButton.jsx';
import Checkbox from '../CheckBox/Checkbox.js';
import Binder from '../Binder.js';

export default class AddEmployeeButton extends React.Component {

  constructor(props) {
    super(props);

    //creater a new binder and bind all of the methods in this class
    var binder = new Binder();
    binder.bindAll(this, AddEmployeeButton);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      error: '',
      jobs: []
    }
  }

  //Updates the data base by adding a new employee with a first name, last name, email, and roles
  //Then it clears its states to be reused when adding another employee
  update() {
    if (this.state.firstName && this.state.lastName && this.state.email && this.state.jobs.length > 0) {
      this.props.authorize(this.state.firstName, this.state.lastName, this.state.email, this.state.jobs);
      this.setState({
        firstName: '',
        lastName: '',
        email: '',
        error: '',
        jobs: []
      });
      return true;
    } else {
      this.setState(
        { error: 'All fields are required to add an employee.' }
      );
      return false;
    }
  }


  //updates the first name state when the first name text field is edited
  firstNameChanged(e) {
    this.setState({ firstName: e.target.value });
  }

  //updates the last name state when the last name text field is edited
  lastNameChanged(e) {
    this.setState({ lastName: e.target.value });
  }

  //updates the email state when the email text field is edited
  emailChanged(e) {
    this.setState({ email: e.target.value });
  }

  //updates the jobs state by checking which checkboxes are checked and unchecked
  jobsChanged(job) {
    var newJobs = Array.from(this.state.jobs);
    if (newJobs.length !== 0) {
      var found = false;
      for (var i = 0; i < newJobs.length; i++) {
        if (newJobs[i] === job) {
          newJobs.splice(i, 1);
          this.setState({
            jobs: newJobs
          })
          return;
        }
      }
      if (!found) {
        newJobs.push(job);
      }
    } else {
      newJobs.push(job);
    }
    this.setState({
      jobs: newJobs
    })
  }

  //Creates all of the unchecked checkboxes
  getCheckBoxes() {
    var jobs = ["Rigger", "Loft Head", "Loft Employee", "Tandem Instructor",
      "AFP Instructor", "Packer", "Manifest", "Videographer",
      "Hanger Master", "Administrator"];
    var col1 = [];
    var col2 = [];
    var col3 = [];

    for (var i = 0; i < jobs.length; i++) {
      var nextJob = jobs[i];
      var t = true;
      var nextItem = <Checkbox isChecked={false} key={i} label={nextJob} updateCheckBoxArray={this.jobsChanged} />

      if (i % 3 === 0) {
        col1.push(nextItem);
      } else if (i % 3 === 1) {
        col2.push(nextItem);
      } else if (i % 3 === 2) {
        col3.push(nextItem);
      }
    }
    return (<div>
      <div>{col1}</div>
      <div>{col2}</div>
      <div>{col3}</div>
    </div>
    );
  }

  render() {
    var error = <div></div>
    if (this.state.error) {
      error = <div color="danger">{this.state.error}</div>;
    }
    const checkboxes = this.getCheckBoxes();
    const modalContent = <form>
      {error}
      <div>
        <divAddon >First Name: </divAddon>
        <div id="addEmployeeFirstName" type='text' value={this.state.firstName} onChange={this.firstNameChanged} />
      </div>
      <br />
      <div>
        <divAddon >Last Name: </divAddon>
        <div id="addEmployeeLastName" type='text' value={this.state.lastName} onChange={this.lastNameChanged} />
      </div>
      <br />
      <div>
        <divAddon >Email: </divAddon>
        <div id="addEmployeeEmail" type='email' value={this.state.email} onChange={this.emailChanged} />
      </div>
      <br />
      <div>
        <h3>Job(s)</h3>
        <div check>
          {checkboxes}
        </div>
      </div>
    </form>;
    return (
      <button buttonSize="md" buttonColor={"primary"} buttonText={"New Employee"} modalTitle={"New Employee"}
        modalContent={modalContent}
        modalPrimaryButtonText="Add"
        modalPrimaryClick={this.update} />
    );
  }
}

