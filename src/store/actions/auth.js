import * as actionTypes from './actionTypes';
import axios from 'axios'
import fs from 'fs'
import { withRouter } from 'react-router-dom';
export const authStart = () => {
    return{
        type:actionTypes.AUTH_START
    }
}

export const authSuccess = user => {
    return{
        type:actionTypes.AUTH_SUCCESS,
        user
    }
}

export const authFail = error => {
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
        
    }
}

export const logout = () =>{
    localStorage.removeItem('user');
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}


export const checkAuthTimeout = expirationDate => {
    return dispatch => {
        setTimeout(()=>{
            dispatch(logout());
        }, expirationDate * 1000)
    }
}

export const authLogin = (username,password) => {

    return dispatch =>{
        dispatch(authStart());
        axios.post('https://www.trouvite.com/rest-auth/login/',{
            username:username,
            password:password
        })
        .then(res => {
            const user ={
                token : res.data.key,
                username,
                userid: res.data.user,
                expirationDate : new Date(new Date().getTime() + 3600*100)
            }
            
            const expirationDate = new Date(new Date().getTime() + 3600*100);
            localStorage.setItem('user',JSON.stringify(user));
            dispatch(authSuccess(user));
            dispatch(checkAuthTimeout(3600));
            console.log(res.data)
            let personne = {
                "prenom" : "Marie",
                "age" : 45,
                "passion" : "loisirs créatifs, histoire",
                "taille" : 172
             }
             let donnees = JSON.stringify(personne)
             
             fs.writeFile('personne2.json', donnees, function(erreur) {
                 if (erreur) {
                     console.log(erreur)}
                else{console.log("créé")}
             })
            
        })
        .catch(err=>{
            dispatch(authFail(err));
            console.log(err.response)
        })
    }
}





export const authSignup = (username,password1, password2) => {
    return dispatch =>{
        dispatch(authStart());
        const user = {
            username,         
            password1,
            password2,
            code:'abcd'
        }
        console.log(user)
        axios.post('https://www.trouvite.com/rest-auth/registration/',user)
        .then(res => {
            const user ={
                token : res.data.key,
                username,
                expirationDate : new Date(new Date().getTime() + 3600*100)
            }
            localStorage.setItem('user',JSON.stringify(user));
            dispatch(authSuccess(user));
            dispatch(checkAuthTimeout(3600))
        })
        .catch(err=>{
            dispatch(authFail(err));
            console.log(err.response);
        })
    }
}

export const authSignup2 = (username,code) => {
    return dispatch =>{
        dispatch(authStart());
        const user = {
            username,         
            password1:username+'n',
            password2:username+'n',
            code

        }
        console.log(user)
        axios.post('https://www.trouvite.com/rest-auth/registration/',user)
        .then(res => {
            const user ={
                token : res.data.key,
                username,
                expirationDate : new Date(new Date().getTime() + 3600*100)
            }
            localStorage.setItem('user',JSON.stringify(user));
            //dispatch(authSuccess(user));
            //dispatch(checkAuthTimeout(3600))
        })
        .catch(err=>{
            dispatch(authFail(err));
            console.log(err.response);
        })
    }
}

export const authCheckState = () =>{
    return dispatch =>{
        const user = JSON.parse(localStorage.getItem('user'));
        if(user === undefined || user===null){
            dispatch(logout());
        }else{
            const expirationDate = new Date(user.expirationDate)
            if(expirationDate<= new Date()){
                dispatch(logout());
            }else{
                dispatch(authSuccess(user));
                dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime() ) / 1000));
            }
        }
        
    }
}