// Infinite left-scrolling strip — "PADEL ✕ FUTSAL ✕ PICKLEBALL" repeated,
// outline-stroked text with a lime "✕" between words, edges faded via mask.
// Matches the reference's .marquee section, placed right after the hero.
export function Marquee() {
  const words = ["PADEL", "FUTSAL", "PICKLEBALL"];

  const track = (
    <div className="flex shrink-0 items-center gap-6 pr-6">
      {words.map((w) => (
        <span key={w} className="flex items-center gap-6">
          <span
            className="whitespace-nowrap text-[clamp(28px,4vw,46px)] font-black uppercase leading-none text-transparent"
            style={{ WebkitTextStroke: "1px rgba(245,245,240,0.18)" }}
          >
            {w}
          </span>
          <i className="text-[clamp(18px,2vw,24px)] not-italic text-brand-green">✕</i>
        </span>
      ))}
    </div>
  );

  return (
    <section
      className="overflow-hidden border-y border-border-soft bg-bg-1 py-4"
      style={{
        WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
      }}
    >
      <div className="flex w-max animate-marquee-scroll">
        {track}
        {track}
        {track}
      </div>
    </section>
  );
}
