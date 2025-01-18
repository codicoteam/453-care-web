/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import Client from "layouts/client";
import Employee from "layouts/employee";
import AssignWork from "layouts/assign_work";
import Run from "layouts/run";
import EmployeeAssessment from "layouts/employee_assessment";
import MyDashboard from "views/examples/mydashboard";
import MyAdmin from "views/examples/myadministration";
import CareRequired from "views/examples/care_required";
import MyCarer from "views/examples/carer";
import AddMyCarer from "views/examples/add_carer";
import MyClient from "views/examples/client";
import MyVisits from "views/examples/myvisits";
import MyTasks from "views/examples/task";
import MyMedications from "views/examples/medications";
import MyRunner from "views/examples/runner";
import MyAppointments from "views/examples/appointment";
import MyVital from "views/examples/vital";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: <Icons />,
    layout: "/admin",
  },
 
  
  {
    path: "/clients",
    name: "Clients",
    icon: "ni ni-planet text-blue",
    component: <Client />,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: " Tracking Maps",
    icon: "ni ni-pin-3 text-orange",
    component: <Maps />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/client-invoice",
    name: "Client Invoice",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/employee",
    name: "Employes",
    icon: "ni ni-single-02 text-yellow",
    component: <Employee />,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Tables />,
    layout: "/admin",
  },
  {
    path: "/assignwork",
    name: "Assign Work",
    icon: "ni ni-bullet-list-67 text-red",
    component: <AssignWork />,
    layout: "/admin",
  },
  {
    path: "/run",
    name: "Run",
    icon: "ni ni-key-25 text-info",
    component: <Run />,
    layout: "/admin",
  },
  {
    path: "/employeeassement",
    name: "Employee Assessment",
    icon: "ni ni-key-25 text-info",
    component: <EmployeeAssessment />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/login",
  },
 
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
  },
  {
    path: "/mydashboard",
    name: "Mydashoard",
    icon: "ni ni-circle-08 text-pink",
    component: <MyDashboard />,
    layout: "/auth",
  },
  {
    path: "/myadmin",
    name: "MyAdmin",
    icon: "ni ni-circle-08 text-pink",
    component: <MyAdmin />,
    layout: "/auth",
  },
  {
    path: "/carerequired",
    name: "Carerequired",
    icon: "ni ni-circle-08 text-pink",
    component: <CareRequired />,
    layout: "/auth",
  },
  {
    path: "/mycarer",
    name: "Carer",
    icon: "ni ni-circle-08 text-pink",
    component: <MyCarer />,
    layout: "/auth",
  },

  {
    path: "/myrunner",
    name: "Runner",
    icon: "ni ni-circle-08 text-pink",
    component: <MyRunner />,
    layout: "/auth",
  },
  {
    path: "/myvisits",
    name: "Visits",
    icon: "ni ni-circle-08 text-pink",
    component: <MyVisits />,
    layout: "/auth",
  },

  {
    path: "/myappointment",
    name: "Appointment",
    icon: "ni ni-circle-08 text-pink",
    component: <MyAppointments />,
    layout: "/auth",
  },

  {
    path: "/myvital",
    name: "Vitals",
    icon: "ni ni-circle-08 text-pink",
    component: <MyVital />,
    layout: "/auth",
  },
  

  {
    path: "/mytasks",
    name: "Tasks",
    icon: "ni ni-circle-08 text-pink",
    component: <MyTasks />,
    layout: "/auth",
  },
  {
    path: "/mymedications",
    name: "Medications",
    icon: "ni ni-circle-08 text-pink",
    component: <MyMedications />,
    layout: "/auth",
  },


  {
    path: "/myclient",
    name: "Client",
    icon: "ni ni-circle-08 text-pink",
    component: <MyClient />,
    layout: "/auth",
  },





  {
    path: "/addmycarer",
    name: "AddCarer",
    icon: "ni ni-circle-08 text-pink",
    component: <AddMyCarer />,
    layout: "/auth",
  },
  {
    path: "/viewmore/id",
    name: "AddCarer",
    icon: "ni ni-circle-08 text-pink",
    component: <AddMyCarer />,
    layout: "/auth",
  },
];
export default routes;
