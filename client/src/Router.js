import {BrowserRouter,Routes,Route} from "react-router-dom"
import App from "./App"
import FormComponent from "./components/Formcomponent"
import SingleComponent from "./components/SingleComponent"
import EditComponent from "./components/EditComponent"
import LoginComponent from "./components/LoginComponent"
import { getUser } from "./components/services/authorize"
const Router = () => {
    const isAuthenticated = getUser(); // ตรวจสอบสิทธิ์ของผู้ใช้
  
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          {isAuthenticated && (
          <Route path="/create" element={<FormComponent />} />
          )}
          <Route path="/blog/:slug" element={<SingleComponent />} />
          {isAuthenticated && (
            <Route path="/blog/edit/:slug" element={<EditComponent />} />
          )}
          <Route path="/login" element={<LoginComponent />} />
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default Router;
  
