import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Routes as AppRoutes } from "../routes";
import PrivateRoute from "./PrivateRoute";

// pages
import Presentation from "./Presentation";
import Upgrade from "./Upgrade";
import DashboardOverview from "./dashboard/DashboardOverview";
import Transactions from "./Transactions";
import Settings from "./Settings";
import BootstrapTables from "./tables/BootstrapTables";
import Signin from "./examples/Signin";
import Signup from "./examples/Signup";
import ForgotPassword from "./examples/ForgotPassword";
import ResetPassword from "./examples/ResetPassword";
import Lock from "./examples/Lock";
import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";

// documentation pages
import DocsOverview from "./documentation/DocsOverview";
import DocsDownload from "./documentation/DocsDownload";
import DocsQuickStart from "./documentation/DocsQuickStart";
import DocsLicense from "./documentation/DocsLicense";
import DocsFolderStructure from "./documentation/DocsFolderStructure";
import DocsBuild from "./documentation/DocsBuild";
import DocsChangelog from "./documentation/DocsChangelog";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

import Accordion from "./components/Accordion";
import Alerts from "./components/Alerts";
import Badges from "./components/Badges";
import Breadcrumbs from "./components/Breadcrumbs";
import Buttons from "./components/Buttons";
import Forms from "./components/Forms";
import Modals from "./components/Modals";
import Navs from "./components/Navs";
import Navbars from "./components/Navbars";
import Pagination from "./components/Pagination";
import Popovers from "./components/Popovers";
import Progress from "./components/Progress";
import Tables from "./components/Tables";
import Tabs from "./components/Tabs";
import Tooltips from "./components/Tooltips";
import Toasts from "./components/Toasts";
import DoctorOne from "./DoctorOne";
import DoctorEdit from "./DoctorEdit";
import DoctorCreate from "./DoctorCreate";
import LabOne from "./LabOne";
import LabEdit from "./LabEdit";
import LabCreate from "./LabCreate";
import LabTransactions from "./LabTransactions";
import UserCreate from "./UserCreate";
import UserOne from "./UserOne";
import UserTransactions from "./UserTransactions";
import UserEdit from "./UserEdit";
import PharmacyTransactions from "./PharmacyTransactions";
import PharmacyOne from "./PharmacyOne";
import PharmacyEdit from "./PharmacyEdit";
import PharmacyCreate from "./PharmacyCreate";
import HPPTransactions from "./HPPTransactions";
import HPPOne from "./HPPOne";
import HPPEdit from "./HPPEdit";
import HPPCreate from "./HPPCreate";
import CarrersTransactions from "./CarrersTransactions";
import JobOne from "./JobOne";
import JobCreate from "./JobCreate";
import InterestedPersonTransactions from "./InterestedPersonTransactions";

const LoaderWrapper = ({ children }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Preloader show={!loaded} />
      {loaded && children}
    </>
  );
};

const SidebarWrapper = ({ children }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem("settingsVisible") !== "false";
  };

  const [showSettings, setShowSettings] = useState(
    localStorageIsSettingsVisible
  );

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem("settingsVisible", !showSettings);
  };

  return (
    <>
      {/* <Preloader show={!loaded} /> */}
      <Sidebar />
      <main className="content">
        <Navbar />
        {loaded && children}
        <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
      </main>
    </>
  );
};

