import React from 'react';

const WhyChooseUsSection = () => {
  const reasons = [
    {
      icon: '👥',
      title: 'Experienced Team',
      description: 'Deep credit-bureau expertise with proven track record in credit correction.'
    },
    {
      icon: '⚖️',
      title: 'Legally Compliant',
      description: '100% legally compliant dispute process following all regulatory guidelines.'
    },
    {
      icon: '🎯',
      title: 'Personalized Solutions',
      description: 'Customized approaches for each client based on their unique credit situation.'
    },
    {
      icon: '📊',
      title: 'High Success Rate',
      description: 'Proven success in error correction and significant score improvement.'
    },
    {
      icon: '🏆',
      title: 'Trusted Training',
      description: 'Trusted by professionals trained under Credit Dost Learning programs.'
    },
    {
      icon: '🤝',
      title: 'Continuous Support',
      description: 'End-to-end guidance and support throughout your credit improvement journey.'
    }
  ];

  return (
    <div style={{
      padding: '80px 20px',
      backgroundColor: '#ffffff',
      position: 'relative',
      overflow: 'hidden',
    }}>
      
      {/* Background Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(8, 145, 178, 0.05) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite',
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '8%',
        width: '250px',
        height: '250px',
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.04) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite reverse',
      }} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '60px',
        }}>
          <div style={{
            color: '#0891b2',
            fontSize: '0.9rem',
            fontWeight: '600',
            letterSpacing: '2px',
            marginBottom: '12px',
          }}>
            WHY CHOOSE US
          </div>
          
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: '700',
            color: '#0f172a',
            marginBottom: '16px',
            lineHeight: 1.2,
          }}>
            The Credit Dost Advantage
          </h2>
          
          <p style={{
            color: '#64748b',
            fontSize: '1.1rem',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            Experience the difference with our proven approach to credit score improvement
          </p>
        </div>

        {/* Reasons Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '30px',
          marginBottom: '60px',
        }}>
          {reasons.map((reason, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '20px',
                padding: '30px',
                backgroundColor: '#f8f9fa',
                borderRadius: '16px',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.backgroundColor = '#e0f2fe';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(8, 145, 178, 0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.backgroundColor = '#f8f9fa';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Icon */}
              <div style={{
                fontSize: '2.5rem',
                flexShrink: 0,
              }}>
                {reason.icon}
              </div>
              
              {/* Content */}
              <div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#0f172a',
                  marginBottom: '12px',
                }}>
                  {reason.title}
                </h3>
                <p style={{
                  color: '#64748b',
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  margin: 0,
                }}>
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
       
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
      `}</style>
    </div>
  );
};

export default WhyChooseUsSection;