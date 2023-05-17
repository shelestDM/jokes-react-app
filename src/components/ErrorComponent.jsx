import { Box } from "@mui/material";

const ErrorComponent = (props) => {

    return ( 
        <Box sx={{ fontSize: 14, p:4, width:'50%', textAlign:'center' , color:'red', m:'auto' ,backgroundColor:'#ef9a9a', borderRadius:3 }}>
            {props.error}
        </Box>
     );
}
 
export default ErrorComponent;