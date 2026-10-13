export type TipoSanguineo =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';

export interface Endereco {
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

/** Espelha `InformacoesMedicas` do back-end (../backend-pulseira). */
export interface InformacoesMedicas {
  tipoSanguineo: TipoSanguineo | null;
  alergias: string[];
  condicoes: string[];
  medicamentosUsoContinuo: string[];
  observacoes: string;
}

/** Espelha `PessoaMonitorada` do back-end (../backend-pulseira). */
export interface Paciente {
  id: string;
  nome: string;
  dataNascimento: string;
  telefone: string;
  endereco: Endereco;
  informacoesMedicas: InformacoesMedicas;
  /** Código que o paciente compartilha para um responsável se vincular a ele. */
  codigoVinculo: string;
}
