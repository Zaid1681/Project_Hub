import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate, Link } from 'react-router-dom';

import ECommerce from './pages/Dashboard/ECommerce';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Loader from './common/Loader';
import ViewProject from './pages/ViewProject';
import ProjectPage from './pages/Details/ProjectPage';
import College from './pages/College';
import CommentPage from './pages/CommentPage';
import GroupComment from './pages/GroupComment';
import GroupSection from './pages/GroupSection';
import Profile from './pages/Profile';
import { BrowserRouter as Router } from 'react-router-dom';
// import ProjectList from './pages/Details/ProjectList';
const Home = lazy(() => import('./pages/Home'));
const Chart = lazy(() => import('./pages/Chart'));
const SubjectPage = lazy(() => import('./pages/Details/SubjectPage'));
const SeProject = lazy(() => import('./pages/SE/SeProject'));
const TeProject = lazy(() => import('./pages/TE/TeProject'));
const BeProject = lazy(() => import('./pages/BE/BeProject'));
const SeGroup = lazy(() => import('./pages/SE/SeGroup'));
const TeGroup = lazy(() => import('./pages/TE/TeGroup'));
const BeGroup = lazy(() => import('./pages/BE/BeGroup'));
const SeStudent = lazy(() => import('./pages/SE/SeStudent'));
const TeStudent = lazy(() => import('./pages/TE/TeStudent'));
const BeStudent = lazy(() => import('./pages/BE/BeStudent'));
const Semproject = lazy(() => import('./pages/Semproject'));
const Creategroup = lazy(() => import('./pages/Creategroup'));
const Addproject = lazy(() => import('./pages/Addproject'));
const Alerts = lazy(() => import('./pages/UiElements/Alerts'));
const Buttons = lazy(() => import('./pages/UiElements/Buttons'));
const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));
const StudentGroups = lazy(() => import('./pages/Details/StudentGroups'));
import { useSelector } from 'react-redux';
import AdminSignIn from './pages/Authentication/AdminSignIn';
import FacultyProjectDetail from './pages/Details/FacultyProjectDetail';
import HomePage from './pages/HomePage';
function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  const currentUser = useSelector((state) => state.user);
  console.log('current User==>', currentUser);
  const RequirePath = ({ children }) => {
    return currentUser.userToken == null ? (
      <Navigate to="/homepage" />
    ) : (
      children
    );
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Suspense fallback={<Loader />}>
        <Router>
          <Routes>
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/auth/signin" element={<SignIn />} />
            <Route path="/auth/signup" element={<SignUp />} />
            {/* signin used by faculty */}
            <Route path="/admin/auth/signin" element={<AdminSignIn />} />
            {/* main routing */}
            <Route element={<DefaultLayout />}>
              <Route
                index
                // path="/hh"
                element={
                  <Suspense fallback={<Loader />}>
                    <RequirePath>
                      <ECommerce />{' '}
                    </RequirePath>
                  </Suspense>
                }
              />
              <Route
                path="/home"
                element={
                  <Suspense fallback={<Loader />}>
                    <RequirePath>
                      <Home />
                    </RequirePath>
                  </Suspense>
                }
              />
              <Route
                path="/home/project/:id"
                element={
                  <Suspense fallback={<Loader />}>
                    <ViewProject />
                  </Suspense>
                }
              />
              {/* faculty page routes */}
              <Route
                path="/:currentYear/project/subject"
                element={
                  <Suspense fallback={<Loader />}>
                    <SubjectPage />
                  </Suspense>
                }
              />{' '}
              <Route
                path="/:currentYear/project/subject/project/projectlist/:subject/:semester/:academic/project/:projectId"
                element={
                  <Suspense fallback={<Loader />}>
                    <FacultyProjectDetail />
                  </Suspense>
                }
              />{' '}
              <Route
                path="/:currentYear/project/subject/project/projectlist/:subject/:semester/:academic"
                element={
                  <Suspense fallback={<Loader />}>
                    <ProjectPage />
                  </Suspense>
                }
              />
              <Route
                path="/:currentYear/group"
                element={
                  <Suspense fallback={<Loader />}>
                    <StudentGroups />
                  </Suspense>
                }
              />
              {/* <Route
                path="/:category/project/:subject"
                component={SubjectPage}
              />
              <Route
                path="/SE/group"
                element={
                  <Suspense fallback={<Loader />}>
                    <GroupPage />
                  </Suspense>
                }
              /> */}
              {/* <Route
                path="/SE/student"
                element={
                  <Suspense fallback={<Loader />}>
                    <StudentPage />
                  </Suspense>
                }
              /> */}
              <Route
                path="/semproject"
                element={
                  <Suspense fallback={<Loader />}>
                    <Semproject />
                  </Suspense>
                }
              />
              <Route
                path="/profile"
                element={
                  <Suspense fallback={<Loader />}>
                    <Profile />
                  </Suspense>
                }
              />
              {/* <Route
                path="/se/project"
                element={
                  <Suspense fallback={<Loader />}>
                    <SeProject />
                  </Suspense>
                }
              /> */}
              <Route
                path="/se/student"
                element={
                  <Suspense fallback={<Loader />}>
                    <SeStudent />
                  </Suspense>
                }
              />
              {/* <Route
                path="/te/group"
                element={
                  <Suspense fallback={<Loader />}>
                    <TeGroup />
                  </Suspense>
                }
              /> */}
              <Route
                path="/te/student"
                element={
                  <Suspense fallback={<Loader />}>
                    <TeStudent />
                  </Suspense>
                }
              />
              {/* <Route
                path="/fe/project"
                element={
                  <Suspense fallback={<Loader />}>
                    <BeProject />
                  </Suspense>
                }
              /> */}
              {/* <Route
                path="/fe/group"
                element={
                  <Suspense fallback={<Loader />}>
                    <BeGroup />
                  </Suspense>
                }
              /> */}
              <Route
                path="/fe/student"
                element={
                  <Suspense fallback={<Loader />}>
                    <BeStudent />
                  </Suspense>
                }
              />
              <Route
                path="/addproject"
                element={
                  <Suspense fallback={<Loader />}>
                    <Addproject />
                  </Suspense>
                }
              />
              <Route
                path="/creategroup"
                element={
                  <Suspense fallback={<Loader />}>
                    <Creategroup />
                  </Suspense>
                }
              />
              <Route
                path="/ui/alerts"
                element={
                  <Suspense fallback={<Loader />}>
                    <Alerts />
                  </Suspense>
                }
              />
              <Route
                path="/ui/buttons"
                element={
                  <Suspense fallback={<Loader />}>
                    <Buttons />
                  </Suspense>
                }
              />
              <Route
                path="/college"
                element={
                  <Suspense fallback={<Loader />}>
                    <College />
                  </Suspense>
                }
              />
              <Route
                path="/groupcomment"
                element={
                  <Suspense fallback={<Loader />}>
                    <GroupComment />
                  </Suspense>
                }
              />
              <Route
                path="/groupsection"
                element={
                  <Suspense fallback={<Loader />}>
                    <GroupSection />
                  </Suspense>
                }
              />
            </Route>
          </Routes>
        </Router>
      </Suspense>
    </>
  );
}

export default App;
