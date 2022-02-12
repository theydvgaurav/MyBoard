import React, { useState } from "react";
import { Form, Formik } from "formik";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import * as yup from 'yup';

import '../components.css';

const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: '#227aeb',
        color: 'white',
        '&:hover': {
            backgroundColor: '#1967CA',
        },
        borderRadius: '60px',
        boxShadow: 'none',
        width: '220px',
        'text-transform': 'capitalize'
    },
}));

const Login = () => {

    const classList = useStyles();

    const [signIn, setSignIn] = useState(false);

    const validationSchema = yup.object({
        selectedUserName: yup.string(),
        selectedPassword: yup.string()
    });

    const onSubmit = () => {

    }

    const handleSignIn = () => {
        setSignIn(!signIn);
    };

    const handleSignUp = () => {
        setSignIn(!signIn);
    };

    return (
        <div className="mainContainer">
            <div className="sideImg">
                <img src={require('../../assets/images/footer-image.png')} />
            </div>
            <div className="containerMainBody">

                <div className="ContainerBody">
                    <div className="formContainerHeading">
                        Get's Started
                    </div>
                    <div className="formContainerSubheading">
                        Not have an account? <span onClick={handleSignUp} className="formContainerLogIn">Sign Up</span>
                    </div>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validate={values => {
                            const errors = {};
                            if (!values.email) {
                                errors.email = 'Required';
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = 'Invalid email address';
                            }
                            return errors;
                        }}
                        onSubmit={onSubmit}
                    >
                        {formikProps => {
                            const {
                                values,
                                isValid,
                                handleSubmit
                            } = formikProps;
                            return (
                                <Form
                                    autoComplete="off"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="inputContainer">
                                        <span className="label">User Name</span>
                                        <TextField
                                            label="UserName"
                                            type="email"
                                            variant="standard"
                                            value={values.email}
                                        />
                                    </div>
                                    <div className="inputContainer">&nbsp;&nbsp;
                                        <span className="label">Password</span>
                                        <TextField
                                            label="Password"
                                            variant="standard"
                                            type="password"
                                            value={values.password}
                                        />
                                    </div>
                                    <div className="buttonContainer">
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            className={classList.root}
                                        // !isValid(formikProps) ||
                                        // disabled={isSubmit}
                                        >
                                            <div className="submit">Login</div>
                                        </Button>
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default Login;