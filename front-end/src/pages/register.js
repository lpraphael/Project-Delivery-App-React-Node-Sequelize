import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { registerNewUserAction } from '../Redux/actions';
import { validateEmail,
  validateName, validatePassword } from '../services/registerValidation';
import { requestRegister } from '../services/request';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [failedTryRegister, setFailedTryRegister] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const dispatch = useDispatch();

  const register = async (event) => {
    event.preventDefault();

    try {
      await requestRegister('/register', { name, email, password });

      dispatch(registerNewUserAction({ name, email }));
      localStorage.setItem('user', JSON.stringify({
        name,
        email,
        role: 'customer',
      }));

      setIsRegistered(true);
    } catch (error) {
      setFailedTryRegister(true);
      setIsRegistered(false);
    }
  };

  useEffect(() => {
    setFailedTryRegister(false);
    const validation = validateName(name)
    && validateEmail(email)
    && validatePassword(password);

    if (validation) setIsDisabled(false);
    else setIsDisabled(true);
  }, [name, email, password]);

  if (isRegistered) return <Navigate to="/customer/products" />;

  return (
    <div className="flex flex-col justify-center items-center p-[50px]">
      <div
        className="flex flex-col justify-center items-center p-[50px]
        border-[1px] border-nord-frost-1"
      >
        <h1 className="text-nord-light-1 font-bold text-[30px]">Cadastro</h1>
        <form className="flex flex-col items-center">
          <label
            htmlFor="nome"
          >
            <input
              className="p-[5px] rounded-[5px] bg-nord-frost-1 text-nord-dark-1
              placeholder-nord-dark-1 m-[5px] w-[250px]"
              data-testid="common_register__input-name"
              id="nome"
              name="nome"
              placeholder="Seu nome"
              value={ name }
              onChange={ ({ target: { value } }) => setName(value) }
            />
          </label>
          <label
            htmlFor="email"
          >
            <input
              className="p-[5px] rounded-[5px] bg-nord-frost-1 text-nord-dark-1
            placeholder-nord-dark-1 m-[5px] w-[250px]"
              data-testid="common_register__input-email"
              id="email"
              name="email"
              placeholder="Seu email"
              type="email"
              value={ email }
              onChange={ ({ target: { value } }) => setEmail(value) }
            />
          </label>
          <label htmlFor="senha">
            <input
              className="p-[5px] rounded-[5px] bg-nord-frost-1 text-nord-dark-1
            placeholder-nord-dark-1 m-[5px] w-[250px]"
              data-testid="common_register__input-password"
              id="senha"
              name="senha"
              placeholder="******"
              type="password"
              value={ password }
              onChange={ ({ target: { value } }) => setPassword(value) }
            />
          </label>
          <button
            className="p-[5px] rounded-[5px] text-nord-light-1
            border-[1px] border-nord-frost-1 w-[100px]
            cursor-{
            disabled:hover:cursor-not-allowed
            hover:cursor-pointer
            hover:bg-nord-light-2 hover:text-nord-dark-1 hover:font-fontDic
            hover:font-medium disabled-cursor-not-allowed
        } m-[5px]"
            data-testid="common_register__button-register"
            name="cadastro"
            type="submit"
            disabled={ isDisabled }
            onClick={ (event) => register(event) }
          >
            Cadastrar
          </button>
        </form>
        <footer>
          { (failedTryRegister)
            ? (
              <p data-testid="common_register__element-invalid_register">
                Elemento oculto: Mensagens de erro
              </p>
            )
            : null }
        </footer>
      </div>
    </div>

  );
}

export default Register;
