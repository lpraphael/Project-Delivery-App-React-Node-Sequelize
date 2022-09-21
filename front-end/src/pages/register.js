import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import requestRegister from '../services/request';

function Register() {
  const [nameRegistered, setNameRegistered] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [failedTryRegister, setFailedTryRegister] = useState(false);

  const register = async (event) => {
    event.preventDefault();

    try {
      await requestRegister('/register', { nameRegistered, email, password });
      setIsRegistered(true);
    } catch (error) {
      setFailedTryRegister(true);
      setIsRegistered(false);
    }
  };

  useEffect(() => {
    setFailedTryRegister(false);
  }, [nameRegistered, email, password]);

  if (isRegistered) return <Navigate to="/customer/products" />;

  return (
    <>
      <header>Cadastro</header>
      <main>
        <label htmlFor="nome">
          <input
            data-testid="common_register__input-name"
            id="nome"
            name="nome"
            placeholder="Seu nome"
            value={ nameRegistered }
            onChange={ ({ target: { value } }) => setNameRegistered(value) }
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
            value={ password }
            onChange={ ({ target: { value } }) => setPassword(value) }
          />
        </label>
        <button
          data-testid="common_register__button-register"
          name="cadastro"
          type="submit"
          onClick={ (event) => register(event) }
        >
          Cadastrar
        </button>
      </main>
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
