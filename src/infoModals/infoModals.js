import React from 'react';

import lifecycle from 'react-pure-lifecycle';

import {Modal, Progress} from "antd";
import {connector} from "../store/utils/connector";

const methods = {
    componentWillMount({state, dispatch}) {
        console.log('init InfoModals');
    }
}

const InfoModals = ({state, dispatch}) =>
    <div>

        <Modal
            closable={false}
            footer={false}
            centered={true}
            visible={state.authReducer.isProgressCheck}
            onCancel={()=>{}}
        >
            <div>Проверка авторизации</div>
            <Progress percent={100} status="active" showInfo={false} />
        </Modal>


        <Modal
            closable={false}
            footer={false}
            centered={true}
            visible={state.authReducer.isProgressAuth}
            onCancel={()=>{}}
        >
            <div>Авторизации</div>
            <Progress percent={100} status="active" showInfo={false} />
        </Modal>

        <Modal
            closable={false}
            footer={false}
            centered={true}
            visible={state.authReducer.isProgressLogout}
            onCancel={()=>{}}
        >
            <div>Выход</div>
            <Progress percent={100} status="active" showInfo={false} />
        </Modal>

        <Modal
            closable={false}
            footer={false}
            centered={true}
            visible={state.authReducer.isProgressReg}
            onCancel={()=>{}}
        >
            <div>Регистрация</div>
            <Progress percent={100} status="active" showInfo={false} />
        </Modal>

    </div>

export default connector(lifecycle(methods)(InfoModals));
