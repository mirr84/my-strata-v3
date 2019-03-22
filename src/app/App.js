import React from 'react';

import lifecycle from 'react-pure-lifecycle';
import {connector} from "../store/utils/connector";
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import Public from "../routes/public";
import Private from "../routes/private";

import Login from "../login/Login";
import InfoModals from "../infoModals/infoModals";
import MyMenu from "../menu/myMenu";
import Home from "../home/home";
import Profile from "../profile/profile";
import Resources from "../resources/resources";
import Bilds from "../bilds/bilds";

import LocationListener from "../routes/LocationListener";
import {Card, Col, Row} from "antd";

const methods = {
    componentWillMount({state, dispatch}) {
        console.log('init App');

        // doLogin({dispatch, login: '11', password: '22'})
        //     .then(
        //         (r) => console.log(r)
        //     )

        // doCheck({dispatch})
        //     .then(
        //         (r) => console.log('doCheck', r)
        //     )

        // doLogout({dispatch})
        //     .then(
        //         (r) => console.log(r)
        //     )

    }
}

const Page404 = () => <div>page404</div>

const App = ({state, dispatch}) =>
    <div>

        <InfoModals/>

        <Router>
            <LocationListener>

                <MyMenu/>

                <Row>
                    <Col><br/></Col>
                </Row>
                <Row>
                    <Col span={1}/>
                    <Col span={22}>
                        <Card>
                            <Switch>
                                <Public exact={true} path="/" component={Home}/>
                                <Public exact={true} path="/login" component={Login}/>
                                <Private exact={true} path="/profile" component={Profile}/>

                                <Private exact={true} path="/resources" component={Resources}/>
                                <Private exact={true} path="/resources/:id" component={Resources}/>

                                <Private exact={true} path="/bilds" component={Bilds}/>

                                <Public exact={true} component={Page404}/>
                            </Switch>
                        </Card>
                    </Col>
                </Row>

            </LocationListener>
        </Router>

    </div>

export default connector(lifecycle(methods)(App));
