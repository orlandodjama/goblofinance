import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Menu from './Menu';
import axios from "axios";

import {connect} from 'react-redux';
import * as actions from '../store/actions/auth';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {TextField,Grid,Checkbox,FormControlLabel,RadioGroup,Radio,Dialog,DialogActions,DialogContent,
    DialogContentText,DialogTitle,Slide,Chip,Button,InputLabel,NativeSelect,FormHelperText,
    MenuItem,Select,FormControl,withStyles} from '@material-ui/core';



class Encaissement extends React.Component {

    constructor(props){
        super(props);
        this.handleSubmits=this.handleSubmits.bind(this);
        this.state = {
            test:[{matricule:'1'}],
            open:false,
            tabmontant:[],
            value:'',
            zone : [],
            age:'',
            zoneselec:'',
            secteurselect:'',
            Montant:'',
            activite:'',
            contact:'',
            type:'',
            raison_sociale:'',
            secteur : [],
            use_id_auteur:'',
            use_cont_id:'',
            matricule:'',
            matricules:[],
            user:'',
            dialogtext:'',
            showit:true,
            };
    }

    componentDidMount(){
        //this.props.onTryAutoSignup();
        console.log('ok');
        console.log(this.props.userid)
        this.setState({
            dialogtext:'Encaissement de'+this.state.Montant
        })
        axios.get(`https://www.goblomatrayi.com/goblofinance/retrouvezones/`)
                .then(res => {
                    console.log(res.data)
                    this.setState({
                        zone:res.data
                    },()=>{console.log(this.state.zone)})
                })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.userid !== this.props.userid) {
          var userids=this.props.userid;
          console.log(userids)
          this.setState({
            user: userids,
        },()=>{console.log(this.state.user)});
    }
    if(prevState.Montant!==this.state.Montant){
        this.setState({
            dialogtext:'Encaissement de '+this.state.raison_sociale+' '+this.state.Montant
        })
    }


}

    handleChange2 = (event) => {
        const zon = event.target.value;
        const name = event.target.name
        console.log(zon)
        this.setState({
            [name]: event.target.value
        });
    }


    handleChange3 = (event) => {
        const zon = event.target.value;
        const name = event.target.name
        console.log(event.target.value)
        this.setState({
            [name]: event.target.value,


        });
        axios.get(`https://www.goblomatrayi.com/goblofinance/retrouvecontribuable/${zon}`)
                .then(res => {
                    console.log(res.data)
                    this.setState({
                        matricules: res.data,
                        //tabmontant:this.state.tabmontant.concat({[res.data.matricule]:res.data.montant})

                    },()=>{
                        console.log(this.state.matricules)
                        console.log(this.state.test)
                        var tzb = Object.entries(this.state.matricules)
                        for ( const [i, v] of tzb){
                            console.log(v)
                            this.setState(prevState => ({
                                tabmontant: [...prevState.tabmontant, {[v.matricule]:v.montant}]
                              }),()=>{
                                console.log(this.state.tabmontant)
                            })
                        }

                    });
                })

      };

    handleChange = (event) => {
        const zon = event.target.value;
        const name = event.target.name
        console.log(event.target.value)
        this.setState({
            [name]: event.target.value,


        });
        axios.get(`https://www.goblomatrayi.com/goblofinance/retrouvesecteur/${zon}`)
                .then(res => {
                    console.log(res.data)
                    this.setState({
                        secteur: res.data,

                    });
                })

      };



      savecont=()=>{

      }

      handleSubmits(){
        //e.preventDefault();
        console.log(this.props.userid)
        //const userid=this.state.user
        const mat = this.state.matricule
        axios.post('https://www.goblomatrayi.com/goblofinance/encaissement/',{
            use_id_auteur:this.props.userid,
            use_cont_id:mat

        })
        .then(res => {
            console.log(res)
            this.setState({
                //open: false,
                showit:false,
                dialogtext:'Encaissement de Recu n°'+ res.data.Numrecu,

            });
        })
        .catch(err=>{
            console.log(err.response)
        })
      }

      handleClickOpen = () => {
        this.setState({
            open: true,
        });
      }

      handleClose = () => {
        this.setState({
            open: false,
            zoneselec:'',
        });
        window.location.reload(false)
      }



    render(){
        const {classes} = this.props;
        return (
           <div>
          
            <Grid container spacing={1} style={{ marginTop:'30px' }}>
            <Grid item xs={4} md={4} sm={4} lg={5}></Grid>
            <Grid item xs={4} md={4} sm={4} lg={2}>
            
            </Grid>
            <Grid item xs={4} md={4} sm={4} lg={5}></Grid>
            </Grid>


            <Grid container spacing={1} style={{marginTop:'40px'}}>
                <Grid item xs={1} md={2} sm={2} lg={2}></Grid>
                <Grid item xs={10} md={8} sm={8} lg={8} style={{}}>

                <Grid container spacing={2} style={{ marginBottom:'20px'}}>
                        <Grid item xs={6} md={6} sm={6} lg={6} style={{}}>
                            <FormControl  style={{width:'100%'}} >
                                <NativeSelect
                                value={this.state.zoneselec}
                                onChange={this.handleChange}
                                name="zoneselec"
                                inputProps={{ 'aria-label': 'zone' }}
                                >
                                <option value="">Zone</option>
                                {
                                    this.state.zone.map((number,index) =>
                                    (
                                    <option key={index} value={number.idzone}>{number.numzone}</option>

                                    ))
                                }
                                </NativeSelect>
                                <FormHelperText>Choisir la zone</FormHelperText>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} md={6} sm={6} lg={6} style={{}}>
                            <FormControl style={{width:'100%'}} >
                                <NativeSelect
                                value={this.state.secteurselect}
                                onChange={this.handleChange3}
                                name="secteurselect"
                                inputProps={{ 'aria-label': 'secteur' }}
                                >
                                <option value="">Secteur</option>
                                {
                                    this.state.secteur.map((number,index) =>
                                    (
                                    <option key={index} value={number.numsecteur} >{number.numsecteur}</option>
                                    ))
                                }
                                </NativeSelect>
                                <FormHelperText>Choisir le secteur</FormHelperText>
                            </FormControl>
                        </Grid>
                        </Grid>


                    <Grid item xs={12}  style={{}}>


                        <Autocomplete
                            style={{width:'100%',marginBottom:'80px'}}
                            onInputChange={(e)=>{console.log(e)}}
                            id="free-solo-demo"
                            /*onChange={(event, newValue) => {
                                console.log(newValue);
                                console.log(newValue.montant);
                                this.setState({
                                    matricule: newValue.matricule,
                                    Montant:newValue.montant,
                                    raison_sociale:newValue.nom
                                });
                              }}*/


                            freeSolo
                            options={this.state.test.map((option) => option.matricule)}
                            //getOptionLabel={(option) => option.matricule}
                            //getOptionLabel={option => option.matricule}
                            //renderOption={option => <>{option.matricule}</>}
                            renderInput={(params) => (
                            <TextField {...params} InputProps={{
                                
                                className: classes.TheInput
                              }} label="Matricule" margin="dense" style={{ height: 38 }} name="matricule"  margin="normal" variant="outlined"  />
                            )}
                        />


                        <Dialog
                            open={this.state.open}
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Validation"}</DialogTitle>
                            <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                               {this.state.dialogtext}
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                            {this.state.showit ? <Button onClick={this.handleSubmits} color="primary" autoFocus>Valider</Button> : <div></div>}
                            <Button onClick={this.handleClose} color="primary">
                               Fermer
                            </Button>

                            </DialogActions>
                        </Dialog>


                    </Grid>
                    {this.state.test.map((option,index) => <div>{option.matricule}</div>)}
            </Grid>
            <Grid item xs={1} md={2} sm={2} lg={2}>{this.props.userid}  </Grid>

            </Grid>
           </div>
        )
    }

}

    const styles = theme => ({
        TheInput: {
            fontSize: 30,
            lineHeight: 2.4
        }
    })



    export default withStyles(styles)(Encaissement);