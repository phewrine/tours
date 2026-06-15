"use client";

import { useState, useEffect, useRef } from "react";

const FALLBACK_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%232D6A4F'/%3E%3Ctext x='400' y='300' font-family='sans-serif' font-size='28' fill='%23F5B041' text-anchor='middle' dominant-baseline='middle'%3ESafari Roots%3C/text%3E%3C/svg%3E";

const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const img = e.target as HTMLImageElement;
  img.onerror = null;
  img.src = FALLBACK_IMG;
};

const packages = [
  {
    title: "Ultimate Maasai Mara Safari",
    location: "Maasai Mara, Kenya",
    nights: "4 Days / 3 Nights",
    price: "KSh 89,000",
    originalPrice: "KSh 110,000",
    badge: "Best Seller",
    badgeColor: "#4A7C59",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
  },
  {
    title: "Jungle Beach Retreat",
    location: "Diani Beach, Kenya",
    nights: "5 Days / 4 Nights",
    price: "KSh 65,000",
    badge: "Flash Deal",
    badgeColor: "#C06C3E",
    image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80",
  },
  {
    title: "Gorilla Trekking Expedition",
    location: "Bwindi, Uganda",
    nights: "6 Days / 5 Nights",
    price: "USD 1,850",
    badge: "Exclusive",
    badgeColor: "#4A7C59",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
  },
  {
    title: "Serengeti & Ngorongoro",
    location: "Tanzania",
    nights: "7 Days / 6 Nights",
    price: "USD 2,450",
    originalPrice: "USD 2,950",
    badge: "Wildlife Special",
    badgeColor: "#C06C3E",
    image: "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800&q=80",
  },
];

const destinations = [
  { name: "Maasai Mara", tagline: "Endless plains, majestic herds", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80" },
  { name: "Amboseli", tagline: "Giants under Kilimanjaro", image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80" },
  { name: "Diani Beach", tagline: "White sand, turquoise sea", image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80" },
  { name: "Samburu", tagline: "Unique northern species", image: "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800&q=80" },
  { name: "Zanzibar", tagline: "Spice islands' charm", image: "https://images.unsplash.com/photo-1504700610630-ac6aba3536d3?w=800&q=80" },
  { name: "Lake Nakuru", tagline: "Flamingos & rhinos", image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80" },
];

const testimonials = [
  {
    name: "Amina M.",
    trip: "Maasai Mara Safari",
    text: "An absolutely seamless experience. The guide was incredibly knowledgeable, and we saw the 'Big Five' before lunch on the second day. Safari Roots made our dream trip a reality.",
    avatar: "AM",
    stars: 5,
  },
  {
    name: "James K.",
    trip: "Gorilla Trekking",
    text: "Trekking through the jungle to see gorillas was life-changing. Safari Roots handled every logistical detail—from permits to transport—so we could focus on the awe-inspiring moment.",
    avatar: "JK",
    stars: 5,
  },
  {
    name: "Priya S.",
    trip: "Beach & Bush",
    text: "The combination of safari and Diani beach was perfect. The team was responsive, professional, and the accommodations they chose were top-notch. Highly recommend!",
    avatar: "PS",
    stars: 5,
  },
];

const useScrolled = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return scrolled;
};

const useFadeIn = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
};

const Appear = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      style={{
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
      }}
    >
      {children}
    </div>
  );
};

const StarRating = ({ n = 5 }: { n?: number }) => (
  <div style={{ display: "flex", gap: 2, marginBottom: 12, justifyContent: "center" }}>
    {Array.from({ length: n }).map((_, i) => (
      <span key={i} style={{ color: "#F5B041", fontSize: 18 }}>★</span>
    ))}
  </div>
);

