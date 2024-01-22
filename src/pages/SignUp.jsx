import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function SignUp() {
    const { register, handleSubmit } = useForm();

    function handleFormSubmit(data) {
        console.log(data);
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
                  type="text"
                  {...register("password", {
                      required: true,
                  })}
                  id="password-field"
              />
          </label>

          <label htmlFor="username-field">
              Gebruikersnaam:
              <input
                  type="password"
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