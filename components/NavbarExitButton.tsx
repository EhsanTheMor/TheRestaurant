'use client'

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { signOut, useSession } from 'next-auth/react';
import axios from 'axios';
import Link from 'next/link';

export default function AccountMenu() {
     const { data: session } = useSession();

     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
     const open = Boolean(anchorEl);
     const handleClick = (event: React.MouseEvent<HTMLElement>) => {
          setAnchorEl(event.currentTarget);
     };
     const handleClose = () => {
          setAnchorEl(null);
     };
     return (
          <>
               <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <Tooltip title="مشخصات حساب">
                         <IconButton
                              onClick={handleClick}
                              size="small"
                              sx={{ ml: 2 }}
                              aria-controls={open ? 'account-menu' : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? 'true' : undefined}
                         >
                              <Avatar sx={{ width: 32, height: 32 }}>{session && session.user.name[0].toUpperCase()}</Avatar>
                         </IconButton>
                    </Tooltip>
               </Box>
               <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    transformOrigin={{ horizontal: 'center', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
               >
                    <MenuItem onClick={handleClose}>
                         <Link href={'/account'}>حساب کاربری</Link>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => signOut()}>
                         خروج
                    </MenuItem>
               </Menu>
          </ >
     );
}
