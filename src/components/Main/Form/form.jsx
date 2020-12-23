import React, {useState, useEffect, useContext} from 'react'
import { TextField, Typography, Grid, FormControl, InputLabel, Button, Select, MenuItem} from "@material-ui/core";
import useStyles from './styles';
import {ExpenseTrackerContext} from '../../../context/context';
import { useSpeechContext } from '@speechly/react-client';
import { v4 as uuidv4 } from 'uuid';
import { incomeCategories, expenseCategories } from '../../../constants/categories';
import formatDate from '../../../utils/formatDate';
import CustomizedSnackbar from '../../Snackbar/snackbar';

const initialState = {
    amount: '',
    category: '',
    type: 'Income',
    date: formatDate(new Date()),
}
const Form = () => {
    const classes = useStyles();
    const [formData, setFormData] = useState(initialState); 
    const [open, setOpen] = useState(false);
    const handleChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        if([name] === "date")
            setFormData({...formData, [name]: formatDate(value)})
        else
            setFormData({...formData, [name]: value})
    }
    const {addTransaction} = useContext(ExpenseTrackerContext);
    const {segment} = useSpeechContext();
    const createTransaction = () => {
        if(Number.isNaN(Number(formData.amount)) || !formData.date.includes('-')) return;
        const transaction = {
            ...formData, 
            amount: Number(formData.amount),
            id: uuidv4()
        }
        setOpen(true);
        addTransaction(transaction);
        setFormData(initialState);
    }

    useEffect(() => {
        if(segment){
            if(segment.intent.intent === 'add_expense') {
                setFormData({...formData, type: 'Expense'});
            } else if(segment.intent.intent === 'add_income'){
                setFormData({...formData, type: 'Income'});
            } else if(segment.isFinal && segment.intent.intent === "create_transaction"){
                return createTransaction();
            } else if(segment.isFinal && segment.intent.intent === "cancel_transaction"){
                setFormData(initialState);
            }

            segment.entities.forEach((e) => {
                const category = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`;
                switch(e.type){
                    case 'amount': 
                        setFormData({...formData, amount: e.value});
                        break;
                    case 'category': 
                        if(incomeCategories.map((ic) => ic.type).includes(category)){
                            setFormData({...formData, type: 'Income', category});
                        }else if(expenseCategories.map((ec) => ec.type).includes(category)){
                            setFormData({...formData, type: 'Expense', category});
                        }        
                        break;
                    case 'date': 
                        setFormData({...formData, date: e.value});
                        break;
                    default : break;
                }
            });

            if(segment.isFinal && formData.amount && formData.category && formData.type && formData.date){
                createTransaction();
            }
        }
    }, [segment]);

    const selectedCategories = formData.type === "Income" ? incomeCategories : expenseCategories;
    return (
        <Grid container spacing={2}>
            <CustomizedSnackbar open={open} setOpen={setOpen}/>
            <Grid item xs={12}>
                <Typography align="center" varient="subtitle2" gutterBottom>
                    {
                        segment && segment.words.map((w) => w.value).join(" ")
                    } 
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
