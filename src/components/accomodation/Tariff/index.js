import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { firebaseTariffs } from '../../../firebase';
import { firebaseLooper } from '../../ui/misc';


class Tariff extends Component {

    state = {
        rows : [
            {persons: '2p X', ep:'3500', bb: '4500', map: '5500'},
            {persons: '1p X', ep:'3000', bb: '3500', map: '4000'},
            {persons: '+1p (for each person added)', ep:'500', bb: '1000', map: '1500'}
        ]
    }

    componentDidMount(){
        firebaseTariffs.once('value').then((snapshot) => {
            const tariffs = firebaseLooper(snapshot);
            console.log(tariffs);
            this.setState({
                rows: tariffs
            })
        }).catch( err => {
            console.log('err', err)
        })
    }

    render() {
        return (
            <div className="tariff-row row">
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell align="center">EP</TableCell>
                                <TableCell align="center">B&B</TableCell>
                                <TableCell align="center">MAP</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.rows.map((row) => (
                                <TableRow key={row.persons}>
                                    <TableCell component="th" scope="row">{row.persons}</TableCell>
                                    <TableCell align="right">{row.ep}</TableCell>
                                    <TableCell align="right">{row.bb}</TableCell>
                                    <TableCell align="right">{row.map}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                
                <div className="room-capacity">
                    <p className="table-footer">*(Prices are subjected to VAT)</p>
                    <div className="room-capacity-container">
                        <strong>Room capacity:</strong>
                        <span>2p X 2 rooms</span>
                        <span>3p X 5 rooms</span>
                        <span>4p X 1 rooms</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Tariff;
