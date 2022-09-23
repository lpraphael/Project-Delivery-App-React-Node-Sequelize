import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../services/registerValidation';
import { actionUser } from '../Redux/actions';
import { signIn } from '../services/request';

function Login() {
  const [user, setUser] = useState({ password: '', email: '' });
  const [disable, setDisable] = useState(true);
  const [failedTryLogin, setFailedTryLogin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      const result = await signIn('/login', user);

      const { name, role, email } = result.user;

      dispatch(actionUser({ name, role, email }));

      localStorage.setItem('role', role);
      localStorage.setItem('name', name);

      navigate('/customer/products');
    } catch (error) {
      setFailedTryLogin(true);
    }
  };

  return (
    <main>
      <image />
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
        type="submit"
        data-testid="common_login__button-login"
        disabled={ disable }
        onClick={ (event) => login(event) }
      >
        LOGIN
      </button>
      <button
        type="button"
        data-testid="common_login__button-register"
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
