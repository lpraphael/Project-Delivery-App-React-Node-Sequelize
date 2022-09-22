import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../services/registerValidation';
import { signIn } from '../services/request';

function Login() {
  const [user, setUser] = useState({ password: '', email: '' });
  const [disable, setDisable] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [failedTryLogin, setFailedTryLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setFailedTryLogin(false);
    const { password, email } = user;
    const validation = validateEmail(email) && validatePassword(password);
    if (validation) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [user]);

  const handleChange = ({ target: { name, value } }) => {
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const login = async (event) => {
    event.preventDefault();

    try {
      const { role } = await signIn('/login', { email, password });

      setToken(token);

      localStorage.setItem('role', role);

      setIsLogged(true);
    } catch (error) {
      setFailedTryLogin(true);
      setIsLogged(false);
    }
  };

  if (isLogged) return <Navigate to="/customer/products" />;

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
        onClick={ login }
      >
        LOGIN
      </button>
      <button
        type="button"
        data-testid="common_login__button-login"
        onClick={ () => navigate('/register') }
      >
        Ainda não tenho conta
      </button>
      { failedTryLogin
      && (
        <p data-testid="common_login__element-invalid-email">
          {
            `O endereço de e-mail ou a senha não estão corretos.
            Por favor, tente novamente.`
          }
        </p>
      )}
    </main>
  );
}

export default Login;
