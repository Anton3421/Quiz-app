import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';

function CustomAppBar() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (path: string) => {
        navigate(path);
        handleMenuClose();
    };

    return (
        <AppBar position="static" >
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenuOpen}
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={() => handleMenuItemClick('/')}>Home</MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick('/easy')}>Easy</MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick('/medium')}>Medium</MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick('/hard')}>Hard</MenuItem>
                </Menu>
                <Typography
                    variant="h6"
                    sx={{

                        fontWeight: 'bold',
                    }}
                >
                    Quiz App
                </Typography>
            </Toolbar>
        </AppBar>


    );
}

export default CustomAppBar;
