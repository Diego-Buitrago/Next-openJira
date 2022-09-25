import { useContext } from "react";
import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"

import InboxIcon from '@mui/icons-material/Inbox';
import EmailIcon from '@mui/icons-material/Email';

import { UIContext } from "../../context/ui";

const menuItems: string[] = ['Inbox', 'Starred', 'Send', 'Email', 'Drafts']

export const Sidebar = () => {

    const { sidemenuOpen, closeSidebarMenu } = useContext(UIContext);

    return (
        <Drawer
            anchor="left"
            open={ sidemenuOpen }
            onClose={ closeSidebarMenu }
        >
            <Box sx={{width: 250}}>
                <Box sx={{padding: '5px 10px'}}>
                    <Typography variant="h4">Menu</Typography>
                </Box>
                <List>
                    {
                        menuItems.map((text, index) => (
                            <ListItem key={text} button>
                                <ListItemIcon>
                                    {index % 2 ? <InboxIcon /> : <EmailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))
                    }
                </List>
                <Divider />
            </Box>
        </Drawer>
    )
}
