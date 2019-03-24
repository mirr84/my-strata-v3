import React from 'react';

import lifecycle from 'react-pure-lifecycle';
import {connector} from "../store/utils/connector";
import {Link} from "react-router-dom";

const methods = {
    componentWillMount({match, state, dispatch}) {
        console.log('init BildsId', match);



    }
}

const BildsId = ({match, state, dispatch}) =>
    <div>
        <Link to={`/bilds`}>back</Link>
        <br/>
        BildsId
        <br/>
        {
            JSON.stringify(match)
        }
    </div>

export default connector(lifecycle(methods)(BildsId));
