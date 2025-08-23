import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Feed from "./components/Feed"; // make sure Feed is imported
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Chat from "./components/Chat";
import Premium from "./components/Premium";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
             <Route path="/connections" element={<Connections />} />
             <Route path="/requests" element={<Requests />} />
             <Route path = "/premium" element ={<Premium/>} />
             <Route path="/chat/:targetUserId" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
