import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
//import jwt from 'jsonwebtoken';
import config  from '../config/config';


export default function ResetPassword() {
    const navigate = useNavigate();
    const alert = useAlert();
    const query = useQuery();

    const [values, setValues] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        open: false,
        error: ''
    })

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    const getToken = () => {
        let token = query.get("token");
        return token;
    }

    const verifyToken = (token) => {
        jwt.verify(getToken(), 'resume', function (err, decoded) {
        });
    }

    const goto = (res) => {
        if (res.status === 200) {
            alert.success("Password reset successful");
            alert.info("Redirecting you to login page")
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } else {
            alert.error("Invalid token");
        }
    }

    const create = async (user) => {
        try {
            let response = await fetch(`${config.REACT_APP_API_URL}/api/password/reset`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            goto(response);
            return response
        } catch (err) {
            console.log(err)
        }
    }

    const clickSubmit = (event) => {
        event.preventDefault();

        const token = getToken();
        const payload = jwt.decode(token);
        const userEmail = payload.email;

        const user = {
            password: values.password || undefined,
            email: userEmail || undefined,
            token: token || undefined
        }

        if (verifyToken()) {
            create(user).then((data) => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({ ...values, error: '', open: true })
                }
            })
        } else {
            alert.error("Invalid token");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <VpnKeyIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Reset Password
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="password"
                                onChange={handleChange('password')}
                                value={values.password}
                                label="Password"
                                name="password"
                                autoComplete="password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="confirmPassword"
                                onChange={handleChange('confirmPassword')}
                                value={values.confirmPassword}
                                label="Confirm Password"
                                name="confirmPassword"
                                autoComplete="Confirm Password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={clickSubmit}
                    >
                        Reset
                    </Button>
                </form>
            </div>
        </Container>
    );
}
