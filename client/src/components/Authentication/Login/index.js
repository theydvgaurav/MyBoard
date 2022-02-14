import React, { useState } from "react";
import { Form, Formik, Field } from "formik";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import * as yup from 'yup';

import InputTextField from '../../EditProfile/TextField';

import '../authentication.css';

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

    const [isSubmit, setSubmit] = useState(false);

    const validationSchema = yup.object({
        selectedUserName: yup.string().required('This is a mandatory.'),
        selectedPassword: yup.string().required('This is a mandatory.')
    });

    const isValid = formikProps => {
        const {
          values,
        } = formikProps;
    
        return (values.selectedUserName
            && values.selectedPassword);
    };

    const onSubmitForm = () => {
        setSubmit(true);
    }

    const handleSignUp = () => {
        // setSignIn(!signIn);
    };

    return (
        <div className="mainContainer">
            <div className="sideImg">
                <img src={require('../../../assets/images/footer-image.png')} />
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
                        initialValues={{
                            selectedUserName: '',
                            selectedPassword: ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={onSubmitForm}
                    >
                        {formikProps => {
                            const {
                                values,
                                setFieldValue,
                                handleSubmit
                            } = formikProps;
                            return (
                                <Form
                                    autoComplete="off"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="inputContainer">
                                        <span className="label">User Name</span>
                                        <Field
                                            name="username"
                                            component={InputTextField}
                                            label="UserName"
                                            type="name"
                                            value={values.selectedUserName}
                                            handlechange={value => {
                                                setFieldValue('selectedUserName', value);
                                            }}
                                            // error={errors.selectedParentName}
                                        />
                                    </div>
                                    <div className="inputContainer">&nbsp;&nbsp;
                                        <span className="label">Password</span>
                                        <Field
                                            name="password"
                                            component={InputTextField}
                                            label="Password"
                                            type="password"
                                            value={values.selectedPassword}
                                            handlechange={value => {
                                                setFieldValue('selectedPassword', value);
                                            }}
                                            // error={errors.selectedParentName}
                                        />
                                    </div>
                                    <div className="buttonContainer">
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            className={classList.root}
                                            disabled={!isValid(formikProps) || isSubmit}
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