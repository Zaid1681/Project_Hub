import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate, Link } from 'react-router-dom';
import ECommerce from './pages/Dashboard/ECommerce';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Loader from './common/Loader';
import ViewProject from './pages/ViewProject';
// import ProjectDetails from './pages/ProjectDetails';
import ProjectPage from './pages/Details/ProjectPage';
import College from './pages/College';
import CommentPage from './pages/CommentPage';
import GroupComment from './pages/GroupComment';
import GroupSection from './pages/GroupSection';
import Profile from './pages/Profile';
import { BrowserRouter as Router } from 'react-router-dom';

// import ProjectList from './pages/Details/ProjectList';
const Home = lazy(() => import('./pages/Home'));
// const Chart = lazy(() => import('./pages/Chart'));
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
const AssignTaskFaculty = lazy(() =>
  import('./pages/TaskAssignPage/AssignTaskFaculty')
);

import FacultyProfile from './pages/FacultyGroupVPage/FacultyProfile';
const TaskSubmissions = lazy(() =>
  import('./pages/TaskAssignPage/TaskSubmissions')
);
const Creategroup = lazy(() => import('./pages/Creategroup'));
const Addproject = lazy(() => import('./pages/Addproject'));
const Alerts = lazy(() => import('./pages/UiElements/Alerts'));
const Buttons = lazy(() => import('./pages/UiElements/Buttons'));
const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));
const StudentGroups = lazy(() => import('./pages/Details/StudentGroups'));
const GroupViewPage = lazy(() =>
  import('./pages/FacultyGroupVPage/GroupViewPage')
);
const FacultyGroupspage = lazy(() =>
  import('./pages/FacultyGroupVPage/FacultyGroupspage')
);
const IndividualGroupPage = lazy(() =>
  import('./pages/FacultyGroupVPage/IndividualGroupPage')
);
const GroupDetailsPage = lazy(() =>
  import('./pages/FacultyGroupVPage/GroupDetailsPage')
);
const IndividualGroupDetailsPage = lazy(() =>
  import('./pages/IndividualGroupDetailsPage')
);

