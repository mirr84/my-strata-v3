import React from 'react';

import lifecycle from 'react-pure-lifecycle';
import {connector} from "../store/utils/connector";

import {doLogin, doLogout, doReg} from "../service/authService";
import {Button, Col, Input, Row} from "antd";

const methods = {
    componentWillMount({state, dispatch}) {
        console.log('init Login');

    }
}

const Login = ({state, dispatch}) =>
    <div>
        {
            state.authReducer.isAuthenticated ?
                <div>
                    <Button size={'small'}
                            onClick={
                                () => {
                                    doLogout({dispatch})
                                        .then(
                                            (r) => console.log('doLogout', r)
                                        )
                                }
                            }>
                        Выйти
                    </Button>
                </div>
                :
                <div>
                    <Row gutter={16}>
                        <Col span={12}>
                            <div>
                                Автоизация
                            </div>
                            <Input type={'text'}
                                   size={'small'}
                                   value={state.authReducer.login}
                                   placeholder="login"
                                   onChange={({target: {value: login}}) => dispatch.setter('authReducer', {login})}
                            />
                            <Input type={'password'}
                                   size={'small'}
                                   placeholder="password"
                                   value={state.authReducer.password}
                                   onChange={({target: {value: password}}) => dispatch.setter('authReducer', {password})}
                            />
                            <Button size={'small'}
                                    onClick={
                                        () => {
                                            doLogin({dispatch, login: state.authReducer.login, password: state.authReducer.password})
                                                .then(
                                                    (r) => console.log('doLogin', r)
                                                )
                                        }
                                    }>
                                Войти
                            </Button>
                        </Col>
                        <Col span={12}>
                            <div>
                                Регистрация
                            </div>
                            <Input type={'text'}
                                   size={'small'}
                                   placeholder="login"
                                   value={state.authReducer.login}
                                   onChange={({target: {value: login}}) => dispatch.setter('authReducer', {login})}
                            />
                            <Input type={'mail'}
                                   size={'small'}
                                   placeholder="email"
                                   value={state.authReducer.email}
                                   onChange={({target: {value: email}}) => dispatch.setter('authReducer', {email})}
                            />
                            <Input type={'password'}
                                   size={'small'}
                                   placeholder="password"
                                   value={state.authReducer.password}
                                   onChange={({target: {value: password}}) => dispatch.setter('authReducer', {password})}
                            />
                            <Button size={'small'}
                                    onClick={
                                        () => {
                                            doReg({dispatch, login: state.authReducer.login, email: state.authReducer.email, password: state.authReducer.password})
                                                .then(
                                                    (r) => console.log('doReg', r)
                                                )
                                        }
                                    }>
                                Регистрация
                            </Button>
                        </Col>
                    </Row>
                </div>
        }
    </div>

export default connector(lifecycle(methods)(Login));
