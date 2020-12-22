import React, {useState, useContext} from 'react'
import { TextField, Typography, Grid, FormControl, InputLabel, Button, Select, MenuItem} from "@material-ui/core";
import useStyles from './styles';
import {ExpenseTrackerContext} from '../../../context/context';
import { v4 as uuidv4 } from 'uuid';
import { incomeCategories, expenseCategories } from '../../../constants/categories';
import formatDate from '../../../utils/formatDate';

const initialState = {
    amount: '',
    category: '',
    type: 'Income',
    date: formatDate(new Date()),
}
const Form = () => {
    const classes = useStyles();
    const [formData, setFormData] = useState(initialState); 
    const handleChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        if([name] === "date")
            setFormData({...formData, [name]: formatDate(value)})
        else
            setFormData({...formData, [name]: value})
    }
    const {addTransaction} = useContext(ExpenseTrackerContext);
    
    const createTransaction = () => {
        const transaction = {
            ...formData, 
            amount: Number(formData.amount),
            id: uuidv4()
        }
        addTransaction(transaction);
        setFormData(initialState);
    }
    const selectedCategories = formData.type === "Income" ? incomeCategories : expenseCategories;
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography align="center" varient="subtitle2" gutterBottom>
                    .......
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select name="type" value={formData.type} onChange={handleChange}>
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select name="category" value={formData.category} onChange={handleChange}>
                        {
                            selectedCategories.map((c) => (
                                <MenuItem key={c.type} value={c.type}>{c.type}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField name="amount" value={formData.amount} type="number" label="Amount" fullWidth onChange={handleChange}/>
            </Grid>
            <Grid item xs={6}>
                <TextField name="date" value={formData.date} type="date" label="Date" fullWidth onChange={handleChange} />
            </Grid>
            <Button className={classes.button} variant="outlined" color="primary" fullWidth onClick={createTransaction}>Create</Button>
        </Grid>
    )
}

export default Form;
