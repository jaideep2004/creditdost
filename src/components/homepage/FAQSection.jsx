import React, { useState } from "react";

const faqs = [
  {
    id: 1,
    question: "What is business consulting?",
    answer:
      "Business consulting is a service provided by professionals who offer expert advice and guidance to organizations seeking to improve their business processes, strategies, and operations",
  },
  {
    id: 2,
    question: "What types of businesses typically use consulting services?",
    answer:
      "Consulting services are utilized by businesses of all sizes and industries, including startups, small and medium enterprises, large corporations, non-profits, and government organizations seeking to optimize their operations and achieve strategic goals.",
  },
  {
    id: 3,
    question: "What are the benefits of using a business consulting service?",
    answer:
      "Business consulting services provide expert insights, objective perspectives, specialized knowledge, cost-effective solutions, improved efficiency, strategic planning support, and access to best practices that help organizations overcome challenges and achieve sustainable growth.",
  },
  {
    id: 4,
    question: "How much do consulting services cost?",
    answer:
      "Consulting service costs vary based on project scope, consultant expertise, duration, and complexity. Fees can range from hourly rates to project-based pricing or retainer agreements. We offer customized packages tailored to your specific needs and budget.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <div className="faq-wrap">
      <section className="faq-section">
        <div className="animated-bg-element element-1"></div>
        <div className="animated-bg-element element-2"></div>
        <div className="animated-bg-element element-3"></div>
        <div className="animated-bg-element element-4"></div>
        <div className="animated-bg-element element-5"></div>

        <div className="faq-container">
          <div className="faq-left">
            <span className="overline" style={{ color: "#fff" }}>ASK ANYTHING</span>
            <h2 className="faq-title">
              You can contact
              <br />
              us for any question
            </h2>
            <p className="faq-description">
              Fact that a reader will be distrol acted bioiiy desig the.ished
              fact that a reader will be distrol acted bioiiy bioiiy desig
              the.ished fact that a reader ished fact that
            </p>

            <div className="stats-container">
              <div className="stat-card">
                <div className="stat-icon trophy-icon">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                    <path d="M4 22h16"></path>
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                  </svg>
                </div>
                <div className="stat-content">
                  <div className="stat-number">10+</div>
                  <div className="stat-label">Experiences</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon users-icon">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div className="stat-content">
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Happy Client</div>
                </div>
              </div>
            </div>
          </div>

          <div className="faq-right">
            <div className="accordion-container">
              {faqs.map((faq, index) => (
                <div
                  key={faq.id}
                  className={`accordion-item ${
                    activeIndex === index ? "active" : ""
                  }`}
                >
                  <button
                    className="accordion-header"
                    onClick={() => toggleAccordion(index)}
                  >
                    <span className="accordion-question">{faq.question}</span>
                    <div className="accordion-icon">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        {activeIndex === index ? (
                          <polyline points="18 15 12 9 6 15"></polyline>
                        ) : (
                          <polyline points="6 9 12 15 18 9"></polyline>
                        )}
                      </svg>
                    </div>
                  </button>
                  <div className="accordion-content">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
.faq-wrap{
  background: linear-gradient(135deg, #0a5d7a 0%, #0e9ac7 100%);

}
        .faq-section {
          background: linear-gradient(135deg, #0a5d7a 0%, #0e9ac7 100%);
          padding: 80px 20px;
          position: relative;
          max-width: 1400px;
          margin: 0 auto;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }

        .animated-bg-element {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          animation: floatElement 12s ease-in-out infinite;
        }

        .element-1 {
          width: 400px;
          height: 400px;
          top: -100px;
          left: -100px;
          animation-delay: 0s;
        }

        .element-2 {
          width: 300px;
          height: 300px;
          top: 40%;
          left: -50px;
          animation-delay: 2s;
        }

        .element-3 {
          width: 250px;
          height: 250px;
          bottom: -50px;
          left: 20%;
          animation-delay: 4s;
        }

        .element-4 {
          width: 350px;
          height: 350px;
          top: 10%;
          right: -80px;
          animation-delay: 1s;
        }

        .element-5 {
          width: 200px;
          height: 200px;
          bottom: 15%;
          right: 10%;
          animation-delay: 3s;
        }

        @keyframes floatElement {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -20px) scale(1.05);
          }
          50% {
            transform: translate(-15px, 15px) scale(0.95);
          }
          75% {
            transform: translate(10px, -10px) scale(1.02);
          }
        }

        .faq-container {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          position: relative;
          z-index: 1;
          align-items: start;
        }

        .faq-left {
          color: white;
        }

        .overline {
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          display: block;
          margin-bottom: 16px;
          opacity: 0.9;
        }

        .faq-title {
          font-size: 3rem;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 24px;
        }

        .faq-description {
          font-size: 1rem;
          line-height: 1.7;
          opacity: 0.9;
          margin-bottom: 40px;
        }

        .stats-container {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .stat-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          min-width: 200px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .trophy-icon {
          background: linear-gradient(135deg, #0a5d7a 0%, #0e9ac7 100%);
          color: white;
        }

        .users-icon {
          background: linear-gradient(135deg, #0a5d7a 0%, #0e9ac7 100%);
          color: white;
        }

        .stat-content {
          flex: 1;
        }

        .stat-number {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1a2332;
          line-height: 1;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 0.95rem;
          color: #1a2332;
        }

        .faq-right {
          background: white;
          border-radius: 16px;
          padding: 40px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        }

        .accordion-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .accordion-item {
          border-bottom: 1px solid #e0e0e0;
          padding-bottom: 16px;
        }

        .accordion-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .accordion-header {
          width: 100%;
          background: none;
          border: none;
          padding: 20px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: all 0.3s ease;
          gap: 12px;
        }

        .accordion-item.active .accordion-header {
          background: linear-gradient(135deg, #0a5d7a 0%, #0e9ac7 100%);
          border-radius: 8px;
          padding: 20px 24px;
          margin: -4px 0 12px 0;
        }

        .accordion-question {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1a2332;
          text-align: left;
          transition: color 0.3s ease;
        }

        .accordion-item.active .accordion-question {
          color: white;
        }

        .accordion-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0a5d7a 0%, #0e9ac7 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .accordion-item.active .accordion-icon {
          background: white;
          color: #0a5d7a;
        }

        .accordion-icon svg {
          transition: transform 0.3s ease;
        }

        .accordion-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease, padding 0.4s ease;
          padding: 0 0;
        }

        .accordion-item.active .accordion-content {
          max-height: 500px;
          padding: 0 0 16px 0;
        }

        .accordion-content p {
          color: #6c757d;
          line-height: 1.7;
          font-size: 0.95rem;
        }

        @media (max-width: 1024px) {
          .faq-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .faq-title {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 768px) {
          .faq-section {
            padding: 60px 20px;
          }

          .faq-title {
            font-size: 2rem;
          }

          .faq-right {
            padding: 24px;
          }

          .stats-container {
            flex-direction: column;
          }

          .stat-card {
            width: 100%;
          }

          .accordion-question {
            font-size: 1rem;
          }

          .accordion-icon {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
      </section>
    </div>
  );
};

export default FAQSection;
