import Login from "./pages/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import RegisterSuccess from "./pages/registerSuccess/RegisterSuccess";
import AuthComponent from "./pages/AuthComponent";
import LoginSuccess from './pages/loginSuccess/LoginSuccess'
import ProtectedRoutes from "./pages/ProtectedRoutes";
import HomeProtected from "./pages/homeProtected/HomeProtected";
import LogoutSuccess from "./pages/LogoutSuccess/LogoutSuccess";
import ConfirmAccount from "./pages/ConfirmAccount/ConfirmAccount";
import Profile from "./pages/profile/Profile";
import FormEmail from "./pages/formEmail/FormEmail";
import EmailSuccess from "./pages/emailSuccess/EmailSuccess";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import PasswordChanged from "./pages/passwordChanged/PasswordChanged";
import AllUsers from "./pages/allUsers/AllUsers";
import InserimentoPost from "./pages/inserimentoPost/InserimentoPost";
import InsertSuccess from "./pages/insertSuccess/InsertSuccess";
import AllPosts from "./pages/allPosts/allPosts";
import SinglePost from "./pages/singlePost/SinglePost";
import NessunElementoTrovato from "./pages/nessunEelementoTrovato/NessunElementotrovato";
import ProfileUpdatedSuccess from "./pages/profileUpdatedSuccess/ProfileUpdatedSuccess";
import SinglePostUpdated from './pages/singlePostUpdated/SinglePostUpdated'

function App() {
  return (
    <AuthComponent>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/registerSuccess" element={<RegisterSuccess />} />
          <Route path="/logoutSuccess" element={<LogoutSuccess />} />
          <Route path="/confirm-account/:token" element={<ConfirmAccount />} />
          <Route path='/reset-password' element={<FormEmail />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />
          <Route path='/emailSuccess' element={<EmailSuccess />} />
          <Route path='/passwordChanged' element={<PasswordChanged />} />
          <Route path='/post/allPosts' element={<AllPosts />} />
          <Route path='/post/:id' element={<SinglePost />} />
          <Route path="/nessunElementoTrovato" element={<NessunElementoTrovato />} />
          <Route path='/post/update/:id' element={<SinglePostUpdated />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/loginSuccess" element={<LoginSuccess />} />
            <Route path="/homeProtected" element={<HomeProtected />} />
            <Route path="/profile" element={<Profile />} />
            <Route path='/allUsers' element={<AllUsers />} />
            <Route path='/insertPost' element={<InserimentoPost />} />
            <Route path='/insertSuccess' element={<InsertSuccess />} />
            <Route path='/profileUpdatedSuccess' element={<ProfileUpdatedSuccess />} />
          </Route>

        </Routes>
      </Router>
    </AuthComponent>
  );
}

export default App;
