/** Calcula a idade em anos completos a partir de uma data de nascimento ISO. */
export function calcularIdade(dataNascimentoIso: string): number {
  const nascimento = new Date(dataNascimentoIso);
  const hoje = new Date();
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const aindaNaoFezAniversario =
    hoje.getMonth() < nascimento.getMonth() ||
    (hoje.getMonth() === nascimento.getMonth() &&
      hoje.getDate() < nascimento.getDate());
  if (aindaNaoFezAniversario) idade -= 1;
  return idade;
}
