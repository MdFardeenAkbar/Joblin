//import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
import SignUp from './pages/Signup';
import SignIn from './pages/Signin';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import JobView from './components/JobView';
import MyApplications from './components/MyApplications';
import HireJobView from './components/HireJobView';
import PostJob from './components/PostJob';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='signin' element={<SignIn />} />
        <Route path='dashboard' element={<Dashboard />}>
          <Route path='jobview' element={<JobView />} />
          <Route path='profile' element={<Profile />} />
          <Route path='myapplications' element={<MyApplications />} />
          <Route path='myjobs' element={<HireJobView />} />
          <Route path='post' element={<PostJob />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
