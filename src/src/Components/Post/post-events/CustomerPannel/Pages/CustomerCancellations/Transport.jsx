import React, { useState, useEffect }  from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';




const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});



export default function Transport(props) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };


    let userId = props.myId;
  
    const [eventList, setEventList] = useState([]);
  
    useEffect(() => {
      fetch(
        `https://alphax-api.azurewebsites.net/api/transportservicereservations?userId=${userId}`    //`https://alphax-api.azurewebsites.net/api/eventplannerservicereservations/${userId}`
      )
        .then((response) => {
          return response.json();
        })
        .then((responseData) => {
          responseData = responseData.filter(item => item.cancellation != null);
          setEventList(responseData);
          console.log("response data->"+responseData);
        });
    }, [userId]);


  const classes = useStyles();


  return (
      <div>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Vehicle</StyledTableCell>
            <StyledTableCell align="right">PickUp Date & Time</StyledTableCell>
            <StyledTableCell align="right">PickUp Location</StyledTableCell>
            <StyledTableCell align="right">PricePerDay</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {eventList.map((row) => (
            <StyledTableRow key={row.transportService.name}>
              <StyledTableCell component="th" scope="row">
                {row.transportService.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.vehicleType}</StyledTableCell>
              <StyledTableCell align="right">{row.pickUpTime}</StyledTableCell>
              <StyledTableCell align="right">{row.pickUpLocation}</StyledTableCell>
              <StyledTableCell align="right">{row.price}$</StyledTableCell>
              
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{"Cancel Transport service?"}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
      Are you sure you want to cancel this service?, we will refund the amount based on Cancellation policy.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Disagree
      </Button>
      <Button onClick={handleClose} color="primary" autoFocus>
        Agree
      </Button>
    </DialogActions>
  </Dialog>
  </div>
  );
}
