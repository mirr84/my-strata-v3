import axios from "axios";
import {notification} from "antd";

export const request = ({dispatch, reducer, progresser, method, data, url}) => {

    dispatch.setter(reducer, {[progresser]: true});

    return axios[method](url, data)
        .then(
            r => r,
            e => e.response
        )
        .then(
            (r) => {
                console.log(r)
                if (r && r.data) {
                    let {status, text: message} = r.data;
                    if (status && message) {
                        notification[status]({message});
                    }
                }
                dispatch.setter(reducer, {[progresser]: false});
                return r;
            }
        )

}