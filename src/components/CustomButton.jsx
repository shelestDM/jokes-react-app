import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const CustomButton = (props) => {
    return (
        <Stack spacing={2} direction="row" justifyContent="center" my={2}>
            <Button onClick={props.fetch} type={props.type}  variant="contained">
               {props.text}
            </Button>
        </Stack>
    );
}

export default CustomButton;