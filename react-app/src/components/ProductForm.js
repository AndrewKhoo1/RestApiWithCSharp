import React, {useState, useEffect} from "react";
import {
    Grid,
    InputLabel,
    Select,
    TextField,
    withStyles,
    FormControl,
    MenuItem,
    Button,
    FormHelperText
} from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/product";
import { useToasts } from "react-toast-notifications";
import axios from "axios";

const styles = theme =>({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    formControl: {
            margin: theme.spacing(1),
            minWidth: 230,
    },
    smMargin:{
        margin: theme.spacing(1)
    }
})
const initialFieldValues = {
    name: '',
    category: '',
    color: '',
    unitPrice: '',
    availableQuantity: ''
}

const ProductForm = ({classes, ...props}) => {
    
    const { addToast } = useToasts()

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }
    
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)
    
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);
    const storedJwt = localStorage.getItem('token');
    const [jwt, setJwt] = useState(storedJwt || null);
    
   const tokenUrl = "https://localhost:5001/api/token"
    
    const getJwt = async () => {
        const {data} = await axios.post(tokenUrl, {
            "Email": "InventoryAdmin@abc.com",
            "Password": "$admin@2017"
        })
        localStorage.setItem('token', data);
        setJwt(data);
    };
    
    const handleSubmit = e =>{
        e.preventDefault()
        if(validate())
        {   const onSuccess = () => {
            resetForm()
            addToast('Submitted successfully', {appearance: 'success'})
            }
            if(props.currentId == 0) 
                props.createProduct(values,onSuccess)
            else
                props.updateProduct(props.currentId, values, onSuccess)
        }
    }

    useEffect(() => {
        if (props.currentId != 0) {
            setValues({
                ...props.productList.find(x => x.productId == props.currentId)
            })
            setErrors({})
        }
            setErrors({})
    }, [props.currentId])
    
    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField 
                        name="name"
                        variant="outlined"
                        label="Name"
                        value={values.name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="category"
                        variant="outlined"
                        label="Category"
                        value={values.category}
                        onChange={handleInputChange}
                    />
                    <FormControl variant="outlined" className={classes.formControl}
                                 {...(errors.color && {error:true})}>
                        <InputLabel ref={inputLabel}>Color</InputLabel>
                        <Select
                            name="color"
                            value={values.color}
                            onChange={handleInputChange}
                            labelWidth={labelWidth}
                        >
                            <MenuItem value="">Select Color</MenuItem>
                            <MenuItem value="Red">Red</MenuItem>
                            <MenuItem value="Blue">Blue</MenuItem>
                            <MenuItem value="Yellow">Yellow</MenuItem>
                        </Select>
                        {errors.color && <FormHelperText>{errors.color}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name="unitPrice"
                        variant="outlined"
                        label="Unit Price"
                        value={values.unitPrice}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="availableQuantity"
                        variant="outlined"
                        label="Available Quantity"
                        value={values.availableQuantity}
                        onChange={handleInputChange}
                    />
                    <div>
                        <Button
                         variant="contained"
                         color="primary"
                         type="submit"
                         className={classes.smMargin}
                         >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.smMargin}
                            onClick={resetForm}
                        >
                            Reset
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.smMargin}
                            onClick={getJwt}
                            jwt={jwt}
                        >
                            GetJWT
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}

const mapStateToProps = state=> ({
    productList: state.product.list
});

const mapActionToProps = {
    createProduct: actions.create,
    updateProduct: actions.update
};

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(ProductForm));