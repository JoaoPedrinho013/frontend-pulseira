import type { Usuario } from '../types/usuario';

/**
 * Dados fictícios para a tela de administração — hoje não há backend nem
 * autenticação real, então o painel inteiro opera sobre este mock em memória.
 */
export const usuariosMock: Usuario[] = [
  {
    id: 'u1',
    nome: 'Helena Martins Souza',
    tipo: 'paciente',
    cpf: '123.456.789-01',
    email: 'helena.souza@email.com',
    status: 'ativo',
  },
  {
    id: 'u2',
    nome: 'Ricardo Alves Lima',
    tipo: 'responsavel',
    cpf: '234.567.890-12',
    email: 'ricardo.lima@email.com',
    status: 'ativo',
  },
  {
    id: 'u3',
    nome: 'Maria das Graças Pereira',
    tipo: 'paciente',
    cpf: '345.678.901-23',
    email: 'maria.pereira@email.com',
    status: 'ativo',
  },
  {
    id: 'u4',
    nome: 'João Carlos Mendes',
    tipo: 'responsavel',
    cpf: '456.789.012-34',
    email: 'joao.mendes@email.com',
    status: 'inativo',
  },
  {
    id: 'u5',
    nome: 'Antônio Ferreira Costa',
    tipo: 'paciente',
    cpf: '567.890.123-45',
    email: 'antonio.costa@email.com',
    status: 'inativo',
  },
  {
    id: 'u6',
    nome: 'Beatriz Nogueira Dias',
    tipo: 'responsavel',
    cpf: '678.901.234-56',
    email: 'beatriz.dias@email.com',
    status: 'ativo',
  },
  {
    id: 'u7',
    nome: 'Sebastião Ramos Oliveira',
    tipo: 'paciente',
    cpf: '789.012.345-67',
    email: 'sebastiao.oliveira@email.com',
    status: 'ativo',
  },
  {
    id: 'u8',
    nome: 'Camila Rodrigues Teixeira',
    tipo: 'responsavel',
    cpf: '890.123.456-78',
    email: 'camila.teixeira@email.com',
    status: 'ativo',
  },
  {
    id: 'u9',
    nome: 'Francisco das Chagas Silva',
    tipo: 'paciente',
    cpf: '901.234.567-89',
    email: 'francisco.silva@email.com',
    status: 'ativo',
  },
  {
    id: 'u10',
    nome: 'Patrícia Gomes Barbosa',
    tipo: 'responsavel',
    cpf: '012.345.678-90',
    email: 'patricia.barbosa@email.com',
    status: 'inativo',
  },
];
