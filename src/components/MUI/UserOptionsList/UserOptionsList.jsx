import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

export default function UserOptionsList() {
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper',boxShadow:'0 0 10px 0 #000' }}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <PowerSettingsNewIcon fontSize='small' />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Photos" secondary="Jan 9, 2014" />
            </ListItem>
        </List>
    );
}
