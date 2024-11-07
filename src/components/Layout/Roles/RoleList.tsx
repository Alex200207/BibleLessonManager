import React from 'react';
import { Role } from '../../../Types';

interface RoleListProps {
    roles: Role[];

}

const RoleList: React.FC<RoleListProps> = () => (
    <div className="p-4 border rounded-md shadow-md">
        <h2>hola</h2>
    </div>
);

export default RoleList;
