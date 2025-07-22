import { Link, Outlet } from 'react-router-dom';

import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import JobView from './../components/JobView';


function Dashboard() {
    let navigate = useNavigate();
    const { user , logout } = useContext(AuthContext);
    const onLogout= () => {
      try{
        logout();
        navigate('/');
      }
      catch(error)
      {
        console.log(error)
      }
    } 
    const SeekLinks = ['JobView','Profile','MyApplications'];
    const HireLinks = ['Profile','MyJobs','Post'];
    var links=HireLinks;
    var front_role=0;
    //console.log(user.role)
    if(user.role.localeCompare("Hiring")==0)
        front_role=0;
    else if(user.role.localeCompare("Seeking")==0)
        front_role=1;
    const drawerWidth = 240;
    console.log(user)
    return (
    <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <Divider />
          <List>
            {(front_role?SeekLinks:HireLinks).map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <Link to={"/dashboard/"+text.toLowerCase()} style={{textDecoration: "none",marginRight:"10px"}}><ListItemText primary={text} /></Link>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    )
}

export default Dashboard;