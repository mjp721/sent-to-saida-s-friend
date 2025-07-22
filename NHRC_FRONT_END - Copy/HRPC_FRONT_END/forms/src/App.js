import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home';
import HrMain from './pages/HrFrom/HrMain';
import HrJobPostMain from './pages/HrJobPostingFrom/HrJobPostMain';
import TpoMain from './pages/TPO/TpoMain';
import Ex from './components/Ex.js'
import StudentFile from './pages/StudentForm/StudentFile'
import { BrowserRouter as BR, Routes, Route } from 'react-router-dom';
import Login from './components/Login/index.js';
import AdminDashboard from './admin/AdminDashboard/index.js';
import AdminHr from './admin/AdminHr/index.js';
import AdminStudent from './admin/AdminStudent/index.js';
import AdminTpo from './admin/AdminTpo/index.js';
import Footer from './components/Footer/index.js';
import AboutUs from './components/AboutUs/index.js';
import ContactUs from './components/ContactUs/index.js';
import CurrentJob from './components/CurrentJob/index.js';
import BlackProfile from './components/BlockProfile/index.js'
import AdminLogin from './admin/AdminLogin/index.js';
import AdminHrView from './admin/AdminHrView/index.js';
import AdminStudentView from './admin/AdminStudentView'
import AdminTpoView from './admin/AdminTpoView'
import AdminPodcast from './admin/AdminPodcast/index.js';
import AdminProtectedRoute from './admin/AdminProtectedRoute';
import TpoLogin from './admin/TpoLogin/index.js';
import TpoHomePage from './components/TpoHomePage/index.js';
// import HrProfileView from './admin/HrProfileView/index.js';  /
function App() {
  return (
    <div className='App'>
      <BR>
        <Routes>
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/' element={<Home />} />
          <Route exact path='/about' element={<AboutUs />} />
          <Route exact path='/contact' element={<ContactUs />} />
          <Route exact path='/current_job' element={<CurrentJob />} />
          <Route exact path='/hr-register' element={<HrMain />} />
          <Route exact path='/student-register' element={<StudentFile />} />
          <Route exact path='/tpo-register' element={<TpoMain />} />
          <Route exact path='/block_profiles' element={<BlackProfile />} />
          <Route exact path='/add-job' element={<HrJobPostMain />} />
          <Route exact path='/ex' element={<Ex />} />
          <Route exact path='/admin-login' element={<AdminLogin />} />
          <Route exact path='/admin-dashboard' element={<AdminProtectedRoute Component={AdminDashboard} />} />
          <Route exact path='/admin-hr' element={<AdminProtectedRoute Component={AdminHr} />} />
          <Route exact path='/admin-student' element={<AdminProtectedRoute Component={AdminStudent} />} />
          <Route exact path='/admin-tpo' element={<AdminProtectedRoute Component={AdminTpo} />} />
          <Route exact path='/admin-podcast' element={<AdminProtectedRoute Component={AdminPodcast} />} />
          <Route exact path='/hr/:id' element={<AdminProtectedRoute Component={AdminHrView} />} />
          <Route exact path='/student/:id' element={<AdminProtectedRoute Component={AdminStudentView} />} />
          <Route exact path='/tpo/:id' element={<AdminProtectedRoute Component={AdminTpoView} />} />
          <Route exact path='/footer' element={<Footer />} />
          <Route exact path='/tpo/login' element={<TpoLogin />} />
          <Route exact path='/tpo/home/page' element={<TpoHomePage/>}/>
          {/* <Route exact path='/hr-profile-view' element={<HrProfileView/>}/> */}
        </Routes>
      </BR>

    </div>
  );
}

export default App;
