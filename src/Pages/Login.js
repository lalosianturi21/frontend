
import "../Styles/login.css";
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";
import { Link } from "react-router-dom";
import image1 from "../Images/bookstore.png"
import { auth, provider } from './Config';
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login({ logado = false }) {
    const navigate = useNavigate();
    const handleLogin = (values) => {
        Axios.post("http://localhost:3008/login", {
            email: values.email,
            password: values.password,
        }).then((response) => {
            const page = response.data;

            if (page === true) {
                localStorage.setItem('@user', JSON.stringify(response.config.data));
                window.location.reload();
            } else {
                alert(response.data.msg);
            }
        });
    };

    const handleGoogleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log(user);
                navigate('/');
            })
            .catch((error) => {
                console.log(error.message);
            });
    };


    const validationsLogin = yup.object().shape({
        email: yup
            .string()
            .email("email invalid")
            .required("Masukkan email dengan benar"),
        password: yup
            .string()
            .min(8, "Password harus diisi dengan minimal 8 caracter")
            .required("Kata sandi dibutuhkan")
    });

    return (
        <section className='h-100 gradient-form section'>
            <div className='container py-5 h-100' >
                <div className='row d-flex justify-content-center align-items-center h-100 cardanimation' >
                    <div className='col-xl-10'>
                        <div className='card rounded-3 text-black' style={{ background: "#fee3ec" }}>
                            <div className='row g-0'>
                                <div className='col-lg-6'>
                                    <div className='card-body p-md-5 mx-md-4'>
                                        <div className='text-center imgtext'>
                                            <img src={image1}
                                                alt="logo" />
                                            <h4 className='mt-1 mb-5 pb-1 textjudul'>Welcome to book store</h4>
                                        </div>
                                        <Formik
                                            initialValues={{}}
                                            onSubmit={handleLogin}
                                            validationSchema={validationsLogin}
                                        >
                                            <Form>
                                                <div className="mb-5">
                                                    <p className="textlogin text-center" > <b> Please login to your account </b></p>
                                                </div>
                                                <label className="form-label textjudul" for="form2Example11" >Username</label>
                                                <div className="form-outline mb-4">
                                                    <Field
                                                        name="email"
                                                        className="form-input"
                                                        type="email"
                                                        id="form2Example11"
                                                        placeholder="Phone number or email address"
                                                        style={{ backgroundColor: "transparent", border: "none", width: "300px" }}
                                                    />
                                                    <ErrorMessage
                                                        component="span"
                                                        name="email"
                                                        className="form-error"
                                                    />
                                                    <div className="form-line"></div>
                                                </div>

                                                <label className='form-label pt-2 textjudul' for="form2Example22">Password</label>
                                                <div className='form-outline mb-4'>
                                                    <Field
                                                        name="password"
                                                        className="form-input"
                                                        type="password"
                                                        id="form2Example22"
                                                        placeholder="Your Password"
                                                        style={{ backgroundColor: "transparent", border: "none", width: "450px" }}
                                                    />
                                                    <ErrorMessage
                                                        component="span"
                                                        name="password"
                                                        className="form-error"
                                                    />
                                                    <div className='form-line'></div>
                                                </div>


                                                <div className='text-center pt-4 mb-5 pb-4'>
                                                    <button className='btn btn-black btn-block fa-lg gradient-custom-2 mb-3' type='submit'>Log In</button>
                                                </div>

                                                <div className='d-flex align-items-center justify-content-center pb-4 '>
                                                    <p className='mb-0 me-2 '>Don't have an account?</p>
                                                    {!logado && <Link to="/register" className='btn btn-black'>Create new</Link>}
                                                </div>
                                                {!logado && <Link to="/" className='d-flex align-items-center justify-content-center text-muted mb-3'>Back to Home</Link>}
                                            </Form>
                                        </Formik>
                                        <button className='btn btn-primary btn-block fa-lg mb-3 login-button' type='button' onClick={handleGoogleLogin}>
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google logo"></img> Login with google
                                        </button>
                                    </div>
                                </div>

                                <div className='col-lg-6 d-flex align-items-center gradient-custom-2'>
                                    <div className='text-white px-3 py-4 p-md-5 mx-md-4'>
                                        <h4 className='mb-4'>We are more than just a book store.</h4>
                                        <p className='small1 mb-3 typing' style={{ color: "black" }}>
                                            At our book store, we believe in the power of literature to inspire, educate, and transform individuals and communities. We are not just a place to buy books, but a space where people can come together to engage with ideas, explore different perspectives, and connect with each other.  </p>

                                        <p className='small1 mb-3 typing' style={{ color: "white" }}>Our book store is a hub of creativity and learning, where we host author talks, book clubs, writing workshops, and other events that promote intellectual curiosity and personal growth. We also strive to make our store welcoming and inclusive, with a diverse selection of books that represent a variety of voices and experiences.</p>

                                        <p className='small1 mb-3 typing' style={{ color: "brown" }}>
                                            In short, we are more than just a book store. We are a community of readers, writers, and thinkers who are passionate about sharing the joys of literature and fostering a love of learning.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;