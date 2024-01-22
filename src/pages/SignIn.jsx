import React, { useContext } from 'react';
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function SignIn() {
    const authContext = useContext(AuthContext);

    const { register, handleSubmit } = useForm();

    const handleLogin = (data) => {
        const { email } = data;
        authContext.login(email);
    };


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