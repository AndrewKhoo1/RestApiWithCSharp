import React, { useState, useEffect} from "react";
import { connect } from "react-redux";
import * as actions from "../actions/product";
import {
    Grid,
    Paper,
    TableCell,
    Table,
    TableRow,
    TableBody,
    TableContainer,
    TableHead,
    withStyles,
    ButtonGroup,
    Button
} from "@material-ui/core";
import ProductForm from "./ProductForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";

const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper :{
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})

const Products = ({classes,...props}) => {
    
    const [currentId, setCurrentId] = useState(0)
    
    useEffect(() => {
        props.fetchAllProducts()
    },[])
    
    const { addToast } = useToasts()
    
    const onDelete = id => {
        if(window.confirm('Are you sure you want to delete this record?'))
            props.deleteProduct(id,()=>addToast("Deleted successfully", { appearance: 'info' }))
    }
    
    
    return (
    <Paper className={classes.paper} elevation={3}>
        <Grid container>
            <Grid item xs={6}>
                <ProductForm {...({currentId, setCurrentId})}/>
            </Grid>
            <Grid item xs={6}>
                <TableContainer>
                    <Table>
                        <TableHead className={classes.root}>
                            <TableRow>
                                <TableCell>productId</TableCell>
                                <TableCell>name</TableCell>
                                <TableCell>color</TableCell>
                                <TableCell> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                props.productList.map((record, index)=> {
                                    return(<TableRow key={{index}} hover>
                                        <TableCell>{record.productId}</TableCell>
                                        <TableCell>{record.name}</TableCell>
                                        <TableCell>{record.color}</TableCell>
                                        <TableCell>
                                            <ButtonGroup variant="text">
                                                <Button>
                                                    <EditIcon 
                                                        color="primary"
                                                        onClick={()=>{setCurrentId(record.productId)}}/></Button>
                                                <Button><DeleteIcon color="secondary"
                                                onClick={() => onDelete(record.productId)}/>
                                                </Button>
                                            </ButtonGroup>
                                        </TableCell>
                                    </TableRow>)
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    </Paper>
    );
}

const mapStateToProps = state=> ({
        productList: state.product.list
    })

const mapActionToProps = {
    fetchAllProducts: actions.fetchAll,
    deleteProduct: actions.removeRecord
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Products));