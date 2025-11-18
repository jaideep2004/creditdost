import React from 'react';

const WhoWeAreSection = () => {
  return (
    <div style={{
      padding: '80px 20px',
      backgroundColor: '#ffffff',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '5%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(8, 145, 178, 0.05) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite',
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.04) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 10s ease-in-out infinite reverse',
      }} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '60px',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        
        {/* Left Side - Content */}
        <div style={{
          padding: '20px',
        }}>
          <div style={{
            color: '#0891b2',
            fontSize: '0.9rem',
            fontWeight: '600',
            letterSpacing: '2px',
            marginBottom: '12px',
          }}>
            WHO WE ARE
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: '700',
            color: '#0f172a',
            marginBottom: '24px',
            lineHeight: 1.2,
          }}>
            Your Trusted Partner in Credit Score Improvement
          </h2>

          <p style={{
            color: '#64748b',
            fontSize: '1.1rem',
            lineHeight: 1.7,
            marginBottom: '24px',
            fontWeight: '500',
          }}>
            At <strong>Credit Dost</strong>, we believe everyone deserves a second chance to rebuild their credit and financial confidence.
          </p>

          <p style={{
            color: '#64748b',
            fontSize: '1rem',
            lineHeight: 1.7,
            marginBottom: '32px',
          }}>
            We are India's dedicated <strong>Credit Score Improvement and Dispute Resolution Company</strong>, 
            helping individuals repair, rebuild, and manage their credit health with transparency, accuracy, and trust.
          </p>

          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '24px',
            borderRadius: '12px',
            borderLeft: '4px solid #0891b2',
          }}>
            <p style={{
              color: '#475569',
              fontSize: '1rem',
              lineHeight: 1.6,
              margin: 0,
              fontStyle: 'italic',
            }}>
              <strong>Credit Dost is a division of Optimystic Auxiliary Services Pvt. Ltd.</strong>, 
              a compliance-driven financial services organization. We bring together a team of trained credit professionals, 
              finance experts, and customer support specialists committed to simplifying credit score challenges.
            </p>
          </div>
        </div>

        {/* Right Side - Image/Graphic */}
        <div style={{
          position: 'relative',
          height: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Main Graphic */}
          <div style={{
            width: '100%',
            height: '400px',
            backgroundColor: '#e0f2fe',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              textAlign: 'center',
              color: '#0891b2',
              padding: '40px',
            }}>
              <div style={{
                fontSize: '3rem',
                fontWeight: '700',
                marginBottom: '16px',
              }}>
                📊
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '12px',
                color: '#0f172a',
              }}>
                Credit Health Matters
              </h3>
              <p style={{
                color: '#64748b',
                lineHeight: 1.6,
              }}>
                Transforming credit profiles with expertise and empathy
              </p>
            </div>
            
            {/* Decorative Elements */}
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '60px',
              height: '60px',
              backgroundColor: '#0891b2',
              borderRadius: '50%',
              opacity: 0.1,
            }} />
            <div style={{
              position: 'absolute',
              bottom: '30px',
              left: '30px',
              width: '40px',
              height: '40px',
              backgroundColor: '#0891b2',
              borderRadius: '50%',
              opacity: 0.1,
            }} />
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

export default WhoWeAreSection;