import React from 'react';

const HistorySection = () => {
  return (
    <div style={{
      padding: '80px 20px',
      backgroundColor: '#f8f9fa',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(8, 145, 178, 0.05) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite',
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.04) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 10s ease-in-out infinite reverse',
      }} />

      {/* Curved SVG Lines */}
      <svg style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        opacity: 0.08,
        pointerEvents: 'none',
      }}>
        <path
          d="M 0 150 Q 300 100 600 150 T 1200 150"
          stroke="rgba(8, 145, 178, 0.6)"
          strokeWidth="2"
          fill="none"
          style={{
            animation: 'dashMove 25s linear infinite',
            strokeDasharray: '10 5',
          }}
        />
        <path
          d="M -100 400 Q 400 350 800 400 T 1600 400"
          stroke="rgba(8, 145, 178, 0.4)"
          strokeWidth="1.5"
          fill="none"
          style={{
            animation: 'dashMove 30s linear infinite reverse',
            strokeDasharray: '8 4',
          }}
        />
      </svg>

      {/* Rotating Arc */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '15%',
        width: '250px',
        height: '250px',
        border: '1px solid rgba(8, 145, 178, 0.1)',
        borderRadius: '50%',
        animation: 'rotateArc 20s linear infinite',
      }} />

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '60px',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Left Side - Overlapping Images with Badge */}
        <div style={{
          position: 'relative',
          height: '600px',
          padding: '20px',
        }}>
          {/* Decorative Dots - Left */}
          <div style={{
            position: 'absolute',
            left: '0',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            zIndex: 1,
          }}>
            {[...Array(7)].map((_, i) => (
              <div key={i} style={{
                width: '8px',
                height: '8px',
                backgroundColor: '#0891b2',
                borderRadius: '50%',
                opacity: 0.6,
              }} />
            ))}
          </div>

          {/* Decorative Dots - Bottom */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '35%',
            display: 'flex',
            gap: '15px',
            zIndex: 1,
          }}>
            {[...Array(7)].map((_, i) => (
              <div key={i} style={{
                width: '8px',
                height: '8px',
                backgroundColor: '#0891b2',
                borderRadius: '50%',
                opacity: 0.6,
              }} />
            ))}
          </div>

          {/* Wavy Lines Decoration */}
          <svg style={{
            position: 'absolute',
            top: '15%',
            right: '5%',
            width: '80px',
            height: '120px',
            opacity: 0.3,
            zIndex: 1,
          }} viewBox="0 0 100 150">
            <path d="M 20 20 Q 30 40 20 60 Q 10 80 20 100 Q 30 120 20 140" 
              stroke="#94a3b8" 
              strokeWidth="2" 
              fill="none" />
            <path d="M 40 20 Q 50 40 40 60 Q 30 80 40 100 Q 50 120 40 140" 
              stroke="#94a3b8" 
              strokeWidth="2" 
              fill="none" />
            <path d="M 60 20 Q 70 40 60 60 Q 50 80 60 100 Q 70 120 60 140" 
              stroke="#94a3b8" 
              strokeWidth="2" 
              fill="none" />
          </svg>

          {/* Top Left Image - Overlapping */}
          <div style={{
            position: 'absolute',
            top: '19px',
            left: '50px',
            width: '61%',
            height: '350px',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15)',
            backgroundColor: '#e2e8f0',
            zIndex: 3,
          }}>
            <img 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&h=600&fit=crop" 
              alt="Business professional"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* Bottom Right Image - Overlapping */}
          <div style={{
            position: 'absolute',
            bottom: '50px',
            right: '20px',
            width: '380px',
            height: '320px',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15)',
            backgroundColor: '#e2e8f0',
            zIndex: 2,
          }}>
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop" 
              alt="Team collaboration"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* Experience Badge - Overlapping both images */}
          <div style={{
            position: 'absolute',
            top: '18%',
            right: '12%',
            backgroundColor: '#0891b2',
            color: 'white',
            padding: '25px 35px',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 15px 40px rgba(8, 145, 178, 0.4)',
            zIndex: 10,
          }}>
            <div style={{
              fontSize: '3.5rem',
              fontWeight: '700',
              lineHeight: 1,
            }}>25</div>
            <div style={{
              fontSize: '0.95rem',
              fontWeight: '500',
              marginTop: '8px',
              lineHeight: 1.3,
            }}>Years Of<br />experience</div>
          </div>
        </div>

        {/* Right Side - Content */}
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
            ABOUT US
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: '700',
            color: '#0f172a',
            marginBottom: '24px',
            lineHeight: 1.2,
          }}>
            Solutions That Make a Difference
          </h2>

          <p style={{
            color: '#64748b',
            fontSize: '1rem',
            lineHeight: 1.7,
            marginBottom: '32px',
          }}>
            Payment stions enable businesses to accept payments from ctly customers ctly securely. stions enable businesses to accept payments from ctly customers ctly securely.
          </p>

          {/* Features Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            marginBottom: '36px',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                backgroundColor: '#0891b2',
                borderRadius: '50%',
                flexShrink: 0,
                marginTop: '6px',
              }} />
              <span style={{
                color: '#475569',
                fontSize: '0.95rem',
                lineHeight: 1.5,
              }}>Mistakes To Avoid to dum Auam.</span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                backgroundColor: '#0891b2',
                borderRadius: '50%',
                flexShrink: 0,
                marginTop: '6px',
              }} />
              <span style={{
                color: '#475569',
                fontSize: '0.95rem',
                lineHeight: 1.5,
              }}>Avoid to the dumy mistakes</span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                backgroundColor: '#0891b2',
                borderRadius: '50%',
                flexShrink: 0,
                marginTop: '6px',
              }} />
              <span style={{
                color: '#475569',
                fontSize: '0.95rem',
                lineHeight: 1.5,
              }}>Your Startup industry stan</span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                backgroundColor: '#0891b2',
                borderRadius: '50%',
                flexShrink: 0,
                marginTop: '6px',
              }} />
              <span style={{
                color: '#475569',
                fontSize: '0.95rem',
                lineHeight: 1.5,
              }}>Our Startup industry Here</span>
            </div>
          </div>

          {/* Button */}
          <button style={{
            backgroundColor: '#0891b2',
            color: 'white',
            padding: '16px 40px',
            borderRadius: '50px',
            border: 'none',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(8, 145, 178, 0.3)',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#0e7490';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(8, 145, 178, 0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#0891b2';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(8, 145, 178, 0.3)';
          }}>
            About Us
            <span style={{
              fontSize: '1.2rem',
              fontWeight: '300',
            }}>+</span>
          </button>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        backgroundColor: '#0891b2',
        color: 'white',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        border: 'none',
        fontSize: '1.5rem',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(8, 145, 178, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
        zIndex: 1000,
      }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = '#0e7490';
        e.currentTarget.style.transform = 'translateY(-3px)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = '#0891b2';
        e.currentTarget.style.transform = 'translateY(0)';
      }}>
        ↑
      </button>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-30px);
          }
        }

        @keyframes rotateArc {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes dashMove {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: 100;
          }
        }
      `}</style>
    </div>
  );
};

export default HistorySection;