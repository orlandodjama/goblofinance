import React from 'react';
import {Button,TextField,Grid,InputAdornment} from '@material-ui/core';
import {connect} from 'react-redux';
import * as actions from '../store/actions/auth';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import { withRouter } from 'react-router-dom';
//import { writeJsonFile } from 'write-json-file';

class Login extends React.Component {
  
    constructor(props){
        super(props);
        
        this.state = {
        nom : "",
        password : "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmits = this.handleSubmits.bind(this);
    }

    componentDidMount(){
      console.log(this.props.userid)
    }

    componentDidUpdate(prevProps){
      console.log(prevProps.userid)
      console.log(this.props.userid)
      const { history } = this.props;
      if(this.props.userid!=null)
      
        {
          console.log(this.props.loading)
          history.push('/Ajout')
        }
        else{
          console.log(this.props.error)
        }
      

    }
    handleChange = (e) => {
        this.setState({ 
            // Computed property names 
            // keys of the objects are computed dynamically 
            [e.target.name] : e.target.value             
          }) ;
          console.log(this.state);
      };

    handleSubmits(e){
      const { history } = this.props;
        e.preventDefault();
          console.log(this.state);   
        this.props.onAuth(this.state.nom, this.state.password)  
        //history.push('/Ajout') 
      };

    creationjson = () =>{
      let personne = {
        "prenom" : "Marie",
        "age" : 45,
        "passion" : "loisirs créatifs, histoire",
        "taille" : 172
     }
     let donnees = JSON.stringify(personne)
      const element = document.createElement("a");
      const file = new Blob([donnees]);
      element.href = URL.createObjectURL(file);
      element.download = "myFile.json";
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
      console.log('okay')
    }

    render(){
        return (
           
            
        
       <div>
           
           <form noValidate autoComplete="off" onSubmit={ this.handleSubmits }>
          <div>
            <Grid container spacing={2}>
              <Grid item xs={3} md={3} sm={3} lg={3}></Grid>
              <Grid item xs={6} md={6} sm={6} lg={6}>
                <Grid container spacing={2} style={{marginTop:'100px'}}>
                <TextField 
                required 
                style={{width:'100%',marginBottom:'50px'}}
                 id="standard-required"
                  label="Required" 
                   name="nom" 
                   value={this.state.nom}
                    onChange={this.handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                    />
                </Grid>
                <Grid container spacing={2}>
                <TextField
                style={{width:'100%',marginBottom:'50px'}}
              id="standard-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />
                </Grid>
                <Grid container spacing={2}>
                <Button variant="outlined"
                size="large" color="primary" type="submit" style={{width:'100%',borderRadius: '25px'}}>
                Login
                </Button>
                </Grid>
              </Grid>
              <Grid item xs={3} md={3} sm={3} lg={3}></Grid>
            </Grid>
            
            
            
          </div>
        </form>
        
       </div> 
        
      
            
        )
    }
}

const mapStateToProps = (state) => {
    return{
        loading:state.loading,
        error: state.error ,
        userid:state.userid
    }
}


const mapDispatchToProps = dispatch =>{
    return{
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)