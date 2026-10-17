/** Logo raster da Prime Padel (PNG transparente extraído do JPG original, convertido para WebP). 554 x 269. */
export function Logo({ tone, height, eager = false }: { tone: 'green' | 'white'; height: number; eager?: boolean }) {
  const width = Math.round((554 / 269) * height);
  return (
    <img
      className="logo"
      src={`/img/prime-padel-${tone}.webp`}
      width={width}
      height={height}
      alt="Prime Padel"
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}
