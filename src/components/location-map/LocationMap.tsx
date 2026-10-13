import styles from './LocationMap.module.css';

interface LocationMapProps {
  latitude: number;
  longitude: number;
  label: string;
}

const BBOX_DELTA = 0.01;

/**
 * Mapa embutido via OpenStreetMap (iframe público, sem chave de API nem
 * dependência nova) — mantém o projeto "sem UI kit" enquanto não há
 * decisão de produto sobre um provedor de mapas definitivo.
 */
export function LocationMap({ latitude, longitude, label }: LocationMapProps) {
  const bbox = [
    longitude - BBOX_DELTA,
    latitude - BBOX_DELTA,
    longitude + BBOX_DELTA,
    latitude + BBOX_DELTA,
  ].join('%2C');
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latitude}%2C${longitude}`;
  const linkCompleto = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=16/${latitude}/${longitude}`;

  return (
    <div className={styles.wrapper}>
      <iframe
        className={styles.frame}
        src={src}
        title={`Mapa com a localização atual de ${label}`}
        loading="lazy"
      />
      <a
        className={styles.link}
        href={linkCompleto}
        target="_blank"
        rel="noopener noreferrer"
      >
        Ver mapa completo
      </a>
    </div>
  );
}
