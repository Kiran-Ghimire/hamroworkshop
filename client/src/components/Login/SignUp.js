import {
    Typography,
    Box,
    Paper,
    TextField,
    makeStyles,
    Grid,
    Button,
    Checkbox,
    Container
  } from "@material-ui/core";
  
  import React, { useEffect, useState } from "react";
  
  
  import { Formik, Form } from "formik";
  import * as Yup from "yup";
  import axios from "axios";
  
//   import GLogin from "./GLogin";
//   import FLogin from "./FLogin";
  
  import { Switch, Link, Route } from "react-router-dom";
  import {FcHome} from 'react-icons/fc';
  
  
  
  const useStyles = makeStyles({
    contactContainer: { marginTop: "10%", marginBottom: "10%" },
    paper: {
      width: "33rem",
      padding: "2.5rem", 
    },
    box: {
      display: "flex",
      justifyContent: "center",
      marginTop: "2rem",
    },
    submitBtn: {
      textAlign: "center",
      marginTop: "1.4rem",
    }
  });
  
  axios.defaults.withCredentials = true;
  
  const LoginSchema = Yup.object().shape({
    username: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required("Username is required"),
    email: Yup.string().email().required("Invalid Email!!"),
    password: Yup.string().required("Password is required"),
    confirmPassword:Yup.string().required("Password is required").oneOf(
      [Yup.ref("password"), null],
      "Passwords must match."
    )
  });
  
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    signUp: false,
  };
  
  const SignUp=() => {
    const [signupStatus, setSignupStatus] = useState(false);
    
  
    const onSubmit = (values) => {
      axios.post('/hamro/register',
      { values
       }).then((response) => {
         console.log(response.data.message);
       });
    
    };
  
    

    const classes = useStyles();
    
  
    return (
        <div className={classes.background}>
        <Container className={classes.contactContainer}>
        <Typography variant="h4" style={{ textAlign: "center", color: "#c28285" }}>
        <FcHome  style={{margin:'0 0.5rem -0.2rem 0' }} />Hamro Workshop
        </Typography>
        <Box className={classes.box}>
          <Paper className={classes.paper}>
            <Formik
              initialValues={initialValues}
              validationSchema={LoginSchema}
              onSubmit={onSubmit}
            >
              {({ errors, handleChange, touched, values, setFieldValue }) => (
                <Form>
                  <Grid container spacing={4}>
                  <Grid item xs={12}>
                  <TextField
                    label="Username"
                    size="small"
                    color="secondary"
                    fullWidth
                    name="username"
                    type="username"
                    id="username"
                    autoComplete="off"
                    error={errors.username && touched.username}
                    onChange={handleChange}
                    helperText={
                      errors.username && touched.username ? (
                        <Typography style={{ color: "#f44336" }}>
                          {errors.username}
                        </Typography>
                      ) : null
                    }
                  />
                </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Your Email"
                        size="small"
                        color="secondary"
                        fullWidth
                        name="email"
                        type="email"
                        id="email"
                        
                        error={errors.email && touched.email}
                        onChange={handleChange}
                        helperText={
                          errors.email && touched.email ? (
                            <Typography style={{ color: "#f44336" }}>
                              {errors.email}
                            </Typography>
                          ) : null
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {" "}
                      <TextField
                        label="Password"
                        size="small"
                        color="secondary"
                        fullWidth
                        id="password"
                        name="password"
                        type="password"
                        onChange={handleChange}
                        error={errors.password && touched.password}
                        helperText={
                          errors.password && touched.password ? (
                            <Typography style={{ color: "#f44336" }}>
                              {errors.password}
                            </Typography>
                          ) : null
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {" "}
                      <TextField
                        label="Confirm Password"
                        size="small"
                        color="secondary"
                        fullWidth
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        onChange={handleChange}
                        error={errors.confirmPassword && touched.confirmPassword}
                        helperText={
                          errors.confirmPassword && touched.confirmPassword ? (
                            <Typography style={{ color: "#f44336" }}>
                              {errors.confirmPassword}
                            </Typography>
                          ) : null
                        }
                      />
                    </Grid>
                    
                    <Box>
                      <Typography>
                        <Checkbox
                          style={{
                            paddingLeft: "1rem",
                            marginBottom: "0.3rem",
                          }}
                          color="default"
                          value={values.loggedIn}
                          onChange={(value) => setFieldValue("signUp", true)}
                        />
                        I accept the terms and conditions.
                      </Typography>
                    </Box>
                  </Grid>
                  <Box textAlign="center">
                    <Button 
                      type="submit"
                      size="large"
                      className={classes.submitBtn}
                      
                    >
                      Sign Up
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
            <hr style={{ backgroundColor: "white" }} />
          </Paper>
        </Box>
      </Container>
        </div>
    );
  }
  export default SignUp;
  
