import React from "react";
import Usernotifications from "pages/Usernotifications";
import Adminnotifications from "pages/Adminnotifications";
import Login from "pages/Login";
import { ProtectedRoute, ProtectedRouteLogin } from "components";
import Userpostdetails from "pages/Userpostdetails";
import Admindashboard from "pages/Admindashboard";
import Usercreatepost from "pages/Usercreatepost";
import Adminusers from "pages/Adminusers";
import Admincreateboard from "pages/Admincreateboard";
import Invite from "pages/Invite";
import Adminfeedback from "pages/Adminfeedback";
import CreatePost from "pages/CreatePost";
import Signup from "pages/ResetPassword";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import Register from "pages/Register";
import UserroadmapOnePage from "pages/UserroadmapOne";

const ProjectRoutes = () => {
  return (
    <Router>
      <Routes>
        
        <Route path="*" element={<NotFound />} />
        <Route exact
          path="/adminfeedback"
          element={<ProtectedRoute element={Adminfeedback} />}
        />

        <Route exact
          path="/adminnotifications"
          element={<ProtectedRoute element={Adminnotifications} />}
        />

        <Route exact
          path="/adminusers"
          element={<ProtectedRoute element={Adminusers} />}
        />
              

        <Route exact
          path="/admincreateboard"
          element={<ProtectedRoute element={Admincreateboard} />}
        />
        <Route path="/" element={<UserroadmapOnePage/>}/>
        <Route exact
          path="/usercreatepost"
          element={<Usercreatepost/>}
        />
        <Route exact
          path="/signup" element={<Signup/>}
        />
       <Route path="/userroadmapone" element={<UserroadmapOnePage/>}/>
        <Route path="/Invite" element={<Invite />} />
        <Route path="/admindashboard" element={<Admindashboard />} />
        <Route path="/userpostdetails" element={<Userpostdetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/usernotifications" element={<Usernotifications />} />
        <Route path="/dhiwise-dashboard" element={<Home />} />
        <Route path="/create-post" element={<CreatePost/>} />
        <Route path="/register" element={<Register/>} />

      </Routes>
    </Router>
  );
};

export default ProjectRoutes;
