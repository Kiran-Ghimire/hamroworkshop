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
  import { useDispatch} from 'react-redux';

  

  
  import { Formik, Form } from "formik";
  import * as Yup from "yup";
  import axios from "axios";
  
//   import GLogin from "./GLogin";
//   import FLogin from "./FLogin";
import { useHistory, Link } from "react-router-dom";
  
  import {FcHome} from 'react-icons/fc';

  import GoogleLog from './GoogleLog';
  import {fetchUser} from '../../actions/index';
  
  
  
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
    email: Yup.string().email().required("Invalid Email!!"),
    password: Yup.string().required("Password is required"),
    
  });
  
  const initialValues = {
    email: "",
    password: "",
    loggedIn: false,
  };
  
  const Login=() => {
    let history = useHistory();
    const [loginStatus, setLoginStatus] = useState(false);

    const  dispatch = useDispatch()
  
    const onSubmit = (values) => {
      axios.post('/hamro/login',
      { values})
      .then((response) => {
         dispatch(fetchUser(response.data))
         localStorage.setItem("token", response.data.token)
         console.log(response.data.result)
       });
    
    };

  const userAuthenticated= () => {
    axios.get("/isUserAuth", {headers:{
      "x-access-token": localStorage.getItem("token"),
    }
    }).then((response) => {
      response.data.auth === true &&
          setTimeout(() => {
            history.push("/");
          }, 1500);
  })
  .catch((err) => console.log(err));
  }
  
    const classes = useStyles();

    useEffect(() => {
      axios.get("/hamro/login").then((response) => {
        response.data.loggedIn === true && setLoginStatus(true);
        console.log(response.data);
        setTimeout(() => {
          history.push("/");
        }, 1500);
      });
    }, []);
    
  
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
                            <Typography style={{ color: "#f5f5f5" }}>
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
                            <Typography style={{ color: "#f5f5f5" }}>
                              {errors.password}
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
                          onChange={(value) => setFieldValue("loggedIn", true)}
                        />
                        Keep me logged in.
                      </Typography>
                    </Box>
                  </Grid>
                  <Box textAlign="center">
                    <Button
                      type="submit"
                      size="large"
                      className={classes.submitBtn}
                      onClick={userAuthenticated}
                    >
                      Login
                    </Button>
                    
                  </Box>
                </Form>
              )}
            </Formik>
  
            <hr style={{ backgroundColor: "white" }} />
            <Box textAlign= 'center'><GoogleLog  /></Box>
          </Paper>
          
          
        </Box>
      </Container>
        </div>
      
    );
  }
  
  export default Login;
  