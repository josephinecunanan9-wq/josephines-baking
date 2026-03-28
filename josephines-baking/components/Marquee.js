const icons = [
  // Cookie
  <svg key="cookie" viewBox="0 0 40 40"><circle cx="20" cy="20" r="14"/><circle cx="15" cy="16" r="1.5" fill="#9B7B8C" stroke="none"/><circle cx="24" cy="14" r="1.5" fill="#9B7B8C" stroke="none"/><circle cx="17" cy="24" r="1.5" fill="#9B7B8C" stroke="none"/><circle cx="25" cy="22" r="1.5" fill="#9B7B8C" stroke="none"/><circle cx="21" cy="19" r="1" fill="#9B7B8C" stroke="none"/></svg>,
  // Cupcake
  <svg key="cupcake" viewBox="0 0 40 40"><path d="M13 22 c0-5 4-9 8-9s8 4 8 9"/><rect x="10" y="22" width="20" height="8" rx="2"/><path d="M20 22 c0-3-3-6-3-10 a3 3 0 0 1 6 0 c0 4-3 7-3 10"/><path d="M17 14 q3-4 6 0"/></svg>,
  // Cake slice
  <svg key="slice" viewBox="0 0 40 40"><path d="M8 30 L20 10 L32 30 Z"/><line x1="8" y1="30" x2="32" y2="30"/><line x1="11" y1="24" x2="29" y2="24"/><circle cx="20" cy="9" r="1.5" fill="#9B7B8C" stroke="none"/></svg>,
  // Cinnamon roll
  <svg key="roll" viewBox="0 0 40 40"><circle cx="20" cy="20" r="13"/><path d="M20 20 m0-8 a8 8 0 0 1 0 16 a5 5 0 0 1 0-10 a2.5 2.5 0 0 1 0 5" fill="none"/></svg>,
  // Loaf
  <svg key="loaf" viewBox="0 0 40 40"><path d="M8 28 Q8 16 20 14 Q32 16 32 28 Z"/><rect x="8" y="28" width="24" height="5" rx="1"/><path d="M14 22 Q20 18 26 22" fill="none"/></svg>,
  // Donut
  <svg key="donut" viewBox="0 0 40 40"><circle cx="20" cy="20" r="13"/><circle cx="20" cy="20" r="5"/></svg>,
  // Brownie
  <svg key="brownie" viewBox="0 0 40 40"><rect x="9" y="9" width="22" height="22" rx="2"/><line x1="9" y1="20" x2="31" y2="20"/><line x1="20" y1="9" x2="20" y2="31"/></svg>,
  // Muffin
  <svg key="muffin" viewBox="0 0 40 40"><path d="M13 22 Q11 14 20 13 Q29 14 27 22"/><rect x="11" y="22" width="18" height="9" rx="1"/><path d="M15 16 Q20 11 25 16" fill="none"/></svg>,
  // Full cake
  <svg key="cake" viewBox="0 0 40 40"><rect x="7" y="22" width="26" height="10" rx="1"/><rect x="11" y="14" width="18" height="8"/><path d="M17 14 L17 10 M20 14 L20 9 M23 14 L23 10"/><circle cx="17" cy="10" r="1.2" fill="#9B7B8C" stroke="none"/><circle cx="20" cy="9" r="1.2" fill="#9B7B8C" stroke="none"/><circle cx="23" cy="10" r="1.2" fill="#9B7B8C" stroke="none"/></svg>,
  // Pop tart
  <svg key="poptart" viewBox="0 0 40 40"><rect x="8" y="10" width="24" height="20" rx="3"/><rect x="12" y="14" width="16" height="12" rx="2"/><circle cx="16" cy="17" r="1" fill="#9B7B8C" stroke="none"/><circle cx="20" cy="17" r="1" fill="#9B7B8C" stroke="none"/><circle cx="24" cy="17" r="1" fill="#9B7B8C" stroke="none"/><circle cx="16" cy="22" r="1" fill="#9B7B8C" stroke="none"/><circle cx="20" cy="22" r="1" fill="#9B7B8C" stroke="none"/><circle cx="24" cy="22" r="1" fill="#9B7B8C" stroke="none"/></svg>,
]

export default function Marquee() {
  const repeated = [...icons, ...icons, ...icons]

  return (
    <div className="marquee-wrap">
      <div className="marquee-inner">
        {repeated.map((icon, i) => (
          <span key={i} className="marquee-icon">
            {icon}
            <span className="marquee-sep" />
          </span>
        ))}
      </div>
    </div>
  )
}
