import React, { useState, useEffect } from "react";

const HistorySection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div
      style={{
        padding: isMobile ? "40px 16px" : "80px 20px",
        backgroundColor: "#f8f9fa",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Elements - Hide on mobile */}
      {!isMobile && (
        <>
          <div
            style={{
              position: "absolute",
              top: "10%",
              left: "5%",
              width: "300px",
              height: "300px",
              background:
                "radial-gradient(circle, rgba(8, 145, 178, 0.05) 0%, transparent 70%)",
              borderRadius: "50%",
              animation: "float 8s ease-in-out infinite",
            }}
          />

          <div
            style={{
              position: "absolute",
              bottom: "15%",
              right: "10%",
              width: "400px",
              height: "400px",
              background:
                "radial-gradient(circle, rgba(6, 182, 212, 0.04) 0%, transparent 70%)",
              borderRadius: "50%",
              animation: "float 10s ease-in-out infinite reverse",
            }}
          />
        </>
      )}

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(300px, 1fr))",
          gap: isMobile ? "40px" : "60px",
          alignItems: "start",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Left Side - Content */}
        <div
          style={{
            padding: isMobile ? "0" : "20px",
          }}
        >
          <div
            style={{
              color: "#0891b2",
              fontSize: isMobile ? "0.8rem" : "0.9rem",
              fontWeight: "600",
              letterSpacing: "2px",
              marginBottom: isMobile ? "8px" : "12px",
              textAlign: isMobile ? "center" : "left",
            }}
          >
            OUR JOURNEY
          </div>

          <h2
            style={{
              fontSize: isMobile ? "1.75rem" : "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: "700",
              color: "#0f172a",
              marginBottom: isMobile ? "16px" : "24px",
              lineHeight: 1.2,
              textAlign: isMobile ? "center" : "left",
            }}
          >
            Empowering Financial Futures
          </h2>

          <p
            style={{
              color: "#64748b",
              fontSize: isMobile ? "0.95rem" : "1rem",
              lineHeight: 1.7,
              marginBottom: isMobile ? "20px" : "24px",
              textAlign: isMobile ? "justify" : "left",
            }}
          >
            <strong>
              CreditDost is a trusted credit education and credit score
              improvement platform in India
            </strong>
            , founded by <b>Mr. Nitin Verma</b>, with a mission to promote
            financial inclusion and responsible credit awareness.
          </p>

          <p
            style={{
              color: "#64748b",
              fontSize: isMobile ? "0.95rem" : "1rem",
              lineHeight: 1.7,
              marginBottom: isMobile ? "20px" : "24px",
              textAlign: isMobile ? "justify" : "left",
            }}
          >
            With extensive experience working alongside lenders, financial
            institutions, and credit professionals, <b>Mr. Nitin Verma</b>{" "}
            identified a critical issue in the Indian credit ecosystem—millions
            of individuals were being denied loans and financial opportunities
            due to incorrect credit reporting, unresolved credit errors, and
            lack of proper credit knowledge, rather than genuine financial risk.
          </p>

          <p
            style={{
              color: "#64748b",
              fontSize: isMobile ? "0.95rem" : "1rem",
              lineHeight: 1.7,
              marginBottom: isMobile ? "20px" : "24px",
              textAlign: isMobile ? "justify" : "left",
            }}
          >
            To address this challenge, <b>CreditDost</b> was established in 2020
            as a technology-enabled platform focused on credit score education,
            credit report analysis, and compliant credit correction support.
            Today, <b>CreditDost</b> helps individuals across India understand
            how credit scores work, identify errors in their credit reports, and
            adopt structured strategies to improve creditworthiness.
          </p>

          {/* Mission Section */}
          <div
            style={{
              backgroundColor: "white",
              padding: isMobile ? "20px" : "30px",
              borderRadius: "12px",
              boxShadow: "0 5px 20px rgba(0, 0, 0, 0.08)",
              borderLeft: "4px solid #0891b2",
              marginBottom: isMobile ? "30px" : "24px",
            }}
          >
            <h3
              style={{
                color: "#0f172a",
                fontSize: isMobile ? "1.25rem" : "1.5rem",
                fontWeight: "600",
                marginBottom: isMobile ? "12px" : "16px",
                textAlign: isMobile ? "center" : "left",
              }}
            >
              Our Mission
            </h3>
            <p
              style={{
                color: "#475569",
                fontSize: isMobile ? "0.95rem" : "1rem",
                lineHeight: 1.6,
                textAlign: isMobile ? "justify" : "left",
              }}
            >
              To enable individuals and aspiring professionals to achieve
              financial stability by providing accurate credit education,
              ethical credit improvement solutions, and practical knowledge
              aligned with Indian credit bureau guidelines.
            </p>
          </div>
        </div>

        {/* Right Side - Images and Founder's Message */}
        {isMobile ? (
          // Mobile Layout - Stacked vertically
          <div
            style={{
              position: "relative",
              padding: "0",
            }}
          >
            {/* Experience Badge - Mobile */}
            <div
              style={{
                backgroundColor: "#0891b2",
                color: "white",
                padding: "20px",
                borderRadius: "12px",
                textAlign: "center",
                boxShadow: "0 10px 30px rgba(8, 145, 178, 0.4)",
                margin: "0 auto 30px",
                maxWidth: "200px",
              }}
            >
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  lineHeight: 1,
                }}
              >
                2020
              </div>
              <div
                style={{
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  marginTop: "8px",
                  lineHeight: 1.3,
                }}
              >
                Founded with
                <br />a Vision
              </div>
            </div>

            {/* Main Image - Mobile */}
            <div
              style={{
                width: "100%",
                height: "300px",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
                backgroundColor: "#e2e8f0",
                marginBottom: "30px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(135deg, #94a3b8 0%, #cbd5e1 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#64748b",
                  fontSize: "1rem",
                }}
              >
                Founder & Team Image
              </div>
            </div>

            {/* Secondary Image - Mobile */}
            <div
              style={{
                width: "100%",
                height: "250px",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
                backgroundColor: "#e2e8f0",
                marginBottom: "30px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(135deg, #cbd5e1 0%, #e2e8f0 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#64748b",
                  fontSize: "1rem",
                }}
              >
                Company Journey
              </div>
            </div>

            {/* Founder's Message - Mobile */}
            <div
              style={{
                backgroundColor: "white",
                padding: "25px",
                borderRadius: "12px",
                boxShadow: "0 5px 20px rgba(0, 0, 0, 0.08)",
                borderLeft: "4px solid #0891b2",
              }}
            >
              <h3
                style={{
                  color: "#0f172a",
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  marginBottom: "16px",
                  textAlign: "center",
                }}
              >
                Founder's Message
              </h3>
              <p
                style={{
                  color: "#475569",
                  fontSize: "1rem",
                  lineHeight: 1.6,
                  fontStyle: "italic",
                  marginBottom: "16px",
                  textAlign: "justify",
                }}
              >
                "Everyone deserves a financial comeback. At Credit Dost, our
                mission is to make credit-worthiness achievable through awareness,
                technology, and responsible human guidance."
              </p>
              <div
                style={{
                  color: "#0891b2",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                — Nitin Verma, Founder & Director
              </div>
            </div>
          </div>
        ) : (
          // Desktop Layout - Original with overlapped elements
          <div
            style={{
              position: "relative",
              height: "600px",
              padding: "20px",
            }}
          >
            {/* Main Image */}
            <div
              style={{
                position: "absolute",
                top: "25px",
                right: "0",
                width: "68%",
                height: "400px",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 15px 40px rgba(0, 0, 0, 0.15)",
                backgroundColor: "#e2e8f0",
                zIndex: 3,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(135deg, #94a3b8 0%, #cbd5e1 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#64748b",
                  fontSize: "1.1rem",
                }}
              >
                Founder & Team Image
              </div>
            </div>

            {/* Secondary Image */}
            <div
              style={{
                position: "absolute",
                bottom: "-25px",
                left: "0",
                width: "60%",
                height: "300px",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 15px 40px rgba(0, 0, 0, 0.15)",
                backgroundColor: "#e2e8f0",
                zIndex: 2,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(135deg, #cbd5e1 0%, #e2e8f0 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#64748b",
                  fontSize: "1.1rem",
                }}
              >
                Company Journey
              </div>
            </div>

            {/* Experience Badge */}
            <div
              style={{
                position: "absolute",
                top: "30%",
                left: "10%",
                backgroundColor: "#0891b2",
                color: "white",
                padding: "20px 30px",
                borderRadius: "12px",
                textAlign: "center",
                boxShadow: "0 15px 40px rgba(8, 145, 178, 0.4)",
                zIndex: 10,
              }}
            >
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  lineHeight: 1,
                }}
              >
                2020
              </div>
              <div
                style={{
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  marginTop: "8px",
                  lineHeight: 1.3,
                }}
              >
                Founded with
                <br />a Vision
              </div>
            </div>

            {/* Founder's Message - Desktop */}
            <div
              style={{
                position: "absolute",
                bottom: "-299px",
                right: "20px",
                width: "75%",
                backgroundColor: "white",
                padding: "30px",
                borderRadius: "12px",
                boxShadow: "0 5px 20px rgba(0, 0, 0, 0.08)",
                borderLeft: "4px solid #0891b2",
                zIndex: 4,
              }}
            >
              <h3
                style={{
                  color: "#0f172a",
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  marginBottom: "16px",
                }}
              >
                Founder's Message
              </h3>
              <p
                style={{
                  color: "#475569",
                  fontSize: "1.1rem",
                  lineHeight: 1.6,
                  fontStyle: "italic",
                  marginBottom: "16px",
                }}
              >
                "Everyone deserves a financial comeback. At Credit Dost, our
                mission is to make credit-worthiness achievable through awareness,
                technology, and responsible human guidance."
              </p>
              <div
                style={{
                  color: "#0891b2",
                  fontWeight: "600",
                }}
              >
                — Nitin Verma, Founder & Director
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
};

export default HistorySection;