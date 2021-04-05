import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import Menu from './Menu';
import {TextField,Grid,Checkbox,FormControlLabel,RadioGroup,Radio,
    Chip,Button,InputLabel,NativeSelect,FormHelperText,
    MenuItem,Select,FormControl} from '@material-ui/core';



class Ajout extends React.Component {
  
    constructor(){
        super();
        this.state = {
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
            };
    }

    componentDidMount(){
        axios.get(`https://www.trouvite.com/troovite/retrouvezones/`)
                .then(res => {
                    console.log(res.data)
                    this.setState({
                        zone:res.data
                    },()=>{console.log(this.state.zone)})
                })
    }

    handleChange2 = (event) => {
        const zon = event.target.value;
        const name = event.target.name
        console.log(zon)
        this.setState({
            [name]: event.target.value  
        });
    }

    handleChange = (event) => {
        const zon = event.target.value;
        const name = event.target.name
        console.log(event.target.value)
        this.setState({
            [name]: event.target.value,
           
           
        });
        axios.get(`https://www.trouvite.com/troovite/retrouvesecteur/${zon}`)
                .then(res => {
                    console.log(res.data)
                    this.setState({
                        secteur: res.data,
                       
                    });
                })
        //console.log(event.target.value[value])
        //const sect = event.target.value
        /*this.setState({
            secteur:['b','h','3','8']
        })*/
      };

      savecont=()=>{
        axios.post('https://www.trouvite.com/troovite/creationcont/',{
            raison_sociale:this.state.raison_sociale,
            activite:this.state.activite,
            Montant:this.state.Montant,
            contact:this.state.contact,
            type:this.state.type,
            zoneselec:this.state.zoneselec,
            secteurselect:this.state.secteurselect
        })
        .then(res => {
            console.log(res)
        })
        .catch(err=>{
            console.log(err.response)
        })
      }

    render(){
        return (
           <div>
              <Menu nompage='Ajout'/>

                <Grid container spacing={2} style={{marginTop:'40px'}}>
                <Grid item xs={2} md={2} sm={2} lg={2}></Grid>
                <Grid item xs={8} md={8} sm={8} lg={8}>
                    <Grid container spacing={2} style={{ marginBottom:'20px'}}>
                    <Grid item xs={6} md={6} sm={6} lg={6}>
                        <FormControl style={{width:'100%'}} >
                            <NativeSelect
                            //value={this.state.zoneselec}
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
                            <FormHelperText>With visually hidden label</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6} sm={6} lg={6}>
                        <FormControl style={{width:'100%'}}>
                            <NativeSelect
                            //value={this.state.zoneselec}
                            onChange={this.handleChange2}
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
                            <FormHelperText>With visually hidden label</FormHelperText>
                        </FormControl>
                    </Grid>
                    </Grid>

                    <Grid item xs={12} md={12} sm={12} lg={12} style={{ marginBottom:'20px'}}>
                        <TextField style={{width:'100%'}} label="Nom / Raison sociale" name="raison_sociale" onChange={this.handleChange2}/>
                    </Grid>

                    <Grid item xs={12} md={12} sm={12} lg={12} style={{ marginBottom:'20px'}}>
                        <TextField  style={{width:'100%'}} label="Activite" name="activite" onChange={this.handleChange2}/>
                    </Grid>

                    <Grid item xs={12} md={12} sm={12} lg={12} style={{ marginBottom:'20px'}}>
                        <TextField  style={{width:'100%'}} label="Montant" name="Montant" onChange={this.handleChange2}/>
                    </Grid>

                    <Grid item xs={12} md={12} sm={12} lg={12} style={{ marginBottom:'20px'}}>
                        <TextField  style={{width:'100%'}} label="Contact" name="contact" onChange={this.handleChange2}/>
                    </Grid>

                    <Grid container spacing={2} style={{ marginBottom:'20px'}}>
                        <RadioGroup aria-label="gender" name="type"  onChange={this.handleChange2} style={{width:'100%'}}>
                        <Grid container spacing={2} >
                            <Grid item xs={3} md={3} sm={3} lg={3}></Grid>
                            <Grid item xs={3} md={3} sm={3} lg={3} style={{}}>
                                <FormControlLabel value="Jour" control={<Radio />} label="Jour" />
                            </Grid>
                            <Grid item xs={3} md={3} sm={3} lg={3} style={{}}>
                                <FormControlLabel value="Mois" control={<Radio />} label="Mois" />
                            </Grid>
                            <Grid item xs={3} md={3} sm={3} lg={3}></Grid>
                        </Grid>
                        </RadioGroup>                   
                    </Grid>

                    <Grid item xs={12} md={12} sm={12} lg={12} style={{ marginBottom:'20px'}}>
                        <Button style={{width:'100%',background:'black',color:'white'}} variant="contained"  type="submit" onClick={this.savecont}>
                        Submit
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={2} md={2} sm={2} lg={2}></Grid>      
                </Grid>

              
           </div>
        )
    }

    }
    export default Ajout