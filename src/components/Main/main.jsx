import React from 'react'
import {Card, CardHeader, CardContent, Typography, Grid, Divider} from "@material-ui/core"
import Form from './Form/form';
import useStyles from './styles';

const Main = () => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardHeader title="Expense Tracker" subheader="Powered by Sppechly"/>
            <CardContent>
                <Typography align="center" variant="h5">Total Balance $100</Typography>
                <Typography variant="subtitle1" styles={{lineheight:'1.5em', marginTop: '20px'}}>
                    Try saying: Add income for $100 in Category for monday
                </Typography>
                <Divider />
                <Form />
                <CardContent className={classes.cardContent}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {/* <List></List> */}
                        </Grid>
                    </Grid>
                </CardContent>
            </CardContent>
        </Card>
    )
}

export default Main;
