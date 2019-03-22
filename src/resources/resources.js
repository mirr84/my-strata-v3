import React from 'react';

import lifecycle from 'react-pure-lifecycle';
import {connector} from "../store/utils/connector";
import {doGetAllResources, doGetResources} from "../service/resourcesService";
import {Card, Spin} from "antd";
import {Link} from "react-router-dom";
import {gridStyle} from "../utils/gridStyle";

const methods = {
    componentWillMount({match, state, dispatch}) {
        console.log('init Resources');

        doGetAllResources({dispatch})
            .then(
                (r) => console.log(r)
            )

        doGetResources({id: match.params.id, dispatch})
            .then(
                (r) => console.log(r)
            )

    }
}

const Resources = ({match, state, dispatch}) =>
    <div>
        <Spin spinning={state.resourcesReducer.isProgressGetAll} tip="Получение значений ресурсов">
            <Card>
                <Link to={'/resources/1'} onClick={() => doGetResources({id: 1, dispatch})}>
                    <Card.Grid
                        style={gridStyle(match.params.id === '1')}>r1: {state.resourcesReducer.r1}</Card.Grid>
                </Link>
                <Link to={'/resources/2'} onClick={() => doGetResources({id: 2, dispatch})}>
                    <Card.Grid
                        style={gridStyle(match.params.id === '2')}>r2: {state.resourcesReducer.r2}</Card.Grid>
                </Link>
                <Link to={'/resources/3'} onClick={() => doGetResources({id: 3, dispatch})}>
                    <Card.Grid
                        style={gridStyle(match.params.id === '3')}>r3: {state.resourcesReducer.r3}</Card.Grid>
                </Link>
                <Link to={'/resources/4'} onClick={() => doGetResources({id: 4, dispatch})}>
                    <Card.Grid
                        style={gridStyle(match.params.id === '4')}>r4: {state.resourcesReducer.r4}</Card.Grid>
                </Link>
                <Link to={'/resources/5'} onClick={() => doGetResources({id: 5, dispatch})}>
                    <Card.Grid
                        style={gridStyle(match.params.id === '5')}>r5: {state.resourcesReducer.r5}</Card.Grid>
                </Link>
            </Card>
        </Spin>
        {
            match.params.id &&
            <Spin spinning={state.resourcesReducer.isProgressGet} tip="Получение информации о ресурсе">
                <Card>
                    Информация о быранном ресурсе
                    {
                        match.params.id
                    }
                </Card>
            </Spin>
        }
    </div>

export default connector(lifecycle(methods)(Resources));
