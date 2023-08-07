import { Route, BrowserRouter as Router, Routes as Switch, RouteProps } from 'react-router-dom';
import './UI/css/index.scss';
import Dashboard from './components/dashboard/dashboard';
import { Context, ContextProvider, DispatchContext } from './store/store';
import { useContext, useEffect } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { GraphQLClient, gql } from 'graphql-request';
import SignIn from './components/login/signIn';
import Header from './components/nav/header';
import Profile from './components/profile/Profile';
import Cookie from './components/cookie';
import CreateUser from './components/login/createUser';
import Admin from './components/admin/admin';
import Success from './components/dashboard/success';
import Home from './components/home/app';
import Footer from './components/nav/footer';
import Contact from './components/contact/app';
import ScrollTriggerWrapper from './wrappers/app';
import { AnimatePresence } from 'framer-motion';
import { getCookie } from './helpers/main';
import Logout from './components/login/logout';

const twentyFourHoursInMs = 1000 * 60 * 60 * 24;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: twentyFourHoursInMs,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <RouterComponent />
      </ContextProvider>
    </QueryClientProvider>
  );
}

const RouterComponent = () => {
  const dispatch = useContext(DispatchContext);
  useEffect(() => {
    const cookie = getCookie('httpCookie');
    const email = getCookie('httpEmail');
    const admin = getCookie('httpAdmin');
    if ((dispatch && cookie && email && !admin) || (dispatch && cookie && email && admin && admin === 'false')) {
      dispatch({ type: 'auth', payload: 'user' });
    } else if (dispatch && cookie && email && admin === 'true') {
      dispatch({ type: 'auth', payload: 'admin' });
    } else if (dispatch) {
      dispatch({ type: 'auth', payload: 'guest' });
    }
  }, []);
  return (
    <Router>
      <Header />
      <ScrollTriggerWrapper>
        <AnimatePresence mode='wait'>
          <Switch>
            <Route path='/' element={<Home />} />

            <Route path='/dashboard' element={<Dashboard />} />
            <Route
              path='/success/:id'
              element={
                <Cookie>
                  <Success />
                </Cookie>
              }
            />
            <Route path='/login' element={<SignIn />} />
            <Route path='/create' element={<CreateUser />} />
            <Route path='/logout' element={<Logout />} />
            <Route
              path='/profile'
              element={
                <Cookie>
                  <Profile />
                </Cookie>
              }
            />
            <Route
              path='/admin'
              element={
                <Cookie>
                  <Admin />
                </Cookie>
              }
            />
            <Route path='/contact' element={<Contact />} />
          </Switch>
        </AnimatePresence>
      </ScrollTriggerWrapper>
      <Footer />
    </Router>
  );
};

export default App;