export default () => (
  <Routes>
    <Route
      path={AppRoutes.Presentation.path}
      element={
        <LoaderWrapper>
          <Presentation />
        </LoaderWrapper>
      }
    />
    <Route
      path={AppRoutes.Signin.path}
      element={
        <LoaderWrapper>
          <Signin />
        </LoaderWrapper>
      }
    />
    <Route
      path={AppRoutes.Signup.path}
      element={
        <LoaderWrapper>
          <Signup />
        </LoaderWrapper>
      }
    />
    <Route
      path={AppRoutes.ForgotPassword.path}
      element={
        <LoaderWrapper>
          <ForgotPassword />
        </LoaderWrapper>
      }
    />
    <Route
      path={AppRoutes.ResetPassword.path}
      element={
        <LoaderWrapper>
          <ResetPassword />
        </LoaderWrapper>
      }
    />
    <Route
      path={AppRoutes.Lock.path}
      element={
        <LoaderWrapper>
          <Lock />
        </LoaderWrapper>
      }
    />
    <Route
      path={AppRoutes.NotFound.path}
      element={
        <LoaderWrapper>
          <NotFoundPage />
        </LoaderWrapper>
      }
    />
    <Route
      path={AppRoutes.ServerError.path}
      element={
        <LoaderWrapper>
          <ServerError />
        </LoaderWrapper>
      }
    />

    {/* pages */}
    <Route
      path={AppRoutes.DashboardOverview.path}
      element={
        <PrivateRoute
          component={() => (
            <SidebarWrapper>
              <DashboardOverview />
            </SidebarWrapper>
          )}
        />
      }
    />
    <Route
      path={AppRoutes.Settings.path}
      element={
        <PrivateRoute
          component={() => (
            <SidebarWrapper>
              <Settings />
            </SidebarWrapper>
          )}
        />
      }
    />

    <Route
      path={AppRoutes.DoctorList.path}
      element={
        <PrivateRoute
          component={() => (
            <SidebarWrapper>
              <Transactions />
            </SidebarWrapper>
          )}
        />
      }
    />
    <Route
      path={AppRoutes.DoctorOne.path}
      element={
        <PrivateRoute
          component={() => (
            <SidebarWrapper>
              <DoctorOne />
            </SidebarWrapper>
          )}
        />
      }
    />
    <Route
      path={AppRoutes.DoctorEdit.path}
      element={
        <PrivateRoute
          component={() => (
            <SidebarWrapper>
              <DoctorEdit />
            </SidebarWrapper>
          )}
        />
      }
    />
    <Route
      path={AppRoutes.DoctorCreate.path}
      element={
        <PrivateRoute
          component={() => (
            <SidebarWrapper>
              <DoctorCreate />
            </SidebarWrapper>
          )}
        />
      }
    />
    <Route
      path={AppRoutes.LabList.path}
      element={
        <PrivateRoute
          component={() => (
            <SidebarWrapper>
              <LabTransactions />
            </SidebarWrapper>
          )}
        />
      }
    />
    <Route
      path={AppRoutes.LabOne.path}
      element={
        <PrivateRoute
          component={() => (
            <SidebarWrapper>
              <LabOne />
            </SidebarWrapper>
          )}
        />
      }
    />
    <Route
      path={AppRoutes.LabEdit.path}
      element={
        <PrivateRoute
          component={() => (
            <SidebarWrapper>
              <LabEdit />
            </SidebarWrapper>
          )}
        />
      }
    />
    <Route
      path={AppRoutes.LabCreate.path}
      element={
        <PrivateRoute
          component={() => (
            <SidebarWrapper>
              <LabCreate />
            </SidebarWrapper>
          )}
        />
      }
    />
    <Route
      path={AppRoutes.UserList.path}
      element={
        <PrivateRoute
          component={() => (
            <SidebarWrapper>
              <UserTransactions />
            </SidebarWrapper>
          )}
        />
      }
    />
    <Route
      path={AppRoutes.UserOne.path}
      element={
        <PrivateRoute
          component={() => (
            <SidebarWrapper>
              <UserOne />
            </SidebarWrapper>
          )}
        />
      }
    />
    <Route
      path={AppRoutes.UserEdit.path}
      element={
        <PrivateRoute
          component={() => (
            <SidebarWrapper>
              <UserEdit />
            </SidebarWrapper>
          )}
        />
      }
    />
    <Route
      path={AppRoutes.UserCreate.path}
      element={
        <PrivateRoute
          component={() => (
            <SidebarWrapper>
              <UserCreate />
            </SidebarWrapper>
          )}
        />
      }
    />
    <Route
      path={AppRoutes.PharmacyList.path}
      element={
        <PrivateRoute
          component={() => (
            <SidebarWrapper>
              <PharmacyTransactions />
            </SidebarWrapper>
          )}
        />
      }
    />
    <Route
      path={AppRoutes.PharmacyOne.path}
      element={
        <PrivateRoute
          component={() => (
            <SidebarWrapper>
              <PharmacyOne />
            </SidebarWrapper>
          )}
        />
      }
    />
    <Route
      path={AppRoutes.PharmacyEdit.path}
      element={
        <PrivateRoute
          component={() => (
            <SidebarWrapper>
              <PharmacyEdit />
            </SidebarWrapper>
          )}
        />
      }
    />
    <Route
      path={AppRoutes.PharmacyCreate.path}
      element={
        <PrivateRoute
          component={() => (
            <SidebarWrapper>
              <PharmacyCreate />
            </SidebarWrapper>
          )}
        />
      }
    />
    <Route
      path={AppRoutes.HPPList.path}
      element={
        <PrivateRoute
          component={() => (
            <SidebarWrapper>
              <HPPTransactions />
            </SidebarWrapper>
          )}
        />
      }
    />
    <Route
      path={AppRoutes.HPPOne.path}
      element={
        <PrivateRoute
          component={() => (
            <SidebarWrapper>
              <HPPOne />
            </SidebarWrapper>
          )}
        />
      }
    />
    <Route
      path={AppRoutes.HPPEdit.path}
      element={
        <PrivateRoute
          component={() => (
            <SidebarWrapper>
              <HPPEdit />
            </SidebarWrapper>
          )}
        />
      }
    />
    <Route
      path={AppRoutes.HPPCreate.path}
      element={
        <PrivateRoute
          component={() => (
            <SidebarWrapper>
              <HPPCreate />
            </SidebarWrapper>
          )}
        />
      }
    />
    <Route
      path={AppRoutes.Careers.path}
      element={
        <PrivateRoute
          component={() => (
            <SidebarWrapper>
              <CarrersTransactions />
            </SidebarWrapper>
          )}
        />
      }
    />
    <Route
      path={AppRoutes.JobCreate.path}
      element={
        <PrivateRoute
          component={() => (
            <SidebarWrapper>
              <JobCreate />
            </SidebarWrapper>
          )}
        />
      }
    />
    <Route
      path={AppRoutes.JobOne.path}
      element={
        <PrivateRoute
          component={() => (
            <SidebarWrapper>
              <JobOne />
            </SidebarWrapper>
          )}
        />
      }
    />
    <Route
      path={AppRoutes.InterestedPerson.path}
      element={
        <PrivateRoute
          component={() => (
            <SidebarWrapper>
              <InterestedPersonTransactions />
            </SidebarWrapper>
          )}
        />
      }
    />
    <Route path="*" element={<Navigate to={AppRoutes.NotFound.path} />} />
  </Routes>
);