export default function SafariRoots() {
  const scrolled = useScrolled();
  const [activeFilter, setActiveFilter] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  const filters = ["All", "Kenya", "East Africa", "International"];
  const colors = { brown: "#8B5A2B", jungle: "#2D6A4F", lightBg: "#FDF8F0", darkBg: "#1B3B2B" };

  return (
    <div style={{
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      background: colors.lightBg,
      minHeight: "100vh",
      color: "#1A1A1A",
      overflowX: "hidden"
    }}>

      {/* ─── BACKGROUND ─── */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100vh", zIndex: 0, overflow: "hidden" }}>
        <img
          src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1600&q=80"
          alt="Safari landscape at golden hour"
          onError={handleImgError}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        {!videoFailed && (
          <video autoPlay loop muted playsInline onError={() => setVideoFailed(true)}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}>
            <source src="/roots.mp4" type="video/mp4" />
          </video>
        )}
<div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.2) 100%)" }} />      </div>

      <div style={{ position: "relative", zIndex: 2 }}>

        {/* ─── TOP BAR ─── */}
        <div className="top-bar" style={{
          background: "rgba(0,0,0,0.7)", backdropFilter: "blur(10px)", color: "#fff",
          fontSize: 13, padding: "10px 5%", display: "flex", justifyContent: "center",
          alignItems: "center", flexWrap: "wrap", gap: 30,
          borderBottom: "1px solid rgba(255,255,255,0.1)", fontWeight: 500, textAlign: "center"
        }}>
          <div className="top-bar-contact" style={{ display: "flex", gap: 30, flexWrap: "wrap", justifyContent: "center" }}>
            <span>+254 700 111 222</span>
            <span>hello@safariroots.com</span>
            <span>Nyali Centre, Mombasa, Kenya</span>
          </div>
          <div className="top-bar-social" style={{ display: "flex", gap: 25, justifyContent: "center" }}>
            <a href="#" style={{ color: "#fff", textDecoration: "none", fontWeight: 500 }}>Facebook</a>
            <a href="#" style={{ color: "#fff", textDecoration: "none", fontWeight: 500 }}>Instagram</a>
            <a href="#" style={{ color: "#fff", textDecoration: "none", fontWeight: 500 }}>WhatsApp</a>
          </div>
        </div>

        {/* ─── NAVBAR ─── */}
        <nav className="navbar" style={{
          position: "sticky", top: 0, zIndex: 100,
          background: scrolled ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0.5)",
          backdropFilter: "blur(10px)",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.1)" : "none",
          transition: "all 0.3s ease", padding: "0 5%",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 40, height: 75,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 42, height: 42,
              background: "linear-gradient(135deg, #2D6A4F, #8B5A2B)",
              borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 20px rgba(45,106,79,0.5)", flexShrink: 0
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="rgba(255,255,255,0.15)"/>
                <path d="M12 6v6l4 2"/>
                <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4z" fill="rgba(255,255,255,0.2)" stroke="none"/>
                <line x1="12" y1="2" x2="12" y2="6"/>
                <line x1="12" y1="18" x2="12" y2="22"/>
                <line x1="4.22" y1="4.22" x2="7.05" y2="7.05"/>
                <line x1="16.95" y1="16.95" x2="19.78" y2="19.78"/>
              </svg>
            </div>
            <span className="brand-name" style={{ fontWeight: 800, fontSize: 24, color: "#fff", letterSpacing: "-0.5px", textShadow: "2px 2px 4px rgba(0,0,0,0.5)", whiteSpace: "nowrap" }}>
              Safari Roots
            </span>
          </div>

          <div className="nav-links" style={{ display: "flex", gap: 30, alignItems: "center" }}>
            {["Home", "Safaris", "Destinations", "About", "Contact"].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} style={{ color: "#fff", textDecoration: "none", fontSize: 15, fontWeight: 600, transition: "color 0.2s" }}
                onMouseOver={e => (e.target as HTMLElement).style.color = "#F5B041"}
                onMouseOut={e => (e.target as HTMLElement).style.color = "#fff"}>
                {link}
              </a>
            ))}
            <button style={{
              background: "linear-gradient(135deg, #2D6A4F, #8B5A2B)", color: "#fff", border: "none",
              borderRadius: 40, padding: "12px 28px", fontWeight: 700, fontSize: 14, cursor: "pointer",
              transition: "transform 0.2s", boxShadow: "0 4px 15px rgba(0,0,0,0.3)", whiteSpace: "nowrap"
            }}
            onMouseOver={e => { (e.target as HTMLElement).style.transform = "scale(1.05)"; }}
            onMouseOut={e => { (e.target as HTMLElement).style.transform = "scale(1)"; }}>
              Book a Safari
            </button>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="mobile-menu-btn"
            aria-label="Toggle navigation menu"
            style={{ background: "none", border: "none", fontSize: 26, cursor: "pointer", color: "#fff", lineHeight: 1, padding: 4 }}>
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </nav>

        {mobileMenuOpen && (
          <div style={{
            position: "fixed", top: 75, left: 0, right: 0,
            background: "rgba(0,0,0,0.95)", backdropFilter: "blur(10px)",
            padding: "25px", zIndex: 99, display: "flex", flexDirection: "column", gap: 15, textAlign: "center"
          }}>
            {["Home", "Safaris", "Destinations", "About", "Contact"].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)}
                style={{ color: "#fff", textDecoration: "none", fontSize: 17, fontWeight: 600, padding: "10px 0" }}>
                {link}
              </a>
            ))}
            <button style={{
              background: "linear-gradient(135deg, #2D6A4F, #8B5A2B)", color: "#fff", border: "none",
              borderRadius: 40, padding: "14px", fontWeight: 700, fontSize: 15, cursor: "pointer"
            }}>
              Book a Safari
            </button>
          </div>
        )}

        {/* ─── HERO ─── */}
        <section style={{
          position: "relative", minHeight: "calc(100vh - 75px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          textAlign: "center", overflow: "hidden", padding: "80px 5%"
        }}>
          <div style={{ position: "relative", zIndex: 2, maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
            <Appear>
              <p className="hero-eyebrow" style={{
                color: "#F5B041", fontWeight: 800, fontSize: 14, letterSpacing: "4px",
                textTransform: "uppercase", marginBottom: 20, textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
              }}>
                Discover Your Wild Side
              </p>

              <h1 className="hero-title" style={{
                fontSize: "clamp(2.4rem, 8vw, 5.5rem)", fontWeight: 900, margin: "0 0 20px",
                lineHeight: 1.1, letterSpacing: "-2px", color: "#fff",
                textShadow: "3px 3px 6px rgba(0,0,0,0.5)",
                background: "linear-gradient(135deg, #fff, #F5B041)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                Safari Roots
              </h1>

              <div className="hero-blurb" style={{
                display: "inline-block", background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(10px)", padding: "20px 30px", borderRadius: 20, marginBottom: 35
              }}>
                <p style={{
                  fontSize: "clamp(0.95rem, 2.5vw, 1.3rem)", color: "#fff", lineHeight: 1.7,
                  fontWeight: 500, textShadow: "1px 1px 2px rgba(0,0,0,0.3)", margin: 0
                }}>
                  Authentic adventures in Africa's wildest places. Expertly guided safaris,
                  cultural encounters, and eco-conscious travel from our home in Mombasa to the heart of the wilderness.
                </p>
              </div>

              <div className="hero-buttons" style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
                <button style={{
                  background: "linear-gradient(135deg, #F5B041, #E67E22)", color: "#fff", border: "none",
                  borderRadius: 50, padding: "16px 38px", fontWeight: 800, fontSize: 16, cursor: "pointer",
                  transition: "all 0.3s", boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
                  textTransform: "uppercase", letterSpacing: "1px"
                }}
                onMouseOver={e => { (e.target as HTMLElement).style.transform = "translateY(-3px)"; (e.target as HTMLElement).style.boxShadow = "0 12px 30px rgba(0,0,0,0.4)"; }}
                onMouseOut={e => { (e.target as HTMLElement).style.transform = "translateY(0)"; (e.target as HTMLElement).style.boxShadow = "0 8px 25px rgba(0,0,0,0.3)"; }}>
                  Explore Safaris
                </button>
                <button style={{
                  background: "rgba(255,255,255,0.2)", backdropFilter: "blur(10px)",
                  color: "#fff", border: "2px solid rgba(255,255,255,0.8)", borderRadius: 50,
                  padding: "16px 38px", fontWeight: 700, fontSize: 16, cursor: "pointer", transition: "all 0.3s"
                }}
                onMouseOver={e => { (e.target as HTMLElement).style.background = "rgba(255,255,255,0.3)"; (e.target as HTMLElement).style.transform = "translateY(-3px)"; }}
                onMouseOut={e => { (e.target as HTMLElement).style.background = "rgba(255,255,255,0.2)"; (e.target as HTMLElement).style.transform = "translateY(0)"; }}>
                  Watch the Film
                </button>
              </div>
            </Appear>
          </div>
        </section>

        {/* ─── STATS ─── */}
        <section style={{ background: colors.darkBg, padding: "60px 5%", textAlign: "center" }}>
          <div className="stats-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 32, textAlign: "center" }}>
            {[
              { val: "15+", label: "Years of Excellence" },
              { val: "500+", label: "Safaris Planned" },
              { val: "8,000+", label: "Happy Travelers" },
              { val: "98%", label: "Would Recommend" },
              { val: "24/7", label: "On-Safari Support" },
              { val: "50+", label: "Community Partners" },
            ].map((s, i) => (
              <Appear key={i} delay={i * 70}>
                <div>
                  <div className="stat-value" style={{ fontSize: 36, fontWeight: 900, color: "#F5B041" }}>{s.val}</div>
                  <div className="stat-label" style={{ fontSize: 13, color: "#fff", textTransform: "uppercase", letterSpacing: "1.5px", marginTop: 8, fontWeight: 600 }}>{s.label}</div>
                </div>
              </Appear>
            ))}
          </div>
        </section>

        {/* ─── FEATURED PACKAGES ─── */}
        <section id="safaris" style={{ padding: "80px 5%", background: colors.lightBg, textAlign: "center" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Appear>
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <p className="section-eyebrow" style={{ color: colors.jungle, fontWeight: 800, fontSize: 13, textTransform: "uppercase", letterSpacing: "3px", marginBottom: 12 }}>Seasonal Offers</p>
                <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, letterSpacing: "-1px", color: colors.brown, marginBottom: 16 }}>
                  Signature Safari Experiences
                </h2>
                <p className="section-intro" style={{ color: "#6B4E3D", maxWidth: 550, margin: "0 auto", lineHeight: 1.7, fontSize: 16, fontWeight: 500 }}>
                  Curated journeys that put you at the heart of Africa's wilderness.
                </p>
              </div>
            </Appear>

            <div className="filter-bar" style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 40, flexWrap: "wrap" }}>
              {filters.map(f => (
                <button key={f} onClick={() => setActiveFilter(f)} style={{
                  padding: "10px 24px", borderRadius: 40,
                  border: `2px solid ${activeFilter === f ? colors.jungle : "#D1D5DB"}`,
                  background: activeFilter === f ? colors.jungle : "#fff",
                  color: activeFilter === f ? "#fff" : colors.brown,
                  fontWeight: 700, fontSize: 14, cursor: "pointer", transition: "all 0.2s"
                }}>
                  {f}
                </button>
              ))}
            </div>

            <div className="packages-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 30, textAlign: "left" }}>
              {packages.map((pkg, i) => (
                <Appear key={i} delay={i * 80}>
                  <div style={{
                    background: "#fff", borderRadius: 20, overflow: "hidden",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.1)", transition: "transform 0.3s, box-shadow 0.3s", cursor: "pointer"
                  }}
                  onMouseOver={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-8px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)"; }}
                  onMouseOut={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(0,0,0,0.1)"; }}>
                    <div style={{ position: "relative", height: 240, overflow: "hidden" }}>
                      <img src={pkg.image} alt={pkg.title} onError={handleImgError}
                        style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
                        onMouseOver={e => (e.target as HTMLElement).style.transform = "scale(1.1)"}
                        onMouseOut={e => (e.target as HTMLElement).style.transform = "scale(1)"} />
                      <span style={{
                        position: "absolute", top: 16, left: 16, background: pkg.badgeColor, color: "#fff",
                        fontSize: 12, fontWeight: 800, padding: "6px 14px", borderRadius: 30,
                        textTransform: "uppercase", letterSpacing: "0.5px"
                      }}>
                        {pkg.badge}
                      </span>
                    </div>
                    <div style={{ padding: "22px 24px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                        <span className="card-location" style={{ fontSize: 14, color: colors.jungle, fontWeight: 800 }}>{pkg.location}</span>
                      </div>
                      <h3 className="card-title" style={{ fontWeight: 800, fontSize: 18, lineHeight: 1.3, marginBottom: 8, color: colors.brown }}>{pkg.title}</h3>
                      <p className="card-meta" style={{ fontSize: 14, color: "#9CA3AF", marginBottom: 20, fontWeight: 500 }}>{pkg.nights}</p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "2px solid #F0EDE4", paddingTop: 16, flexWrap: "wrap", gap: 12 }}>
                        <div>
                          <span className="price-value" style={{ fontSize: 24, fontWeight: 900, color: colors.jungle }}>{pkg.price}</span>
                          {pkg.originalPrice && (
                            <span className="price-original" style={{ fontSize: 14, color: "#D1D5DB", textDecoration: "line-through", marginLeft: 8 }}>{pkg.originalPrice}</span>
                          )}
                        </div>
                        <button className="card-cta" style={{
                          background: colors.jungle, color: "#fff", border: "none",
                          borderRadius: 30, padding: "10px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer"
                        }}>
                          View Safari
                        </button>
                      </div>
                    </div>
                  </div>
                </Appear>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WHY US ─── */}
        <section id="about" style={{ padding: "80px 5%", background: "#fff" }}>
          <div className="why-us-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <Appear>
              <div className="why-us-image" style={{ position: "relative", borderRadius: 20, overflow: "hidden", height: 460 }}>
                <img src="https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800&q=80" alt="Elephant family in the savanna" onError={handleImgError} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div className="why-us-caption" style={{
                  position: "absolute", bottom: 24, left: 24, right: 24,
                  background: "rgba(255,255,255,0.95)", borderRadius: 16,
                  padding: "20px 26px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  borderLeft: `5px solid ${colors.jungle}`
                }}>
                  <div className="why-us-caption-label" style={{ fontSize: 13, color: colors.jungle, fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 6 }}>Rooted in Conservation</div>
                  <div className="why-us-caption-text" style={{ fontWeight: 800, fontSize: 18, color: colors.brown }}>5% of every booking to wildlife funds</div>
                </div>
              </div>
            </Appear>
            <div>
              <Appear>
                <p className="section-eyebrow" style={{ color: colors.jungle, fontWeight: 800, fontSize: 13, textTransform: "uppercase", letterSpacing: "3px", marginBottom: 12 }}>Our Roots</p>
                <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, letterSpacing: "-1px", color: colors.brown, marginBottom: 20, lineHeight: 1.2 }}>
                  From Mombasa to the Wild
                </h2>
                <p className="section-intro" style={{ color: "#6B4E3D", lineHeight: 1.8, marginBottom: 40, fontSize: 16, fontWeight: 500 }}>
                  Safari Roots was born in Mombasa, Kenya's coastal gem. From our Nyali Centre headquarters,
                  we've been crafting authentic, eco-conscious safaris across East Africa. We work directly
                  with local communities, employ expert native guides, and ensure our safaris leave a
                  positive footprint on the ecosystems we explore.
                </p>
              </Appear>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  { title: "Eco-Conscious Travel", desc: "Low-impact camps, plastic-free drives, and carbon-offset flights." },
                  { title: "Community First", desc: "Partnering with local enterprises, from women-led beadwork to village schools." },
                  { title: "Expert Guides", desc: "Biologists, ornithologists, and trackers who know every trail and tale." },
                ].map((item, i) => (
                  <Appear key={i} delay={i * 100}>
                    <div style={{ display: "flex", gap: 20, padding: "20px 24px", borderRadius: 16, background: colors.lightBg, border: "2px solid #E8E2D5", textAlign: "left" }}>
                      <div>
                        <div className="feature-title" style={{ fontWeight: 800, fontSize: 17, marginBottom: 6, color: colors.brown }}>{item.title}</div>
                        <div className="feature-desc" style={{ fontSize: 14, color: "#7E6B5D", lineHeight: 1.6, fontWeight: 500 }}>{item.desc}</div>
                      </div>
                    </div>
                  </Appear>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── DESTINATIONS ─── */}
        <section id="destinations" style={{ padding: "80px 5%", background: colors.lightBg, textAlign: "center" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Appear>
              <div style={{ textAlign: "center", marginBottom: 52 }}>
                <p className="section-eyebrow" style={{ color: colors.jungle, fontWeight: 800, fontSize: 13, textTransform: "uppercase", letterSpacing: "3px", marginBottom: 12 }}>Places We Roam</p>
                <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, letterSpacing: "-1px", color: colors.brown }}>Iconic Wild Destinations</h2>
              </div>
            </Appear>
            <div className="destinations-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
              {destinations.map((d, i) => (
                <Appear key={i} delay={i * 70}>
                  <div className="destination-card" style={{
                    position: "relative", height: i === 0 || i === 3 ? 380 : 300,
                    borderRadius: 20, overflow: "hidden", cursor: "pointer"
                  }}
                  onMouseOver={e => ((e.currentTarget as HTMLElement).querySelector("img") as HTMLElement).style.transform = "scale(1.1)"}
                  onMouseOut={e => ((e.currentTarget as HTMLElement).querySelector("img") as HTMLElement).style.transform = "scale(1)"}>
                    <img src={d.image} alt={d.name} onError={handleImgError} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 55%)" }} />
                    <div className="destination-caption" style={{ position: "absolute", bottom: 24, left: 24, right: 24, textAlign: "left" }}>
                      <div className="destination-name" style={{ fontWeight: 800, fontSize: 24, color: "#fff", marginBottom: 8, textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>{d.name}</div>
                      <div className="destination-tagline" style={{ fontSize: 14, color: "#F5B041", fontWeight: 600 }}>{d.tagline}</div>
                    </div>
                  </div>
                </Appear>
              ))}
            </div>
          </div>
        </section>

        {/* ─── HOW IT WORKS ─── */}
        <section style={{ padding: "80px 5%", background: "#fff", textAlign: "center" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <Appear>
              <div style={{ textAlign: "center", marginBottom: 56 }}>
                <p className="section-eyebrow" style={{ color: colors.jungle, fontWeight: 800, fontSize: 13, textTransform: "uppercase", letterSpacing: "3px", marginBottom: 12 }}>Simple and Fast</p>
                <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, letterSpacing: "-1px", color: colors.brown }}>Your Safari, in 3 Steps</h2>
              </div>
            </Appear>
            <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
              {[
                { num: "1", title: "Dream and Inquire", desc: "Share your travel wishlist—destinations, budget, style." },
                { num: "2", title: "Custom Itinerary", desc: "Our experts design your safari, adjusting until it's perfect." },
                { num: "3", title: "Pack and Go", desc: "Deposit secures your dates. We handle the rest—you enjoy the wild." },
              ].map((step, i) => (
                <Appear key={i} delay={i * 120}>
                  <div style={{ textAlign: "center", padding: "40px 28px", borderRadius: 24, border: "2px solid #E8E2D5", background: colors.lightBg }}>
                    <div style={{
                      width: 56, height: 56, background: `linear-gradient(135deg, ${colors.jungle}, ${colors.brown})`,
                      color: "#fff", fontWeight: 900, fontSize: 24, borderRadius: 30,
                      display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px"
                    }}>
                      {step.num}
                    </div>
                    <h3 className="card-title" style={{ fontWeight: 800, fontSize: 18, marginBottom: 12, color: colors.brown }}>{step.title}</h3>
                    <p className="feature-desc" style={{ fontSize: 14, color: "#7E6B5D", lineHeight: 1.7, fontWeight: 500 }}>{step.desc}</p>
                  </div>
                </Appear>
              ))}
            </div>
          </div>
        </section>

        {/* ─── TESTIMONIALS ─── */}
        <section style={{ padding: "80px 5%", background: colors.darkBg, textAlign: "center" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Appear>
              <div style={{ textAlign: "center", marginBottom: 56 }}>
                <p className="section-eyebrow" style={{ color: "#F5B041", fontWeight: 800, fontSize: 13, textTransform: "uppercase", letterSpacing: "3px", marginBottom: 12 }}>Wild Stories</p>
                <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, letterSpacing: "-1px", color: "#fff" }}>What Our Travelers Say</h2>
              </div>
            </Appear>
            <div className="testimonials-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
              {testimonials.map((t, i) => (
                <Appear key={i} delay={i * 100}>
                  <div style={{ background: "#2C2A29", borderRadius: 20, padding: "30px 28px", border: `2px solid ${colors.brown}`, textAlign: "center" }}>
                    <StarRating n={t.stars} />
                    <p className="testimonial-text" style={{ color: "#E5E0D5", fontSize: 15, lineHeight: 1.8, marginBottom: 28, fontStyle: "italic", fontWeight: 500 }}>"{t.text}"</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, justifyContent: "center" }}>
                      <div style={{
                        width: 52, height: 52, borderRadius: "50%",
                        background: `linear-gradient(135deg, ${colors.jungle}, ${colors.brown})`,
                        color: "#fff", fontWeight: 800, fontSize: 16,
                        display: "flex", alignItems: "center", justifyContent: "center"
                      }}>
                        {t.avatar}
                      </div>
                      <div>
                        <div className="testimonial-name" style={{ fontWeight: 800, color: "#fff", fontSize: 17 }}>{t.name}</div>
                        <div className="testimonial-trip" style={{ fontSize: 14, color: "#F5B041", fontWeight: 600 }}>{t.trip}</div>
                      </div>
                    </div>
                  </div>
                </Appear>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="cta-section" style={{
          padding: "100px 5%",
          backgroundImage: "url('https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1600&q=80')",
          backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed",
          position: "relative", textAlign: "center"
        }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(45,106,79,0.9) 0%, rgba(139,90,43,0.9) 100%)", zIndex: 0 }} />
          <div style={{ position: "relative", zIndex: 2 }}>
            <Appear>
              <h2 style={{ fontSize: "clamp(1.9rem, 5vw, 3.5rem)", fontWeight: 900, color: "#fff", letterSpacing: "-1px", marginBottom: 20 }}>
                Ready to Answer the Wild's Call?
              </h2>
              <p className="cta-text" style={{ color: "#fff", fontSize: "1.1rem", marginBottom: 40, maxWidth: 600, margin: "0 auto 40px", fontWeight: 600 }}>
                Visit us in Mombasa or reach out online. Let's craft your perfect safari.
              </p>
              <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
                <button style={{
                  background: "#fff", color: colors.brown, border: "none",
                  borderRadius: 50, padding: "16px 38px", fontWeight: 800, fontSize: 16, cursor: "pointer",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.2)"
                }}
                onMouseOver={e => { (e.target as HTMLElement).style.transform = "translateY(-3px)"; }}
                onMouseOut={e => { (e.target as HTMLElement).style.transform = "translateY(0)"; }}>
                  Plan My Safari
                </button>
                <button style={{
                  background: "transparent", color: "#fff", border: "2px solid #fff",
                  borderRadius: 50, padding: "16px 38px", fontWeight: 700, fontSize: 16, cursor: "pointer"
                }}
                onMouseOver={e => { (e.target as HTMLElement).style.background = "rgba(255,255,255,0.1)"; (e.target as HTMLElement).style.transform = "translateY(-3px)"; }}
                onMouseOut={e => { (e.target as HTMLElement).style.background = "transparent"; (e.target as HTMLElement).style.transform = "translateY(0)"; }}>
                  Download Brochure
                </button>
              </div>
            </Appear>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer style={{ background: colors.darkBg, padding: "64px 5% 32px", color: "#9E9C99" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", gap: 48, marginBottom: 48 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 42, height: 42, background: `linear-gradient(135deg, ${colors.jungle}, ${colors.brown})`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  <span className="footer-brand" style={{ fontWeight: 800, fontSize: 22, color: "#fff" }}>Safari Roots</span>
                </div>
                <p className="footer-text" style={{ fontSize: 14, lineHeight: 1.8, maxWidth: 280, color: "#B0AFAE", fontWeight: 500, margin: "0 auto" }}>
                  Authentic, eco-conscious safaris across East Africa. Based in Mombasa, serving the world.
                </p>
                <div className="footer-text" style={{ marginTop: 24, fontSize: 14, lineHeight: 2, fontWeight: 500 }}>
                  <div>+254 700 111 222</div>
                  <div>hello@safariroots.com</div>
                  <div>Nyali Centre, Mombasa, Kenya</div>
                </div>
              </div>
              <div>
                <h4 className="footer-heading" style={{ color: "#fff", fontWeight: 800, fontSize: 16, marginBottom: 20 }}>Explore</h4>
                {["Safaris", "Destinations", "Group Journeys", "Conservation"].map(l => (
                  <div key={l} style={{ marginBottom: 12 }}>
                    <a href="#" className="footer-link" style={{ color: "#9E9C99", textDecoration: "none", fontSize: 14, fontWeight: 500 }}
                      onMouseOver={e => (e.target as HTMLElement).style.color = "#F5B041"}
                      onMouseOut={e => (e.target as HTMLElement).style.color = "#9E9C99"}>{l}</a>
                  </div>
                ))}
              </div>
              <div>
                <h4 className="footer-heading" style={{ color: "#fff", fontWeight: 800, fontSize: 16, marginBottom: 20 }}>Company</h4>
                {["Our Story", "Why Us", "Travel Blog", "FAQs"].map(l => (
                  <div key={l} style={{ marginBottom: 12 }}>
                    <a href="#" className="footer-link" style={{ color: "#9E9C99", textDecoration: "none", fontSize: 14, fontWeight: 500 }}
                      onMouseOver={e => (e.target as HTMLElement).style.color = "#F5B041"}
                      onMouseOut={e => (e.target as HTMLElement).style.color = "#9E9C99"}>{l}</a>
                  </div>
                ))}
              </div>
              <div>
                <h4 className="footer-heading" style={{ color: "#fff", fontWeight: 800, fontSize: 16, marginBottom: 16 }}>Stay Wild</h4>
                <p className="footer-text" style={{ fontSize: 13, marginBottom: 20, lineHeight: 1.7, color: "#B0AFAE", fontWeight: 500 }}>
                  Get safari inspiration, conservation news, and exclusive deals.
                </p>
                {subscribed ? (
                  <div style={{ background: colors.jungle, color: "#fff", padding: "12px 16px", borderRadius: 30, fontSize: 14, fontWeight: 700, textAlign: "center" }}>
                    Welcome to the herd!
                  </div>
                ) : (
                  <div style={{ display: "flex" }}>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="Your email"
                      style={{ flex: 1, minWidth: 0, background: "#3D3A38", border: "none", borderRadius: "40px 0 0 40px", padding: "12px 18px", color: "#fff", fontSize: 14, outline: "none" }} />
                    <button onClick={() => setSubscribed(true)}
                      style={{ background: `linear-gradient(135deg, ${colors.jungle}, ${colors.brown})`, color: "#fff", border: "none", borderRadius: "0 40px 40px 0", padding: "12px 20px", fontWeight: 800, fontSize: 18, cursor: "pointer", flexShrink: 0 }}>
                      →
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div style={{ borderTop: "1px solid #3D3A38", paddingTop: 28, textAlign: "center", fontSize: 13, fontWeight: 500 }}>
              © 2026 Safari Roots. Rooted in Mombasa, driven by purpose.
            </div>
          </div>
        </footer>
      </div>

      <style>{`
        * { box-sizing: border-box; }
        html, body { overflow-x: hidden; }
        .mobile-menu-btn { display: none; }
        @media (max-width: 1024px) {
          .destinations-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .why-us-grid { gap: 36px !important; }
          .packages-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .top-bar { font-size: 11px !important; gap: 8px !important; padding: 8px 5% !important; flex-direction: column !important; }
          .top-bar-contact, .top-bar-social { gap: 14px !important; justify-content: center !important; }
          .top-bar-social { display: none !important; }
          .navbar { justify-content: space-between !important; gap: 12px !important; padding: 0 5% !important; }
          .nav-links { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          .brand-name { font-size: 18px !important; }
          section { padding: 48px 5% !important; }
          .hero-eyebrow { font-size: 11px !important; letter-spacing: 2px !important; margin-bottom: 14px !important; }
          .hero-title { letter-spacing: -1px !important; margin-bottom: 16px !important; }
          .hero-blurb { padding: 16px 20px !important; }
          .hero-buttons button { flex: 1 1 auto !important; padding: 14px 24px !important; font-size: 14px !important; }
          .section-eyebrow { font-size: 11px !important; letter-spacing: 2px !important; margin-bottom: 10px !important; }
          .section-intro { font-size: 14px !important; }
          h2 { font-size: 1.75rem !important; line-height: 1.25 !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 24px !important; }
          .stat-value { font-size: 22px !important; }
          .stat-label { font-size: 11px !important; letter-spacing: 1px !important; }
          .filter-bar { gap: 8px !important; }
          .filter-bar button { padding: 8px 16px !important; font-size: 13px !important; }
          .packages-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
          .card-title { font-size: 16px !important; }
          .card-location { font-size: 13px !important; }
          .card-meta { font-size: 13px !important; margin-bottom: 16px !important; }
          .price-value { font-size: 20px !important; }
          .price-original { font-size: 12px !important; }
          .card-cta { font-size: 13px !important; padding: 9px 16px !important; }
          .why-us-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
          .why-us-image { height: 260px !important; }
          .why-us-caption { padding: 14px 16px !important; left: 14px !important; right: 14px !important; bottom: 14px !important; }
          .why-us-caption-label { font-size: 11px !important; letter-spacing: 1px !important; margin-bottom: 4px !important; }
          .why-us-caption-text { font-size: 15px !important; }
          .feature-title { font-size: 16px !important; }
          .feature-desc { font-size: 13px !important; }
          .destinations-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .destination-card { height: 220px !important; }
          .destination-name { font-size: 19px !important; margin-bottom: 4px !important; }
          .destination-tagline { font-size: 13px !important; }
          .steps-grid { grid-template-columns: 1fr !important; gap: 18px !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .testimonial-text { font-size: 14px !important; }
          .testimonial-name { font-size: 15px !important; }
          .testimonial-trip { font-size: 13px !important; }
          .cta-section { padding: 56px 5% !important; background-attachment: scroll !important; }
          .cta-text { font-size: 14px !important; }
          .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; text-align: center !important; }
          .footer-brand { font-size: 18px !important; }
          .footer-heading { font-size: 14px !important; margin-bottom: 14px !important; }
          .footer-text, .footer-link { font-size: 13px !important; }
        }
        @media (max-width: 380px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .stat-value { font-size: 20px !important; }
          .hero-buttons { flex-direction: column !important; width: 100% !important; }
          .hero-buttons button { width: 100% !important; }
        }
      `}</style>
    </div>
  );
}