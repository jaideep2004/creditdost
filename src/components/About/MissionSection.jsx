import React from 'react';

const MissionSection = () => {
  const processes = [
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v6m0 6v6m5.2-14.8l-4.2 4.2m0 5.2l4.2 4.2M23 12h-6m-6 0H1m14.8 5.2l-4.2-4.2m0-5.2l-4.2-4.2"/>
        </svg>
      ),
      title: 'Best emplementation',
      description: 'Ished fact that a reader will be distrol acted bioiiy desig the.ished fact that a reader will be distrol acted bioiiy bioiiy desig the.ished fact that a reader.'
    },
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v6m0 6v6"/>
          <circle cx="12" cy="12" r="10"/>
          <path d="M8 12h8"/>
        </svg>
      ),
      title: 'Design make for you',
      description: 'Ished fact that a reader will be distrol acted bioiiy desig the.ished fact that a reader will be distrol acted bioiiy bioiiy desig the.ished fact that a reader.'
    },
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
      ),
      title: 'Finished the process',
      description: 'Ished fact that a reader will be distrol acted bioiiy desig the.ished fact that a reader will be distrol acted bioiiy bioiiy desig the.ished fact that a reader.'
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
          {/* Left Side - Content */}
          <div>
            <div style={{
              color: '#0891b2',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              marginBottom: '16px'
            }}>
              OUR WORK PROCESS
            </div>
            
            <h2 style={{
              color: '#1e293b',
              fontSize: '42px',
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: '48px',
              marginTop: 0
            }}>
              Strategy is the key to success
            </h2>

            {/* Process Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {processes.map((process, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    gap: '24px',
                    borderLeft: '3px solid #e2e8f0',
                    paddingLeft: '24px',
                    paddingTop: '8px',
                    paddingBottom: '8px'
                  }}
                >
                  {/* Icon */}
                  <div style={{
                    minWidth: '60px',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0891b2'
                  }}>
                    {process.icon}
                  </div>

                  {/* Content */}
                  <div>
                    <h3 style={{
                      color: '#1e293b',
                      fontSize: '22px',
                      fontWeight: 600,
                      marginBottom: '12px',
                      marginTop: 0
                    }}>
                      {process.title}
                    </h3>
                    <p style={{
                      color: '#64748b',
                      fontSize: '15px',
                      lineHeight: 1.7,
                      margin: 0
                    }}>
                      {process.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Images */}
          <div style={{ position: 'relative', height: '600px' }}>
            {/* Trusted By Badge */}
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              border: '3px dashed rgba(255,255,255,0.3)',
              zIndex: 10
            }}>
              <div style={{ fontSize: '16px', fontWeight: 500, marginBottom: '4px' }}>
                Trusted By
              </div>
              <div style={{ fontSize: '52px', fontWeight: 700, lineHeight: 1 }}>
                2345
              </div>
            </div>

            {/* Top Image */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: '80px',
              // height: '45%',
              // backgroundColor: '#cbd5e1',
              borderRadius: '8px',
              overflow: 'hidden',
              zIndex: 5
              // boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                // width: '100%',
                // height: '100%',
                // background: 'linear-gradient(135deg, #94a3b8 0%, #cbd5e1 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {/* <span style={{ color: '#64748b', fontSize: '14px' }}>
                  Office Team Image
                </span> */}
                <img src='/images/abt1.jpg'/>
              </div>
            </div>

            {/* Bottom Image */}
            <div style={{
              position: 'absolute',
              bottom: "-34px",
              right: 0,
              left: '145px',
              height: '50%',
              // backgroundColor: '#cbd5e1',
              borderRadius: '8px',
              overflow: 'hidden',
              // boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                // width: '100%',
                // height: '100%',
                // background: 'linear-gradient(135deg, #94a3b8 0%, #cbd5e1 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img src='/images/abt2.jpg'/>
              </div>
            </div>

            {/* Project Complete Badge */}
            <div style={{
              position: 'absolute',
              bottom: '45%',
              left: 0,
              backgroundColor: 'white',
              borderRadius: '50px',
              padding: '16px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              zIndex: 10
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: '#e0f2fe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0891b2'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '28px', fontWeight: 700, color: '#1e293b', lineHeight: 1 }}>
                  10k+
                </div>
                <div style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>
                  Project Complete
                </div>
              </div>
            </div>

           
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionSection;
