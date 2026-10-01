import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../../../components/ui/Button';
import { FormField } from '../../../../components/form-field/FormField';
import { PasswordField } from '../../../../components/form-field/PasswordField';
import { MailIcon } from '../../../../components/icons';
import formStyles from '../../../../components/auth-layout/AuthForm.module.css';

export function LoginFormSection() {
  const navigate = useNavigate();
  const [identificador, setIdentificador] = useState('');
  const [senha, setSenha] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate('/');
  }

  return (
    <>
      <form className={formStyles.form} onSubmit={handleSubmit}>
        <FormField
          id="login-identificador"
          label="E-mail ou CPF"
          icon={MailIcon}
          type="text"
          placeholder="Digite seu e-mail ou CPF"
          autoComplete="username"
          required
          value={identificador}
          onChange={(event) => setIdentificador(event.target.value)}
        />

        <PasswordField
          id="login-senha"
          label="Senha"
          placeholder="Digite sua senha"
          autoComplete="current-password"
          required
          value={senha}
          onChange={(event) => setSenha(event.target.value)}
        />

        <div className={formStyles.row}>
          <label className={formStyles.checkboxLabel}>
            <input type="checkbox" className={formStyles.checkbox} />
            Lembrar de mim
          </label>
          <button type="button" className={formStyles.inertLink}>
            Esqueceu sua senha?
          </button>
        </div>

        <Button type="submit" className={formStyles.submit}>
          Entrar
        </Button>
      </form>

      <p className={formStyles.footer}>
        Não tem uma conta?{' '}
        <Link className={formStyles.footerLink} to="/cadastro">
          Cadastre-se
        </Link>
      </p>
    </>
  );
}
