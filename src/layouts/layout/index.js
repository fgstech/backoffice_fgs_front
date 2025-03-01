import React, { useEffect, useState } from 'react';
import Rutas from '../../routes/Routes';
import Notifications from '../../insfrastructure/ui/notify';
import Applications from '../../application/Applications';
import LayoutComponent from '../../insfrastructure/ui/layout';
import Menu from './menu'
import navbarMenus from './navbar_menu';
import AxiosService from '../../lib/axios';
import './style.css';
 

const Layout = (props) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(async () => { 
        
    }, [])

    useEffect(() => Applications.loadMain(), []);

    const rightSidebarContent = (
        <div>
            <h3>Herramientas</h3>
            <p>Esta es la barra de herramientas.</p>
        </div>
    );

    return (
        <>
            <LayoutComponent
                sidebarMenus={Menu}
                navbarMenus={navbarMenus}
                rightSidebarContent={rightSidebarContent}
            >
                <Rutas />
            </LayoutComponent>
            <Notifications />
        </>
    )
}

export default Layout;

