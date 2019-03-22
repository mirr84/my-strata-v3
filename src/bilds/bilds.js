import React from 'react';

import lifecycle from 'react-pure-lifecycle';
import {connector} from "../store/utils/connector";
import {doGetAllResources, doGetResources} from "../service/resourcesService";
import {doGetAllBilds} from "../service/bildsService";
import {Link} from "react-router-dom";
import {Card, Spin} from "antd";
import {gridStyle} from "../utils/gridStyle";

const methods = {
    componentWillMount({state, dispatch}) {
        console.log('init Bilds');

        doGetAllBilds({dispatch})
            .then(
                (r) => console.log(r)
            )

    }
}



const Bilds = ({state, dispatch}) =>
    <div>
        <Spin spinning={state.bildsReducer.isProgressGetAll} tip="Получение списка строений">
            <Card>
                {
                    state.bildsReducer.items
                        .map(
                            (item, idx) =>
                                <Card.Grid key={idx} style={gridStyle()}>
                                    <Card title={`${item.title} (${item.level})`}>
                                        {
                                            JSON.stringify(item.params)
                                        }
                                    </Card>
                                </Card.Grid>
                        )
                }
            </Card>
        </Spin>
    </div>

export default connector(lifecycle(methods)(Bilds));
