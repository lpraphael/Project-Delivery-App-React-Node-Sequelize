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
    <>
      <h1>Cadastro</h1>
      <form>
        <label htmlFor="nome">
          <input
            data-testid="common_register__input-name"
            id="nome"
            name="nome"
            placeholder="Seu nome"
            value={ name }
            onChange={ ({ target: { value } }) => setName(value) }
          />
        </label>
        <label htmlFor="email">
          <input
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
    </>

  );
}

export default Register;
