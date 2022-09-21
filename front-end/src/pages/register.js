function Register() {
  return(
    <>
      <header>Cadastro</header>
      <main>
        <label htmlFor="nome">
          <input
          data-testid="common_register__input-name"
          id="nome"
          name="nome"
          placeholder="Seu nome"
          onChange={null}
          />
        </label>
        <label htmlFor="email">
          <input
          data-testid="common_register__input-email"
          id="email"
          name="email"
          placeholder="Seu email"
          type='email'
          onChange={null}
          />
        </label>
        <label htmlFor="senha">
          <input
          data-testid="common_register__input-password"
          id="senha"
          name="senha"
          placeholder="******"
          onChange={null}
          />
        </label>
        <button
        data-testid="common_register__button-register"
        name="cadastro"
        type="button"
        >
          Cadastrar
        </button>
      </main>
    </>

  )
}

export default Register;