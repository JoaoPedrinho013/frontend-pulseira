export type TipoUsuario = 'paciente' | 'responsavel';
export type StatusUsuario = 'ativo' | 'inativo';

export interface Usuario {
  id: string;
  nome: string;
  fotoUrl?: string;
  tipo: TipoUsuario;
  cpf: string;
  email: string;
  status: StatusUsuario;
}
