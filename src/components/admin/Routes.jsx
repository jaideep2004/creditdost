import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboardHome from './AdminDashboardHome';
import ManageFranchises from './ManageFranchises';
import ManagePackages from './ManagePackages';
import ManageLeads from './ManageLeads';
import ManagePayouts from './ManagePayouts';
import ViewReports from './ViewReports';
import ManageReferrals from './ManageReferrals';
import SurepassSettings from './SurepassSettings';
import RechargeCredits from './RechargeCredits';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<AdminDashboardHome />} />
      <Route path="/franchises" element={<ManageFranchises />} />
      <Route path="/packages" element={<ManagePackages />} />
      <Route path="/leads" element={<ManageLeads />} />
      <Route path="/payouts" element={<ManagePayouts />} />
      <Route path="/reports" element={<ViewReports />} />
      <Route path="/referrals" element={<ManageReferrals />} />
      <Route path="/surepass-settings" element={<SurepassSettings />} />
      <Route path="/recharge" element={<RechargeCredits />} />
    </Routes>
  );
};

export default AdminRoutes;