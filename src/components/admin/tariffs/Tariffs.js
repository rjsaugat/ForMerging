import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../HOC/AdminLayout'
import { firebaseTariffs } from '../../../firebase';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { firebaseLooper } from '../../ui/misc';
import CircularProgress from '@material-ui/core/CircularProgress'


class Tariffs extends Component {

    state = {
        rows: []
    }

    componentDidMount(){
        firebaseTariffs.once('value').then((snapshot) => {
            const tariffs = firebaseLooper(snapshot);
            this.setState({
                rows: tariffs
            })
        }).catch( err => {
            console.log('err', err)
        })
    }

    render() {
        return (
            <AdminLayout>
                <div className="container admin-tariff-container">
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
                                {
                                    this.state.rows.length ?
                                        this.state.rows.map((row, i) => (
                                            <TableRow key={i}>
                                                <TableCell component="th" scope="row">
                                                    <Link to={`/tariffs/add_tariff/${row.id}`}>{row.persons}</Link>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Link to={`/tariffs/add_tariff/${row.id}`}>{row.ep}</Link>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Link to={`/tariffs/add_tariff/${row.id}`}>{row.bb}</Link>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Link to={`/tariffs/add_tariff/${row.id}`}>{row.map}</Link>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    : <div style={{textAlign:'center'}}><CircularProgress /></div>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <p style={{textAlign: 'center'}}>Click on any row to edit the tariff details.</p>
            </AdminLayout>
        );
    }
}

export default Tariffs;