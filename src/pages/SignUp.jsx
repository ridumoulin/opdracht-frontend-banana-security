import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function SignUp() {
    const { register, handleSubmit } = useForm();
    const baseUrl = 'http://localhost:3000';
    const navigate = useNavigate();

    function handleFormSubmit(data) {
        signUp(data);
    }

    console.log("Gebuiker is geregistreerd");

    async function signUp(data) {
        try {
            const response = await axios.post(`${baseUrl}/register`, data);
            console.log("User registered successfully:", response.data);
        } catch (error) {
            console.error("Error registering user:", error.response.data);
        } finally {
            navigate('/signin')
        }
    }

  return (
    <>
      <h1>Registreren</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
        harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
        doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
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

          <label htmlFor="username-field">
              Gebruikersnaam:
              <input
                  type="text"
                  {...register("username", {
                      required: true,
                  })}
                  id="username-field"
              />
          </label>

          <button type="submit">Registreren</button>
      </form>

      <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
    </>
  );
}

export default SignUp;