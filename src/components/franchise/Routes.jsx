import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardHome from './DashboardHome';
import KycVerification from './KycVerification';
import Profile from './Profile';
import DigitalAgreement from './DigitalAgreement';
import Business from './Business';
import BusinessMIS from './BusinessMIS';
import Leads from './Leads';
import Payouts from './Payouts';
import CreditCheck from './CreditCheck';
import ViewReports from './ViewReports';
import Referrals from './Referrals';
import Certificate from './Certificate';
import AIAnalysis from './AIAnalysis';
import Packages from './Packages';
import Payment from './Payment'; // Add Payment component

const FranchiseRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardHome />} />
      <Route path="/kyc" element={<KycVerification />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/agreement" element={<DigitalAgreement />} />
      <Route path="/business" element={<Business />} />
      <Route path="/mis" element={<BusinessMIS />} />
      <Route path="/leads" element={<Leads />} />
      <Route path="/payouts" element={<Payouts />} />
      <Route path="/credit-check" element={<CreditCheck />} />
      <Route path="/reports" element={<ViewReports />} />
      <Route path="/referrals" element={<Referrals />} />
      <Route path="/certificate" element={<Certificate />} />
      <Route path="/ai-analysis" element={<AIAnalysis />} />
      <Route path="/packages" element={<Packages />} />
      <Route path="/payment" element={<Payment />} /> {/* Add payment route */}
    </Routes>
  );
};

export default FranchiseRoutes;