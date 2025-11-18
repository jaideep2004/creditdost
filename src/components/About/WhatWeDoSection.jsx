import React from 'react';

const WhatWeDoSection = () => {
  const services = [
    {
      icon: '🔍',
      title: 'Credit Report Analysis',
      description: 'Identifying reporting errors, inconsistencies, and improvement opportunities in your credit report.'
    },
    {
      icon: '⚡',
      title: 'Dispute & Correction Support',
      description: 'Coordinating with banks and credit bureaus to fix incorrect data and update your credit information.'
    },
    {
      icon: '🔄',
      title: 'Settlement-to-Closed Status Correction',
      description: 'Ensuring accurate reflection of paid or settled loans in your credit history.'
    },
    {
      icon: '📈',
      title: 'Score Improvement Programs',
      description: 'Step-by-step guidance through our Credit Boost Pro and Credit Boost Premier packages.'
    },
    {
      icon: '💬',
      title: 'Personalized Consultation',
      description: 'One-to-one assistance with actionable advice and continuous progress tracking.'
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
        top: '5%',
        right: '10%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(8, 145, 178, 0.05) 0%, transparent 70%)',
        borderRadius: '50%',
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '5%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.04) 0%, transparent 70%)',
        borderRadius: '50%',
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
            WHAT WE DO
          </div>
          
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: '700',
            color: '#0f172a',
            marginBottom: '16px',
            lineHeight: 1.2,
          }}>
            Comprehensive Credit Solutions
          </h2>
          
          <p style={{
            color: '#64748b',
            fontSize: '1.1rem',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            Specialized services designed to repair, rebuild, and manage your credit health effectively
          </p>
        </div>

        {/* Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
        }}>
          {services.map((service, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#f8f9fa',
                padding: '40px 30px',
                borderRadius: '16px',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                border: '1px solid #e2e8f0',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.backgroundColor = '#ffffff';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.backgroundColor = '#f8f9fa';
              }}
            >
              {/* Icon */}
              <div style={{
                fontSize: '3rem',
                marginBottom: '20px',
              }}>
                {service.icon}
              </div>
              
              {/* Title */}
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#0f172a',
                marginBottom: '16px',
              }}>
                {service.title}
              </h3>
              
              {/* Description */}
              <p style={{
                color: '#64748b',
                fontSize: '0.95rem',
                lineHeight: 1.6,
                margin: 0,
              }}>
                {service.description}
              </p>
              
              {/* Hover Effect Line */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '0',
                height: '3px',
                backgroundColor: '#0891b2',
                transition: 'width 0.3s ease',
              }} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        {/* <div style={{
          textAlign: 'center',
          marginTop: '60px',
          padding: '40px',
          backgroundColor: '#f8f9fa',
          borderRadius: '16px',
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#0f172a',
            marginBottom: '16px',
          }}>
            Ready to Transform Your Credit?
          </h3>
          <p style={{
            color: '#64748b',
            fontSize: '1rem',
            marginBottom: '24px',
            maxWidth: '500px',
            margin: '0 auto 24px',
          }}>
            Start your credit improvement journey today with expert guidance
          </p>
          <button style={{
            backgroundColor: '#0891b2',
            color: 'white',
            padding: '14px 32px',
            borderRadius: '50px',
            border: 'none',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#0e7490';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#0891b2';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            Get Started Today
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default WhatWeDoSection;