const TaskPage = lazy(() => import('./pages/TaskPage'));
import { useSelector } from 'react-redux';
import AdminSignIn from './pages/Authentication/AdminSignIn';
import FacultyProjectDetail from './pages/Details/FacultyProjectDetail';
import HomePage from './pages/HomePage';
import ApprovedGroupsPage from './pages/FacultyGroupVPage/component/ApprovedGroupsPage';
import ViewProject2 from './pages/ViewProject2';
import GroupSubmission from './pages/groupSubmission';
import AboutPage from './pages/AboutPage';
function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  const currentUser = useSelector((state) => state.user);
  // console.log('current User==>', currentUser);
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
            <Route path="/aboutpage" element={<AboutPage />} />
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
                    <RequirePath>
                      <ViewProject />
                    </RequirePath>
                    {/* <ViewProject2 /> */}
                  </Suspense>
                }
              />
              {/* faculty page routes */}
              <Route
                path="/:currentYear/project/subject"
                element={
                  <Suspense fallback={<Loader />}>
                    <RequirePath>
                      <SubjectPage />
                    </RequirePath>
                  </Suspense>
                }
              />{' '}
              <Route
                path="/:currentYear/project/subject/project/projectlist/:subject/:semester/:academic/project/:projectId"
                element={
                  <Suspense fallback={<Loader />}>
                    <RequirePath>
                      <FacultyProjectDetail />
                    </RequirePath>
                  </Suspense>
                }
              />
              <Route
                path="/:currentYear/project/subject/project/projectlist/:subject/:semester/:academic"
                element={
                  <Suspense fallback={<Loader />}>
                    <RequirePath>
                      <ProjectPage />
                    </RequirePath>
                  </Suspense>
                }
              />
              {/* Groups Section and its Routes */}
              <Route
                path="/:currentYear/groups/groupsList/:subject/:semester/:academic"
                element={
                  <Suspense fallback={<Loader />}>
                    <RequirePath>
                      <FacultyGroupspage />
                    </RequirePath>
                  </Suspense>
                }
              />
              <Route
                path="/:currentYear/groups/groupsList/:subject/:semester/:academic/:groupId"
                element={
                  <Suspense fallback={<Loader />}>
                    <RequirePath>
                      <IndividualGroupPage />
                    </RequirePath>
                  </Suspense>
                }
              />
              <Route
                path="/facultyprofile"
                element={
                  <Suspense fallback={<Loader />}>
                    <RequirePath>
                      <FacultyProfile />
                    </RequirePath>
                  </Suspense>
                }
              />
              {/* <Route
                path="/:currentYear/groups/approved/groupsList/:subject/:semester/:academic"
                element={
                  <Suspense fallback={<Loader />}>
                    <ApprovedGroupsPage />
                  </Suspense>
                }
              /> */}
              <Route
                path="/group/get/:id"
                element={
                  <Suspense fallback={<Loader />}>
                    <RequirePath>
                      <GroupDetailsPage />
                    </RequirePath>
                  </Suspense>
                }
              />
              <Route
                path="/groupsection/group/:id"
                element={
                  <Suspense fallback={<Loader />}>
                    <RequirePath>
                      <IndividualGroupDetailsPage />
                    </RequirePath>
                  </Suspense>
                }
              />
              <Route
                path="/:currentYear/group"
                element={
                  <Suspense fallback={<Loader />}>
                    <RequirePath>
                      <GroupViewPage />
                    </RequirePath>
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
                    <RequirePath>
                      <Semproject />
                    </RequirePath>
                  </Suspense>
                }
              />
              <Route
                path="/profile"
                element={
                  <Suspense fallback={<Loader />}>
                    <RequirePath>
                      <Profile />
                    </RequirePath>
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
                    <RequirePath>
                      <SeStudent />
                    </RequirePath>
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
                    <RequirePath>
                      <TeStudent />
                    </RequirePath>
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
                    <RequirePath>
                      <BeStudent />
                    </RequirePath>
                  </Suspense>
                }
              />
              <Route
                path="/addproject"
                element={
                  <Suspense fallback={<Loader />}>
                    <RequirePath>
                      <Addproject />
                    </RequirePath>
                  </Suspense>
                }
              />
              <Route
                path="/creategroup"
                element={
                  <Suspense fallback={<Loader />}>
                    <RequirePath>
                      <Creategroup />
                    </RequirePath>
                  </Suspense>
                }
              />
              <Route
                path="/ui/alerts"
                element={
                  <Suspense fallback={<Loader />}>
                    <RequirePath>
                      <Alerts />
                    </RequirePath>
                  </Suspense>
                }
              />
              <Route
                path="/ui/buttons"
                element={
                  <Suspense fallback={<Loader />}>
                    <RequirePath>
                      <Buttons />
                    </RequirePath>
                  </Suspense>
                }
              />
              <Route
                path="/college"
                element={
                  <Suspense fallback={<Loader />}>
                    <RequirePath>
                      <College />
                    </RequirePath>
                  </Suspense>
                }
              />
              <Route
                path="/groupcomment"
                element={
                  <Suspense fallback={<Loader />}>
                    <RequirePath>
                      <GroupComment />
                    </RequirePath>
                  </Suspense>
                }
              />
              <Route
                path="/groupsection"
                element={
                  <Suspense fallback={<Loader />}>
                    <RequirePath>
                      <GroupSection />
                    </RequirePath>
                  </Suspense>
                }
              />
              {/* tasks Routes */}
              <Route
                path="/groupsection/group/:groupId/:currentYear/:academicYear/:semester/:subject/:facultyId"
                element={
                  <Suspense fallback={<Loader />}>
                    <RequirePath>
                      <TaskPage />
                    </RequirePath>
                  </Suspense>
                }
              />
              <Route
                path="/groupsection/group/:groupId/:currentYear/:academicYear/:semester/:subject/:facultyId/groupsubmission"
                element={
                  <Suspense fallback={<Loader />}>
                    <RequirePath>
                      <GroupSubmission />
                    </RequirePath>
                  </Suspense>
                }
              />
              <Route
                path="/:currentYear/groups/:subject/:semester/:academic/assignTask"
                element={
                  <Suspense fallback={<Loader />}>
                    <RequirePath>
                      <AssignTaskFaculty />
                    </RequirePath>
                  </Suspense>
                }
              />
              <Route
                path="/:currentYear/groups/:subject/:semester/:academic/assignTask/submission/:taskId"
                element={
                  <Suspense fallback={<Loader />}>
                    <RequirePath>
                      <TaskSubmissions />
                    </RequirePath>
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
