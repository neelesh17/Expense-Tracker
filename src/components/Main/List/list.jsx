import React from 'react';
import { List as MUList, ListItem, ListItemAvatar, ListItemText, Avatar, ListItemSecondaryAction, IconButton, Slide} from '@material-ui/core';
import { Delete, MoneyOff} from '@material-ui/icons';
import useStyles from'./styles';

function List() {
    const classes = useStyles();
    const transactions = [
        {id:1, type: "Income", category: "Salary", amount :"50", date: "Tue Dec 21"},
        {id:2, type: "Expense", category: "Grosery", amount :"20", date: "Tue Dec 22"},
        {id:3, type: "Income", category: "Bussiness", amount :"150", date: "Tue Dec 22"}
    ];
    return (
        <MUList dense={false} className={classes.list}>
            {
                transactions.map((transaction) => (
                    <Slide direction="down" in mountOnEnter unmountOnExit key={transaction.id}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar className={transaction.type === "Income" ? classes.avatarIncome : classes.avatarExpense}>
                                    <MoneyOff />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={transaction.category} secondary={`$${transaction.amount} - ${transaction.date}`}/>
                            <ListItemSecondaryAction >
                                <IconButton edge="end" aria-label="Delete" onClick="">
                                    <Delete />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </Slide>
                ))
            }
        </MUList>
    )
}

export default List;
