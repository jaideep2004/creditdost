import React from 'react';

const MissionSection = () => {
  const values = [
    {
      icon: '🔍',
      title: 'Transparency',
      description: 'Every process, explained clearly to every client. No hidden terms, no surprises.'
    },
    {
      icon: '⚖️',
      title: 'Integrity',
      description: 'No shortcuts, no false promises — only genuine guidance and ethical practices.'
    },
    {
      icon: '❤️',
      title: 'Empathy',
      description: 'We understand financial struggles and treat every case with care and compassion.'
    },
    {
      icon: '🚀',
      title: 'Innovation',
      description: 'Using data, AI, and technology to make credit correction smarter and faster.'
    },
    {
      icon: '🎯',
      title: 'Results',
      description: 'Because trust is built on visible improvement and delivered outcomes.'
    }
  ];

  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      padding: '80px 0'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 24px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '40% 60%',
          gap: '48px'
        }}>
          
          {/* Left Side - Mission & Vision */}
          <div>
            <div style={{
              color: '#0891b2',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              marginBottom: '16px'
            }}>
              OUR MISSION & VISION
            </div>
            
            <h2 style={{
              color: '#1e293b',
              fontSize: '42px',
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: '48px',
              marginTop: 0
            }}>
              Building Financial Confidence
            </h2>

            {/* Mission */}
            <div style={{
              marginBottom: '40px',
              padding: '30px',
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 5px 20px rgba(0, 0, 0, 0.08)',
            }}>
              <h3 style={{
                color: '#0891b2',
                fontSize: '1.25rem',
                fontWeight: 600,
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}>
                <span>🎯</span> Our Mission
              </h3>
              <p style={{
                color: '#475569',
                fontSize: '1rem',
                lineHeight: 1.7,
                margin: 0,
              }}>
                To help every individual gain financial credibility and access fair lending opportunities by making credit repair simple, transparent, and result-oriented.
              </p>
            </div>

            {/* Vision */}
            <div style={{
              padding: '30px',
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 5px 20px rgba(0, 0, 0, 0.08)',
            }}>
              <h3 style={{
                color: '#0891b2',
                fontSize: '1.25rem',
                fontWeight: 600,
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}>
                <span>🌟</span> Our Vision
              </h3>
              <p style={{
                color: '#475569',
                fontSize: '1rem',
                lineHeight: 1.7,
                margin: 0,
              }}>
                To be India's most trusted and recognized name in credit score improvement — transforming millions of credit profiles and enabling financial freedom for all.
              </p>
            </div>
          </div>

          {/* Right Side - Values */}
          <div>
            <div style={{
              color: '#0891b2',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              marginBottom: '16px'
            }}>
              OUR VALUES
            </div>
            
            <h3 style={{
              color: '#1e293b',
              fontSize: '1.75rem',
              fontWeight: 600,
              marginBottom: '32px',
            }}>
              The Principles That Guide Us
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {values.map((value, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    gap: '20px',
                    alignItems: 'flex-start',
                    padding: '24px',
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 3px 15px rgba(0, 0, 0, 0.08)',
                    transition: 'transform 0.3s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateX(8px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  {/* Icon */}
                  <div style={{
                    minWidth: '50px',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#e0f2fe',
                    borderRadius: '12px',
                    fontSize: '1.5rem',
                  }}>
                    {value.icon}
                  </div>

                  {/* Content */}
                  <div>
                    <h4 style={{
                      color: '#1e293b',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      marginBottom: '8px',
                      marginTop: 0
                    }}>
                      {value.title}
                    </h4>
                    <p style={{
                      color: '#64748b',
                      fontSize: '0.95rem',
                      lineHeight: 1.6,
                      margin: 0
                    }}>
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionSection;