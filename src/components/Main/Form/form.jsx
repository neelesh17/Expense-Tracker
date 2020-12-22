import React, {useState} from 'react'
import { TextField, Typography, Grid, FormControl, InputLabel, Button, Select, MenuItem} from "@material-ui/core";
import useStyles from './styles';

const Form = () => {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        amount: '',
        category: '',
        type: 'Income',
        date: new Date(),
    }); 
    const handleChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})
    }
    console.log(formData)
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
                        <MenuItem value="business">Business</MenuItem>
                        <MenuItem value="salary">Salary</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField name="amount" value={formData.amount} type="number" label="Amount" fullWidth onChange={handleChange}/>
            </Grid>
            <Grid item xs={6}>
                <TextField name="date" value={formData.date} type="date" label="Date" fullWidth onChange={handleChange} />
            </Grid>
            <Button className={classes.button} variant="outlined" color="primary" fullWidth>Create</Button>
        </Grid>
    )
}

export default Form;
