import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { adminRegister } from '../services/request';
import { registerAdmin } from '../Redux/actions';
import NavBar from '../components/navBar';
import { validateEmail, validateName, validatePassword }
  from '../services/registerValidation';

function Admin() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [failedTryRegister, setfailedTryRegister] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const dispatch = useDispatch();
  const register = async (event) => {
    event.preventDefault();
    try {
      await adminRegister('/admin/manage', { name, email, password, role });
      dispatch(registerAdmin({ name, email, role }));
      localStorage.setItem('user', JSON.stringify({
        name,
        email,
        password,
        role,
      }));
      setIsRegistered(true);
    } catch (error) {
      setfailedTryRegister(true);
      setIsRegistered(false);
    }
  };
  useEffect(() => {
    setfailedTryRegister(false);
    const validation = validateName(name)
    && validateEmail(email)
    && validatePassword(password);
    if (validation) setIsDisabled(false);
    else setIsDisabled(true);
  }, [name, email, password]);
  if (isRegistered) return 'teste';
  return (
    <>
      <NavBar />
      <h1>Cadastrar novos usuários</h1>
      <form>
        <label htmlFor="name">
          <input
            data-testid="admin_manage__input-name"
            id="name"
            name="name"
            placeholder="Nome e sobrenome"
            value={ name }
            onChange={ ({ target: { value } }) => setName(value) }
          />
        </label>
        <label htmlFor="email">
          <input
            data-testid="admin_manage__input-email"
            id="email"
            name="email"
            placeholder="seu-email@site.com.br"
            type="email"
            value={ email }
            onChange={ ({ target: { value } }) => setEmail(value) }
          />
        </label>
        <label htmlFor="senha">
          <input
            data-testid="admin_manage__input-password"
            id="senha"
            name="senha"
            placeholder="******"
            type="password"
            value={ password }
            onChange={ ({ target: { value } }) => setPassword(value) }
          />
        </label>
        <label htmlFor="role">
          <select
            data-testid="admin_manage__select-role"
            id="role"
            name="role"
            placeholder="Selecione:"
            type="role"
            value={ role }
            onChange={ ({ target: { value } }) => setRole(value) }
          >
            <option value="seller">Vendedor</option>
            <option value="customer">Cliente</option>
            <option value="administrator">Administrador</option>
          </select>
        </label>
        <button
          data-testid="admin_manage__button-register"
          name="cadastrar"
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
            <p data-testid="admin_manage__element-invalid-register">
              Elemento oculto: Mensagens de erro
            </p>
          )
          : null }
      </footer>
    </>
  );
}
export default Admin;
