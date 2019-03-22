import React from 'react';

import lifecycle from 'react-pure-lifecycle';

import {connector} from "../store/utils/connector";
import {Link, withRouter} from "react-router-dom";
import {Icon, Menu} from "antd";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const methods = {
    componentWillMount(props) {
        console.log('init Menu', props);
    }
}

const MyMenu = ({state, dispatch}) =>
        <Menu
            onClick={() => {}}
            selectedKeys={[]}
            mode="horizontal"
        >

            <Menu.Item key="login">
                <Link to={'/login'}>login</Link>
            </Menu.Item>

            <Menu.Item key="home">
                <Link to={'/'}>home</Link>
            </Menu.Item>
            <Menu.Item key="profile">
                <Link to={'/profile'}>profile</Link>
            </Menu.Item>

            <SubMenu
                title={<span><Icon type="setting"/>Игровое меню</span>}>
                <Menu.Item key="resources">
                    <Link to={'/resources'}>resources</Link>
                </Menu.Item>
                <Menu.Item key="bilds">
                    <Link to={'/bilds'}>bilds</Link>
                </Menu.Item>
            </SubMenu>

        </Menu>

export default withRouter(connector(lifecycle(methods)(MyMenu)));
