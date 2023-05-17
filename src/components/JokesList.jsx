import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import JokeCard from './JokeCard';

const JokesList = (props) => {

    return (
        <List sx={{ width: '90%', boxSizing: 'border-box', maxWidth: 600, p: 4, mx: 'auto', bgcolor: '#bbdefb', borderRadius: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {props.jokes.map((joke) =>
                <ListItem sx={{ display: 'flex', justifyContent: 'center' }} key={joke.id}>
                    <JokeCard joke={joke} />
                </ListItem>
            )}
        </List>
    );
}

export default JokesList;