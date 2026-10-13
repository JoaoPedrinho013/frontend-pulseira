/** Formata um instante ISO como "agora mesmo" / "há N minutos". */
export function tempoRelativo(iso: string): string {
  const minutos = Math.max(
    0,
    Math.round((Date.now() - new Date(iso).getTime()) / 60000),
  );
  if (minutos < 1) return 'agora mesmo';
  if (minutos === 1) return 'há 1 minuto';
  return `há ${minutos} minutos`;
}
