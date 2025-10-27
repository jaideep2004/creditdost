import React, { useState } from "react";

const services = [
  {
    title: "Revive Business",
    description:
      "Don't just take our word for it hear what our customers have to say about us! we have helped thousand people",
    icon: "👥",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop",
  },
  {
    title: "Propel Consulting",
    description:
      "Don't just take our word for it hear what our customers have to say about us! we have helped thousand people",
    icon: "🧠",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop",
  },
  {
    title: "Velocity Solutions",
    description:
      "Don't just take our word for it hear what our customers have to say about us! we have helped thousand people",
    icon: "📈",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop",
  },
];

const FeaturesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % services.length;
      cards.push({ ...services[index], position: i });
    }
    return cards;
  };

  return (
    <div
      style={{
        position: "relative",
        background: "#f5f7fa",
        padding: "80px 20px",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -30px) scale(1.1); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-40px, 60px) rotate(180deg); }
        }
        @keyframes morph {
          0%, 100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
          50% { border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%; }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        .service-card {
          height: 100%;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          border: none;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          background: white;
          overflow: hidden;
        }
        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.15);
        }
        .nav-button {
          background: #d4e8f0;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: #007ba7;
        }
        .nav-button:hover:not(:disabled) {
          background: #b8dae8;
          transform: scale(1.05);
        }
        .nav-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>

      {/* Animated Background Elements */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0, 123, 255, 0.08) 0%, transparent 70%)",
          animation: "float 8s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "72%",
          right: "8%",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0, 188, 212, 0.09) 0%, transparent 70%)",
          animation: "float2 10s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "-3%",
          width: "200px",
          height: "200px",
          borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
          background:
            "linear-gradient(45deg, rgba(156, 39, 176, 0.1) 0%, transparent 100%)",
          animation: "morph 12s ease-in-out infinite",
        }}
      />

      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "60px",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <div
              style={{
                color: "#007ba7",
                fontSize: "0.95rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              OUR SERVICES
            </div>
            <h2
              style={{
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 800,
                color: "#1a2332",
                lineHeight: 1.2,
                maxWidth: "500px",
                margin: 0,
              }}
            >
              Innovate to dominate with us
            </h2>
          </div>

          <div style={{ display: "flex", gap: "16px" }}>
            <button
              onClick={handlePrevious}
              disabled={isAnimating}
              className="nav-button"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              disabled={isAnimating}
              className="nav-button"
            >
              →
            </button>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "32px",
            marginTop: "48px",
          }}
        >
          {getVisibleCards().map((service, idx) => (
            <div
              key={`${service.title}-${idx}`}
              className="service-card"
              style={{
                animation: `slideIn 0.5s ease-out ${idx * 0.1}s both`,
              }}
            >
              <div
                style={{
                  background: "#007ba7",
                  height: "120px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-50%",
                    left: "-50%",
                    width: "200%",
                    height: "200%",
                    background:
                      "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                    animation: "pulse 3s ease-in-out infinite",
                  }}
                />
                <div
                  style={{
                    fontSize: "50px",
                    zIndex: 1,
                  }}
                >
                  {service.icon}
                </div>
              </div>

              <div style={{ padding: "32px" }}>
                <h3
                  style={{
                    fontWeight: 700,
                    color: "#1a2332",
                    marginBottom: "16px",
                    fontSize: "1.5rem",
                    marginTop: 0,
                  }}
                >
                  {service.title}
                </h3>
                <p
                  style={{
                    color: "#6b7280",
                    lineHeight: 1.7,
                    fontSize: "0.95rem",
                    marginBottom: "24px",
                  }}
                >
                  {service.description}
                </p>

                <img
                  src={service.image}
                  alt={service.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    display: "block",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
