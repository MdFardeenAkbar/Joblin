import { Link } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography, Button} from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { useNavigate } from "react-router-dom";

function Navbar() {
    let navigate = useNavigate();
    const { user , logout } = useContext(AuthContext);
    const onLogout= () => {
        logout();
        navigate('/');
    } 
    console.log(user)
    return (
        <Box sx={{flexGrow:1}}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h5" component="div">
                        <Link to="/" style={{textDecoration: "none",color:"white"}}>ReactLogin</Link>
                    </Typography>
                    <Box alignItems="right" sx={{flexGrow:1,textAlign:"right"}}>
                        { user ?
                        <>
                            <Button onClick={onLogout} style={{textDecoration: "none",color:"white",marginRight:"10px"}}>Sign Out</Button>
                        </>
                        :
                        <>
                            <Link to="/signin" style={{textDecoration: "none",color:"white",marginRight:"10px"}}>Sign In</Link>
                            <Link to="/signup" style={{textDecoration: "none",color:"white"}}>Sign Up</Link>       
                        </>
                        }
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar;