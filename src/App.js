//Modules
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

//Components
import HomePage from "./components/auth/Screens/HomePage/home-page";
import PageNotFound from './components/main/PageNotFound/page-not-found';
import ContactUs from './components/auth/Screens/ContactUs/contact-us';
import ScheduleMeeting from './components/auth/Components/GetStarted/schedule-meeting';
import Signin from './components/auth/Screens/Signin/signin';
import ForgetPassword from './components/auth/Screens/ForgetPassword/forget-password';
import ResetPassword from './components/auth/Screens/ForgetPassword/reset-password';

import ComingSoon from "./components/common/ComingSoon/Screens/coming-soon";

// Operations
import OperationsDashboard from './components/main/Operations/Dashboard/dashboard';
import UserManagement from './components/main/Operations/UserManagement/Screens/user-management';
import RoleManagement from './components/main/Operations/RoleManagement/Screens/role-management';
import Logs from "./components/main/Operations/Logs/Screens/logs";
import AddUser from "./components/main/Operations/UserManagement/Components/addUser";
import EditUser from "./components/main/Operations/UserManagement/Screens/edit-user";





//CSS
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path='/page-not-found' component={PageNotFound}></Route>
        <Route exact path='/schedule-meeting' component={ScheduleMeeting}></Route>
        <Route exact path='/contact-us' component={ContactUs}></Route>
        <Route exact path="/signin" component={Signin}></Route>
        <Route exact path="/forget-password" component={ForgetPassword}></Route>
        <Route exact path="/reset-password" component={ResetPassword}></Route>
        <Route exact path='/coming-soon' component={ComingSoon}></Route>

        {/* operations */}
        <Route exact path='/dashboard' component={OperationsDashboard}></Route>
        <Route exact path='/user-management' component={UserManagement}></Route>
        <Route exact path='/role-management' component={RoleManagement}></Route>
        <Route exact path='/logs' component={Logs}></Route>
        <Route exact path='/addUser' component={AddUser}></Route>
        <Route exact path='/edit-user' component={EditUser}></Route>






        <Route component={PageNotFound}/>
      </Switch>
    </Router>
  );
}

export default App;
