import React from "react";

const HistorySection = () => {
  return (
    <div
      style={{
        padding: "80px 20px",
        backgroundColor: "#f8f9fa",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Elements */}
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

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "60px",
          alignItems: "start",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Left Side - Content */}
        <div
          style={{
            padding: "20px",
          }}
        >
          <div
            style={{
              color: "#0891b2",
              fontSize: "0.9rem",
              fontWeight: "600",
              letterSpacing: "2px",
              marginBottom: "12px",
            }}
          >
            OUR JOURNEY
          </div>

          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: "700",
              color: "#0f172a",
              marginBottom: "24px",
              lineHeight: 1.2,
            }}
          >
            Empowering Financial Futures
          </h2>

          <p
            style={{
              color: "#64748b",
              fontSize: "1rem",
              lineHeight: 1.7,
              marginBottom: "24px",
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
              fontSize: "1rem",
              lineHeight: 1.7,
              marginBottom: "24px",
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
              fontSize: "1rem",
              lineHeight: 1.7,
              marginBottom: "24px",
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
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 5px 20px rgba(0, 0, 0, 0.08)",
              borderLeft: "4px solid #0891b2",
              marginBottom: "24px",
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
              Our Mission
            </h3>
            <p
              style={{
                color: "#475569",
                fontSize: "1rem",
                lineHeight: 1.6,
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

          {/* Founder's Message - Now on the right side */}
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
