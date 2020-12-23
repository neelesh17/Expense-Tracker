import React, {useContext} from 'react'
import {Card, CardHeader, CardContent, Typography, Grid, Divider} from "@material-ui/core"
import {ExpenseTrackerContext} from '../../context/context';
import Form from './Form/form';
import List from './List/list';
import useStyles from './styles';
import InfoCard from '../InfoCard';

const Main = () => {
    const classes = useStyles();
    const {balance} = useContext(ExpenseTrackerContext);
    return (
        <Card className={classes.root}>
            <CardHeader title="Expense Tracker" subheader="Powered by Speechly"/>
            <CardContent>
                <Typography align="center" variant="h5">Total Balance ${balance}</Typography>
                <Typography variant="subtitle1" styles={{lineheight:'1.5em', marginTop: '20px'}}>
                    <InfoCard />
                </Typography>
                <Divider className={classes.divider} />
                <Form />
                <CardContent className={classes.cardContent}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <List/>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardContent>
        </Card>
    )
}

export default Main;
