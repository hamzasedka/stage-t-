import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, makeStyles, MenuItem, Select, Snackbar, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import {Config} from '../styled-component/modal-styled'
import Firebase from '../firebase/firebase'
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: '80%',
      margin: theme.spacing(2),

    },
    root: {
        display: 'flex',
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
      },
      
  }));
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
const Param=()=>{
    const classNamees = useStyles();
    const [Events, setEvnets] = useState([]);
    const [signleEvents, setsignleEvents] = useState();

    const [state, setState] = React.useState({
        name: false,
        employeeNumber: false,
        Joined: false,
        speciality: false,
        checkedB: false,
        city:false,
        sex:false,
        eventName:"tiS5XN8frkJgoZKK3T81",
        imgUrl:""
      });

    const [open, setOpen] = useState(false);

    const SelectEvent=(event)=>{

        setState({ ...state, [event.target.name]: event.target.value });

        Firebase.firestore().collection("param").doc(state.eventName).get().then(
            res=>setsignleEvents(res.data())
        );
        

          
        
        
            console.log(state);
    }
    const SelectinputValue=(event)=>{
        setState({ ...state, [event.target.name]: event.target.value });

    }
    const handleChange = (event) => {
        setsignleEvents({ ...signleEvents, [event.target.name]: event.target.checked });
      };
    
      const { name, employeeNumber, Joined,speciality,sex,city } = state;
      const error = [name, employeeNumber, Joined,speciality,sex,city].filter((v) => v).length ===0;

      useEffect(() => {
        
        Firebase.firestore().collectionGroup("param").onSnapshot(snapShot=>{
            setEvnets(snapShot.docs.map(doc=>
            ({id:doc.id,data:doc.data()})
          
            ))
        });
      
      }, [])
    const updateConfig=()=>{
        Firebase.firestore().collection('param').doc(signleEvents.eventId).update(signleEvents).then(
            setOpen(true)
        ).catch();
     }
     const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
return(
    <>
<div className="row">
    <div className="col-md-3"></div>
    <div className="col-md-6">
        
        <Config>
        
    <FormControl className={classNamees.formControl}>
    <h5>1. Select Event :</h5>
        <Select defaultValue="" id="grouped-select" name="eventName" onChange={SelectEvent}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
              Events.map(res=>
                <MenuItem value={res.id}>{res.data.eventName}</MenuItem>)
          }
         
        </Select>
      </FormControl>
     {signleEvents? <div>
      <div className={classNamees.root}>
     
      <FormControl required error={error} component="fieldset" className={classNamees.formControl}>
      <h5>2. Badge Details :</h5>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={signleEvents.name} onChange={handleChange} name="name" />}
            label="Display Name"
          />
          <FormControlLabel
            control={<Checkbox checked={signleEvents.employeeNumber} onChange={handleChange} name="employeeNumber" />}
            label="Display Employee Number"
          />
          <FormControlLabel
            control={<Checkbox checked={signleEvents.Joined} onChange={handleChange} name="Joined" />}
            label="Display Start Date"
          />
          <FormControlLabel
            control={<Checkbox checked={signleEvents.speciality} onChange={handleChange} name="speciality" />}
            label="Speciality"
          />
          <FormControlLabel
            control={<Checkbox checked={signleEvents.sex} onChange={handleChange} name="sex" />}
            label="sex"
          />
          <FormControlLabel
            control={<Checkbox checked={signleEvents.city} onChange={handleChange} name="city" />}
            label="city"
          />
        </FormGroup>
      </FormControl>
    </div>
    
    <FormControl className={classNamees.formControl}>
    <h5>3. Background :</h5>
    <FormControlLabel
        control={
          <Checkbox
            checked={signleEvents.checkedB}
            onChange={handleChange}
            name="checkedB"
            color="primary"
          />
        }
        label="Transparent Background"
      />
       {signleEvents.checkedB ?<div></div> :<TextField  value={signleEvents.imgUrl}  name="imgUrl" onChange={SelectinputValue} id="standard-basic" label="Image Background Url" />}
                    
       <Button style={{marginTop:'20px'}} variant="outlined" color="primary" href="#outlined-buttons" onClick={updateConfig}> send</Button>

</FormControl>
</div>
:<div></div>}
      </Config>
    </div>
    <div className="col-md-3"></div>
</div>
<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
    </>
);
}



export default Param
