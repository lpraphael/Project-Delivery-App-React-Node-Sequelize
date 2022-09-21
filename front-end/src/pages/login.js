import React, { useState, useEffect } from 'react';

function Login() {
  const [user, setUser] = useState({ password: '', email: '' });
  const [disable, setDisable] = useState(true);
  const [isLogged, setIsLogged] = useState(true);
  // const history = useHistory();

  useEffect(() => {
    const MIN_LENGTH = 6;
    const { password, email } = user;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validateEmail = regexEmail.test(email);
    if (password.length >= MIN_LENGTH && validateEmail) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [user]);

  const handleChange = ({ target: { name, value } }) => {
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email: user.email }));

    const login = true;

    if (!login) {
      setIsLogged(false);
    }
  };

  return (
    <main>
      <h1>Login</h1>
      <label htmlFor="email">
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          value={ user.email }
          onChange={ handleChange }
          data-testid="common_login__input-email"
        />
      </label>
      <label htmlFor="password">
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Senha"
          value={ user.password }
          onChange={ handleChange }
          data-testid="common_login__input-password"
        />
      </label>
      <button
        type="button"
        data-testid="common_login__button-login"
        disabled={ disable }
        onClick={ handleClick }
      >
        LOGIN
      </button>
      <p hidden={ isLogged }>mensagem de erro!</p>
    </main>
  );
}

export default Login;
