import React from "react";
import Usernotifications from "pages/Usernotifications";
import Adminnotifications from "pages/Adminnotifications";
import Login from "pages/Login";
import Userpostdetails from "pages/Userpostdetails";
import Admindashboard from "pages/Admindashboard";
import UserroadmapOne from "pages/UserroadmapOne";
import Usercreatepost from "pages/Usercreatepost";
import Adminusers from "pages/Adminusers";
import Admincreateboard from "pages/Admincreateboard";
import Invite from "pages/Invite";
import Adminfeedback from "pages/Adminfeedback";
import Signup from "pages/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import Register from "pages/Register";
import CreatePost from "pages/CreatePost";


const ProjectRoutes = () => {
  return (
    <Router>
      <Routes>

        <Route path="*" element={<NotFound />} />
        <Route
          path="/adminfeedback"
          element={<Adminfeedback />}
        />

        <Route
          path="/adminnotifications"
          element={<Adminnotifications />}
        />

        <Route
          path="/adminusers"
          element={<Adminusers />}
        />

        <Route path="/" element={<UserroadmapOne />} />
        <Route path="/userroadmapone" element={<UserroadmapOne />} />
        <Route
          path="/admincreateboard"
          element={<Admincreateboard />}
        />
        <Route exact
          path="/usercreatepost"
          element={<Usercreatepost />}
        />
        <Route
          path="/signup" element={<Signup />}
        />
        <Route path="/Invite" element={<Invite />} />
        <Route path="/admindashboard" element={<Admindashboard />} />
        <Route path="/userpostdetails" element={<Userpostdetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/usernotifications" element={<Usernotifications />} />
        <Route path="/dhiwise-dashboard" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-post" element={<CreatePost/>} />
      </Routes>
    </Router>
  );
};

export default ProjectRoutes;
