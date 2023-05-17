import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const JokeCard = (props) => {
    return (
        <Card sx={{boxSizing: 'border-box', textAlign: 'center', width: 500}} >
            <CardContent>
                <Typography sx={{ fontSize: 14, mb: 2 }} color="text.secondary" >
                    {props.joke.type}
                </Typography>
                <Typography variant="h5" component="div">
                    {props.joke.setup}
                </Typography>
                <Typography color="text.secondary">
                    {props.joke.punchline}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default JokeCard;