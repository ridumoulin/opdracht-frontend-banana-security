import React, { useContext } from 'react';
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from "axios";


function SignIn() {
    const authContext = useContext(AuthContext);

    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const baseUrl = 'http://localhost:3000';

    const handleLogin = async (data) => {
        const { email } = data;
        await authContext.login(email);
        signIn(data);
    };

    async function signIn(data) {
        try {
            const response = await axios.post(`${baseUrl}/login`, data);
            const { accesstoken } = response.data;
            console.log("User signed in successfully:", accesstoken);
            login(accesstoken);
        } catch (error) {
            console.error("Error met inloggen:", error.response.data);
        } finally {
            navigate('/profile')
        }
    }

  return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

        <form onSubmit={handleSubmit(handleLogin)}>
            <label htmlFor="email-field">
                E-mailadres:
                <input
                    type="text"
                    {...register("email", {
                        required: true,
                        validate: (value) => value.includes('@'),
                    })}
                    id="email-field"
                />
            </label>

            <label htmlFor="password-field">
                Wachtwoord:
                <input
                    type="password"
                    {...register("password", {
                        required: true,
                    })}
                    id="password-field"
                />
            </label>
            <button type="submit">Inloggen</button>
        </form>

      <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
    </>
  );
}

export default SignIn;