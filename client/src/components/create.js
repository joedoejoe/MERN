import React, { Component } from 'react';
// this will require to npm install axios
import axious from 'axios';
import axios from 'axios';
 export default class Create extends Component {
     // this is the constructor that stores the data
     constructor(props) {
         super(props);

         this.onChangePersonName = this. onChangePersonName.bind(this);
         this.onChangePersonPosition = this.onChangePersonPosition.bind(this);
         this.onChangePersonLevel = this.onChangePersonLevel.bind(this);
         this.onSubmit = this.onSubmit.bind(this);

         this.state = {
             person_name: "",
             person_position: "",
             person_level: "",
         };
     }
 }

 // these methods will update the state properties
onChangePersonName(e) {
    this.setState ({
        person_name: e.target.value,
    });
}

onChangePersonPosition (e) {
    this.setState ({
        person_position: e.target.value,
    });
}

onChangePersonLevel (e) {
    this.setState ({
        person_level: e.target.value,
    });
}

// this function will handle the submission
onSubmit (e) {
    e.preventDefault();
    
    // when post request is sent to the create url, axios will add a new record(newPerson) to the database

    const newPerson = {
        person_name: this.state.person_name,
        person_position: this.state.person_position,
        person_level: this.state.person_level,
    };

    axios.post('http://localhost:3000/record/add', newPerson).then((res) => console.log(res.data));

    // we will empty the state after posting the data to the new database
    this.setState ({
        person_name: "",
        person_position: "",
        person_level: "",
    });
}

// this following section will display the form that takes the input from the user
render() {
    return (
        <div style = {{ marginTop: 20}}>
            <h3>Create New Record</h3>
            
        </div>
    )
}