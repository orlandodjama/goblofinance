import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Menu(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{background:'white',boxShadow:'none'}}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color='primary' aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} color="primary" style={{background:'red',textAlign:'center'}}>
            
            {props.nompage}
          </Typography>

          <IconButton edge="end" color="primary">
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}