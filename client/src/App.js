import { useEffect, useState, useMemo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import * as apis from './api';
import * as Screens from './screens';
import * as Comp from './components';
import { Spinner } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

import './App.scss';

function App() {
  const { loginWithRedirect, logout, user, getAccessTokenSilently } = useAuth0();
  // const user = {email: 'jordy.mccollam@gmail.com'};
  // const user = null;
  const [ theme, setTheme ] = useState('theme--light');
  const [ dbUser, setDbUser ] = useState(null);
  const [ token, setToken ] = useState(null);
  const [ screen, setScreen ] = useState('home');
  const [ currentProject, setCurrentProject ] = useState(null);

  useEffect(() => {
    if (user) {
      console.log('User', user);
      connectUserToDb();
    }
  }, [user])

  const connectUserToDb = async () => {
    const _token = 'test';
    // const _token = await getAccessTokenSilently();
    setToken(_token);
    apis.getUser(_token, user.email).then(res => {
      console.log("connectUserToDb:: res", res);
      if (!res.data.output) {
        createUser(_token);
      } else {
        setTheme(res.data.output.theme);
        setDbUser({...res.data.output, ...user, token: _token});
      }
    }).catch(e => {
      console.error("connectUserToDb", e);
    }) 
  }

  const createUser = (_token) => {
    apis.createUser(_token, {email: user.email}).then(res => {
      console.log("createUser:: res", res);
      connectUserToDb();
    }).catch(e => {
      console.error("createUser", e);
    })
  }

  return (
    <div className="App">
      <Container fluid className="px-0">
        <Row className="full mx-0">
          <Col className="center-v content px-0">
      
            {user ? (
              dbUser ? (
                // LOGGED IN CONTENT
                <>
                  <Comp.Menu screen={screen} setScreen={setScreen} logout={logout} className="ml-2" />
                  <Container fluid className="full" >
                    {screen === 'home' && (
                      <Screens.Home user={dbUser} />
                    )}
                    {screen === 'projects' && (
                      currentProject 
                      ? <Screens.Project project={currentProject} setProject={setCurrentProject} user={dbUser} />
                      : <Screens.Projects setProject={setCurrentProject} user={dbUser} />
                    )}
                  </Container>
                </>
                // ------------------
              ) : (
                <Container>
                  <div className="text-center full d-flex flex-column justify-content-center align-items-center">
                    <Spinner animation="border" variant="dark" style={{height: 75, width: 75}} />
                    <h1 className="text-dark mt-4">Please wait...</h1>
                  </div>
                </Container>
              )
            ) : (
              // LOGGED OUT CONTENT
              <>
                <Container >
                  <Row>
                    <Col className="center">
                      <Comp.Button onClick={loginWithRedirect} size="lg" ><div style={{fontSize: 50}}>LOGIN</div></Comp.Button>
                    </Col>
                  </Row>
                </Container>
              </>
              // ------------------
            )}

          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
