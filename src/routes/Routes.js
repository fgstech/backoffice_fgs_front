import React from 'react';
import { Switch } from 'react-router-dom';
import { RoleBasedRouting } from '../lib/permission'

// VIEWS GENERAL
import UserView from '../insfrastructure/pages/users';
import NewUserView from '../insfrastructure/pages/users/new';
import RoleView from '../insfrastructure/pages/roles';
import NewRoleView from '../insfrastructure/pages/roles/new';
import BootcampsView from '../insfrastructure/pages/bootcamps';
import BootcampView from '../insfrastructure/pages/bootcamps/view';
import BootcampAttendaceView from '../insfrastructure/pages/bootcamps/attendance';
import EmployersView from '../insfrastructure/pages/employers';
import JobsView from '../insfrastructure/pages/jobs';
import ProfilesJobsView from '../insfrastructure/pages/profilesjobs';
import ApplicationsJobsView from '../insfrastructure/pages/applicationsjobs';
import EcosystemUsersView from '../insfrastructure/pages/usuarios_ecosistema';
import EmployerReportView from '../insfrastructure/pages/employer_report';

const PanelView = () => {
        return <>
                <h6>Mi Panel</h6>
        </>
}

const Rutas = () => (
        <Switch>
                {/* rutas globales */}
                <RoleBasedRouting path="/" exact component={PanelView}></RoleBasedRouting>
                <RoleBasedRouting path="/config/users" exact component={UserView}></RoleBasedRouting>
                <RoleBasedRouting path="/config/users/new" exact component={NewUserView}></RoleBasedRouting>
                <RoleBasedRouting path="/config/users/:id" exact component={NewUserView}></RoleBasedRouting>
                <RoleBasedRouting path="/config/roles" exact component={RoleView}></RoleBasedRouting>    
                <RoleBasedRouting path="/config/roles/new" exact component={NewRoleView}></RoleBasedRouting>
                <RoleBasedRouting path="/config/roles/:id" exact component={NewRoleView}></RoleBasedRouting>
                <RoleBasedRouting path="/bootcamps" exact component={BootcampsView}></RoleBasedRouting>
                <RoleBasedRouting path="/bootcamps/attendance/:id" exact component={BootcampAttendaceView}></RoleBasedRouting>
                <RoleBasedRouting path="/bootcamps/:id" exact component={BootcampView}></RoleBasedRouting>
                <RoleBasedRouting path="/employment/jobs" exact component={JobsView}></RoleBasedRouting>
                <RoleBasedRouting path="/employment/employers" exact component={EmployersView}></RoleBasedRouting>
                <RoleBasedRouting path="/employment/applications" exact component={ApplicationsJobsView}></RoleBasedRouting>
                <RoleBasedRouting path="/employment/profiles" exact component={ProfilesJobsView}></RoleBasedRouting>
                <RoleBasedRouting path="/ecosystem/users" exact component={EcosystemUsersView}></RoleBasedRouting>
                <RoleBasedRouting path="/employment/report" exact component={EmployerReportView}></RoleBasedRouting>
        </Switch>
);

export default Rutas;