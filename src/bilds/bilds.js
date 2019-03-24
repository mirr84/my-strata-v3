import React from 'react';

import lifecycle from 'react-pure-lifecycle';
import {connector} from "../store/utils/connector";
import {doGetAllBilds, doCreateBilds} from "../service/bildsService";
import {Card, Spin} from "antd";
import {gridStyle} from "../utils/gridStyle";
import {doGetResources} from "../service/resourcesService";
import {Link} from "react-router-dom";

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
                <Card.Grid style={gridStyle()}>
                    <Spin spinning={state.bildsReducer.isProgressCreate} tip="Создание новой ппостройки">
                        <Card title={`New`}
                              onClick={() =>
                                  doCreateBilds({dispatch})
                                      .then(
                                          (r) => r && doGetAllBilds({dispatch})
                                      )
                              }>
                            new bild
                        </Card>
                    </Spin>
                </Card.Grid>

                {
                    state.bildsReducer.items
                        .map(
                            (item, idx) =>
                                <Card.Grid key={idx} style={gridStyle()}>
                                    <Link to={`/bilds/${item.id}`} onClick={() => doGetResources({id: 1, dispatch}) }>
                                        <Card title={`${item.title} (${item.level})`}>
                                            {
                                                JSON.stringify(item.params)
                                            }
                                        </Card>
                                    </Link>
                                </Card.Grid>
                        )
                }
            </Card>
        </Spin>
    </div>

export default connector(lifecycle(methods)(Bilds));
