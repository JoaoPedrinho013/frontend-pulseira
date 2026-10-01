import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../../../components/ui/Button';
import { FormField } from '../../../../components/form-field/FormField';
import { PasswordField } from '../../../../components/form-field/PasswordField';
import {
  CalendarIcon,
  IdCardIcon,
  MailIcon,
  UserIcon,
} from '../../../../components/icons';
import { formatarCpf, formatarDataBr } from '../../../../utils/mascaras';
import formStyles from '../../../../components/auth-layout/AuthForm.module.css';

export function CadastroFormSection() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate('/login');
  }

  return (
    <>
      <form className={formStyles.form} onSubmit={handleSubmit}>
        <FormField
          id="cadastro-nome"
          label="Nome completo"
          icon={UserIcon}
          type="text"
          placeholder="Digite seu nome completo"
          autoComplete="name"
          required
          value={nome}
          onChange={(event) => setNome(event.target.value)}
        />

        <FormField
          id="cadastro-cpf"
          label="CPF"
          icon={IdCardIcon}
          type="text"
          inputMode="numeric"
          placeholder="000.000.000-00"
          maxLength={14}
          required
          value={cpf}
          onChange={(event) => setCpf(formatarCpf(event.target.value))}
        />

        <FormField
          id="cadastro-nascimento"
          label="Data de nascimento"
          icon={CalendarIcon}
          type="text"
          inputMode="numeric"
          placeholder="dd/mm/aaaa"
          maxLength={10}
          required
          value={dataNascimento}
          onChange={(event) =>
            setDataNascimento(formatarDataBr(event.target.value))
          }
        />

        <FormField
          id="cadastro-email"
          label="E-mail"
          icon={MailIcon}
          type="email"
          placeholder="Digite seu e-mail"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <PasswordField
          id="cadastro-senha"
          label="Senha"
          placeholder="Crie uma senha"
          autoComplete="new-password"
          required
          value={senha}
          onChange={(event) => setSenha(event.target.value)}
        />

        <Button type="submit" className={formStyles.submit}>
          Cadastrar
        </Button>
      </form>

      <p className={formStyles.footer}>
        Já tem uma conta?{' '}
        <Link className={formStyles.footerLink} to="/login">
          Faça login
        </Link>
      </p>
    </>
  );
}
