import { useState, useEffect, forwardRef } from "react";
import { Container, Box, Grid, Paper, Typography, TextField, Button, Snackbar, Slide } from '@mui/material';
import { Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';

function User() {
    const [userData, setUserData] = useState({ firstName: '', lastName: '', mobile: '', email: '', age: undefined });
    const [users, setUsers] = useState(null);
    const [error, setError] = useState(null);
    const [showError, setShowError] = useState(false);
    const [open, setOpen] = useState(false);
    const [transition, setTransition] = useState(undefined);

    useEffect(() => {
        if (error) {
            setShowError(true);
            handleClick(TransitionRight);
        }
    }, [error]);

    useEffect(() => {
        getAllUsers();
    }, []);

    const handleClick = (Transition) => {
        setTransition(() => Transition);
        setOpen(true);
    };

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const TransitionRight = (props) => {
        return <Slide {...props} direction="right" />;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
        setShowError(false);
    }

    const addUser = async (e) => {
        try {
            e.preventDefault();
            setError(null);
            const fetchOptions = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(userData) }

            const response = await fetch('http://localhost:5000/user', fetchOptions);

            if (!response.ok) {
                const msg = await response.json();
                throw new Error(`${msg.error}`);
            }
            else {
                window.location.reload();
            }
        } catch (error) {
            setError(error);
            console.error('Error getting the user:', error);
        }
    }

    const getAllUsers = async () => {
        try {
            const fetchOptions = { method: 'GET', headers: { 'Content-Type': 'application/json' } }

            const response = await fetch('http://localhost:5000/users', fetchOptions);

            if (!response.ok) {
                const msg = await response.json();
                throw new Error(`${msg.error}`);
            }
            else {
                const data = await response.json();
                setUsers(data.users);
            }
        } catch (error) {
            console.error('Error getting all the users:', error);
        }
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    return (
        < Container >
            <Snackbar open={open} onClose={handleClose} TransitionComponent={transition} autoHideDuration={5000}
                key={transition ? transition.name : ''}>
                <Alert onClose={handleClose} severity={showError ? 'error' : 'success'} sx={{ width: '100%' }}>{`${error}`}</Alert>
            </Snackbar>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { mx: 4, my: 6, width: 500, height: 525 } }}>
                <Paper elevation={24} >
                    <Container>
                        <Typography variant="h5" component="h2" marginBottom={3} marginTop={2} align='center'>Welcome to the user page</Typography>
                        <Box component="form" onSubmit={addUser}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField name="firstName" label="Enter your firstname" value={userData.firstName} onChange={handleChange} fullWidth required />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="lastName" label="Enter your lastname" value={userData.lastName} onChange={handleChange} fullWidth required />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="mobile" label="Enter your mobile" value={userData.mobile} onChange={handleChange} fullWidth required />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="email" label="Enter your email" value={userData.email} onChange={handleChange} fullWidth required />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="age" label="Enter your age" value={userData.age} onChange={handleChange} fullWidth required />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit" variant={'contained'} color={'success'} fullWidth>Add User</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Container>
                </Paper>

                <TableContainer component={Paper} elevation={24}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Mobile</StyledTableCell>
                                <StyledTableCell>Email</StyledTableCell>
                                <StyledTableCell>Age</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users && users.map((row) => (
                                <StyledTableRow key={row.firstName}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.firstName} {row.lastName}
                                    </StyledTableCell>
                                    <StyledTableCell>{row.mobile}</StyledTableCell>
                                    <StyledTableCell>{row.email}</StyledTableCell>
                                    <StyledTableCell>{row.age}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container >
    )
}

export default User;