import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../services/registerValidation';
import { actionUser } from '../Redux/actions';
import { setToken, signIn } from '../services/request';

const logo = require('../images/image2.png');

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

  const userLogged = JSON.parse(localStorage.getItem('user'));

  if (userLogged) return <Navigate to="/" />;

  const handleChange = ({ target: { name, value } }) => {
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const login = async (event) => {
    event.preventDefault();

    try {
      const result = await signIn('/login', user);

      const { id, name, role, email, token } = result.user;

      setToken({ token });

      dispatch(actionUser({ name, role, email }));
      localStorage.setItem('user', JSON.stringify({
        id,
        name,
        email,
        role,
        token: result.token,
      }));

      switch (role) {
      case 'customer':
        navigate('/customer/products');
        break;
      case 'seller':
        navigate('/seller/orders');
        break;
      case 'administrator':
        navigate('/admin/manage');
        break;
      default:
        break;
      }
    } catch (error) {
      setFailedTryLogin(true);
    }
  };

  return (
    <main className="flex flex-col justify-center items-center p-[50px]">
      <div
        className="flex flex-col justify-center items-center p-[50px]
      border-[1px] border-nord-frost-1"
      >
        <image />
        <img
          src={ logo }
          alt="logo"
          className="w-[150px]"
        />
        <h1 className="text-nord-light-1 font-bold text-[30px]">Login</h1>
        <label htmlFor="email" className="m-4">
          <input
            className="p-[5px] rounded-[5px] bg-nord-frost-1 text-nord-dark-1
          placeholder-nord-dark-1 w-[250px]"
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
            className="p-[5px] rounded-[5px] bg-nord-frost-1 text-nord-dark-1
          placeholder-nord-dark-1 w-[250px]"
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
          className="p-[5px] rounded-[5px] text-nord-light-1
          border-[1px] border-nord-frost-1 m-3 w-[100px]
          cursor-{
          disabled:hover:cursor-not-allowed
          hover:cursor-pointer
          hover:bg-nord-light-2 hover:text-nord-dark-1 hover:font-fontDic
          hover:font-medium disabled-cursor-not-allowed
        }"
          type="submit"
          data-testid="common_login__button-login"
          disabled={ disable }
          onClick={ (event) => login(event) }
        >
          LOGIN
        </button>
        <button
          className="p-[7px] rounded-[5px] text-nord-light-1
          border-[1px] border-nord-frost-1 hover:cursor-pointer
         hover:bg-nord-light-2 hover:text-nord-dark-1 hover:font-fontDic
          hover:font-medium"
          type="submit"
          data-testid="common_login__button-register"
          onClick={ () => navigate('/register') }
        >
          Ainda não tenho conta
        </button>
        { failedTryLogin
      && (
        <p
          className="text-nord-light-1 p-[5px]"
          data-testid="common_login__element-invalid-email"
        >
          {
            `O endereço de e-mail ou a senha não estão corretos.
            Por favor, tente novamente.`
          }
        </p>
      )}
      </div>
    </main>
  );
}

export default Login;
