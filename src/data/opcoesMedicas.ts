export interface OpcaoChecklist {
  value: string;
  label: string;
}

export const tiposSanguineos: OpcaoChecklist[] = [
  { value: 'A+', label: 'A+' },
  { value: 'A-', label: 'A-' },
  { value: 'B+', label: 'B+' },
  { value: 'B-', label: 'B-' },
  { value: 'AB+', label: 'AB+' },
  { value: 'AB-', label: 'AB-' },
  { value: 'O+', label: 'O+' },
  { value: 'O-', label: 'O-' },
];

export const alergiasComuns: OpcaoChecklist[] = [
  { value: 'dipirona', label: 'Dipirona' },
  { value: 'penicilina', label: 'Penicilina / antibióticos' },
  { value: 'aas', label: 'AAS / Aspirina' },
  { value: 'anti_inflamatorios', label: 'Anti-inflamatórios' },
  { value: 'lactose', label: 'Lactose' },
  { value: 'gluten', label: 'Glúten' },
  { value: 'frutos_do_mar', label: 'Frutos do mar' },
  { value: 'latex', label: 'Látex' },
  { value: 'picada_inseto', label: 'Picada de inseto' },
];

export const condicoesComuns: OpcaoChecklist[] = [
  { value: 'hipertensao', label: 'Hipertensão' },
  { value: 'diabetes', label: 'Diabetes' },
  { value: 'cardiopatia', label: 'Cardiopatia' },
  { value: 'epilepsia', label: 'Epilepsia' },
  { value: 'alzheimer', label: 'Alzheimer / demência' },
  { value: 'parkinson', label: 'Parkinson' },
  { value: 'mobilidade_reduzida', label: 'Mobilidade reduzida' },
];

export const medicamentosComuns: OpcaoChecklist[] = [
  { value: 'anti_hipertensivo', label: 'Anti-hipertensivo' },
  { value: 'insulina', label: 'Insulina / hipoglicemiante' },
  { value: 'anticoagulante', label: 'Anticoagulante' },
  { value: 'antidepressivo', label: 'Antidepressivo / ansiolítico' },
  { value: 'anticonvulsivante', label: 'Anticonvulsivante' },
];

/** Converte os `value`s selecionados nos `label`s legíveis, para exibição. */
export function rotulosSelecionados(
  opcoes: OpcaoChecklist[],
  valores: string[],
): string[] {
  return valores.map(
    (valor) => opcoes.find((opcao) => opcao.value === valor)?.label ?? valor,
  );
}
