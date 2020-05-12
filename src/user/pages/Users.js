import React from 'react';
import UserList from '../components/UserList';

const Users = props => {
    return <UserList items={props.items} />
}

export default Users;