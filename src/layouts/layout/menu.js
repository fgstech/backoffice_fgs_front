const routes = [
    {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 10.74V13.94" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12 9V15.68" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M17 10.74V13.94" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>,
        label: "Inicio",
        pos: 10,
        key: "Inicio",
        path: "/",
        permissions: null,
    },
    {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.05 2.53004L4.03002 6.46004C2.10002 7.72004 2.10002 10.54 4.03002 11.8L10.05 15.73C11.13 16.44 12.91 16.44 13.99 15.73L19.98 11.8C21.9 10.54 21.9 7.73004 19.98 6.47004L13.99 2.54004C12.91 1.82004 11.13 1.82004 10.05 2.53004Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M5.63 13.08L5.62 17.77C5.62 19.04 6.6 20.4 7.8 20.8L10.99 21.86C11.54 22.04 12.45 22.04 13.01 21.86L16.2 20.8C17.4 20.4 18.38 19.04 18.38 17.77V13.13" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M21.4 15V9" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>,
        label: "Academia",
        pos: 10,
        key: "Academia",
        permissions: ['academia-bootcamps_read', "all_permission_forever"],
        subMenus: [
            {
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 9C19 10.45 18.57 11.78 17.83 12.89C16.75 14.49 15.04 15.62 13.05 15.91C12.71 15.97 12.36 16 12 16C11.64 16 11.29 15.97 10.95 15.91C8.96 15.62 7.25 14.49 6.17 12.89C5.43 11.78 5 10.45 5 9C5 5.13 8.13 2 12 2C15.87 2 19 5.13 19 9Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M21.25 18.47L19.6 18.86C19.23 18.95 18.94 19.23 18.86 19.6L18.51 21.07C18.32 21.87 17.3 22.11 16.77 21.48L12 16L7.22996 21.49C6.69996 22.12 5.67996 21.88 5.48996 21.08L5.13996 19.61C5.04996 19.24 4.75996 18.95 4.39996 18.87L2.74996 18.48C1.98996 18.3 1.71996 17.35 2.26996 16.8L6.16996 12.9C7.24996 14.5 8.95996 15.63 10.95 15.92C11.29 15.98 11.64 16.01 12 16.01C12.36 16.01 12.71 15.98 13.05 15.92C15.04 15.63 16.75 14.5 17.83 12.9L21.73 16.8C22.28 17.34 22.01 18.29 21.25 18.47Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M12.58 5.98L13.17 7.15999C13.25 7.31999 13.46 7.48 13.65 7.51L14.72 7.68999C15.4 7.79999 15.56 8.3 15.07 8.79L14.24 9.61998C14.1 9.75998 14.02 10.03 14.07 10.23L14.31 11.26C14.5 12.07 14.07 12.39 13.35 11.96L12.35 11.37C12.17 11.26 11.87 11.26 11.69 11.37L10.69 11.96C9.96997 12.38 9.53997 12.07 9.72997 11.26L9.96997 10.23C10.01 10.04 9.93997 9.75998 9.79997 9.61998L8.96997 8.79C8.47997 8.3 8.63997 7.80999 9.31997 7.68999L10.39 7.51C10.57 7.48 10.78 7.31999 10.86 7.15999L11.45 5.98C11.74 5.34 12.26 5.34 12.58 5.98Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>,
                label: "Bootcamps",
                pos: 10,
                key: "Bootcamps",
                path: "/bootcamps",
                permissions: ['academia-bootcamps_read', "all_permission_forever"],
            },
            {
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 19.5H21" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M11 12.5H21" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M11 5.5H21" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M3 5.5L4 6.5L7 3.5" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M3 12.5L4 13.5L7 10.5" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M3 19.5L4 20.5L7 17.5" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>,
                label: "Quizzes",
                pos: 11,
                key: "Quizzes",
                path: "/quizz",
                permissions: ['academia-quiz_read', "all_permission_forever"],
            },
        ]
    },
    {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.26001 11.0199V15.9899C4.26001 17.8099 4.26001 17.8099 5.98001 18.9699L10.71 21.6999C11.42 22.1099 12.58 22.1099 13.29 21.6999L18.02 18.9699C19.74 17.8099 19.74 17.8099 19.74 15.9899V11.0199C19.74 9.19994 19.74 9.19994 18.02 8.03994L13.29 5.30994C12.58 4.89994 11.42 4.89994 10.71 5.30994L5.98001 8.03994C4.26001 9.19994 4.26001 9.19994 4.26001 11.0199Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M17.5 7.63V5C17.5 3 16.5 2 14.5 2H9.5C7.5 2 6.5 3 6.5 5V7.56" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12.63 10.99L13.2 11.88C13.29 12.02 13.49 12.16 13.64 12.2L14.66 12.46C15.29 12.62 15.46 13.16 15.05 13.66L14.38 14.47C14.28 14.6 14.2 14.83 14.21 14.99L14.27 16.04C14.31 16.69 13.85 17.02 13.25 16.78L12.27 16.39C12.12 16.33 11.87 16.33 11.72 16.39L10.74 16.78C10.14 17.02 9.68002 16.68 9.72002 16.04L9.78002 14.99C9.79002 14.83 9.71002 14.59 9.61002 14.47L8.94002 13.66C8.53002 13.16 8.70002 12.62 9.33002 12.46L10.35 12.2C10.51 12.16 10.71 12.01 10.79 11.88L11.36 10.99C11.72 10.45 12.28 10.45 12.63 10.99Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>,
        label: "Talentos",
        pos: 10,
        key: "Talentos",
        permissions: ["talentos-empleadores_read", "talentos-aplicaciones_read", "talentos-trabajos_read", "talentos-perfiles_read", "all_permission_forever"],
        subMenus: [
            {
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M10.74 15.53L14.26 12L10.74 8.46997" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>,
                label: "Empleadores",
                pos: 10,
                key: "Empleadores",
                path: "/employment/employers",
                permissions: ["talentos-empleadores_read", "all_permission_forever"],
            },
            {
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M10.74 15.53L14.26 12L10.74 8.46997" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>,
                label: "Ofertas laborales",
                pos: 10,
                key: "Ofertas laborales",
                path: "/employment/jobs",
                permissions: ["talentos-trabajos_read", "all_permission_forever"],
            },
            {
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M10.74 15.53L14.26 12L10.74 8.46997" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>,
                label: "Postulaciones",
                pos: 10,
                key: "Postulaciones",
                path: "/employment/applications",
                permissions: ["talentos-aplicaciones_read", "all_permission_forever"],
            },
            {
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M10.74 15.53L14.26 12L10.74 8.46997" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>,
                label: "Perfiles",
                pos: 10,
                key: "Perfiles",
                path: "/employment/profiles",
                permissions: ["talentos-perfiles_read", "all_permission_forever"],
            },
            {
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.87988 18.1501V16.0801" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" />
                    <path d="M12 18.15V14.01" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" />
                    <path d="M17.1201 18.1499V11.9299" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" />
                    <path d="M17.1199 5.8501L16.6599 6.3901C14.1099 9.3701 10.6899 11.4801 6.87988 12.4301" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" />
                    <path d="M14.1899 5.8501H17.1199V8.7701" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>,
                label: "Reporte empleabilidad",
                pos: 10,
                key: "Reporte de empleabilidad",
                path: "/employment/report",
                permissions: ["talentos-empleabilidad_read", "all_permission_forever"],
            },
        ]
    },
    {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.96 6.17004C18.96 7.56004 20.34 9.77004 20.62 12.32" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M3.48999 12.37C3.74999 9.82997 5.10999 7.61997 7.08999 6.21997" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M8.19 20.9399C9.35 21.5299 10.67 21.8599 12.06 21.8599C13.4 21.8599 14.66 21.5599 15.79 21.0099" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12.06 7.70001C13.5954 7.70001 14.84 6.45537 14.84 4.92001C14.84 3.38466 13.5954 2.14001 12.06 2.14001C10.5247 2.14001 9.28003 3.38466 9.28003 4.92001C9.28003 6.45537 10.5247 7.70001 12.06 7.70001Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M4.82999 19.92C6.36534 19.92 7.60999 18.6753 7.60999 17.14C7.60999 15.6046 6.36534 14.36 4.82999 14.36C3.29464 14.36 2.04999 15.6046 2.04999 17.14C2.04999 18.6753 3.29464 19.92 4.82999 19.92Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M19.17 19.92C20.7054 19.92 21.95 18.6753 21.95 17.14C21.95 15.6046 20.7054 14.36 19.17 14.36C17.6347 14.36 16.39 15.6046 16.39 17.14C16.39 18.6753 17.6347 19.92 19.17 19.92Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>,
        label: "Ecosistema",
        pos: 10,
        key: "Ecosistema",
        permissions: ["ecosistema-usuarios_read", "all_permission_forever"],
        subMenus: [
            {
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 7.16C17.94 7.15 17.87 7.15 17.81 7.16C16.43 7.11 15.33 5.98 15.33 4.58C15.33 3.15 16.48 2 17.91 2C19.34 2 20.49 3.16 20.49 4.58C20.48 5.98 19.38 7.11 18 7.16Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M16.9699 14.44C18.3399 14.67 19.8499 14.43 20.9099 13.72C22.3199 12.78 22.3199 11.24 20.9099 10.3C19.8399 9.59004 18.3099 9.35003 16.9399 9.59003" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M5.96998 7.16C6.02998 7.15 6.09998 7.15 6.15998 7.16C7.53998 7.11 8.63998 5.98 8.63998 4.58C8.63998 3.15 7.48998 2 6.05998 2C4.62998 2 3.47998 3.16 3.47998 4.58C3.48998 5.98 4.58998 7.11 5.96998 7.16Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M6.99994 14.44C5.62994 14.67 4.11994 14.43 3.05994 13.72C1.64994 12.78 1.64994 11.24 3.05994 10.3C4.12994 9.59004 5.65994 9.35003 7.02994 9.59003" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M12 14.63C11.94 14.62 11.87 14.62 11.81 14.63C10.43 14.58 9.32996 13.45 9.32996 12.05C9.32996 10.62 10.48 9.46997 11.91 9.46997C13.34 9.46997 14.49 10.63 14.49 12.05C14.48 13.45 13.38 14.59 12 14.63Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M9.08997 17.78C7.67997 18.72 7.67997 20.26 9.08997 21.2C10.69 22.27 13.31 22.27 14.91 21.2C16.32 20.26 16.32 18.72 14.91 17.78C13.32 16.72 10.69 16.72 9.08997 17.78Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>,
                label: "Usuarios",
                pos: 10,
                key: "Usuarios",
                path: "/ecosystem/users",
                permissions: ["ecosistema-usuarios_read", "all_permission_forever"],
            },
        ]
    },
    {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9.11011V14.8801C3 17.0001 3 17.0001 5 18.3501L10.5 21.5301C11.33 22.0101 12.68 22.0101 13.5 21.5301L19 18.3501C21 17.0001 21 17.0001 21 14.8901V9.11011C21 7.00011 21 7.00011 19 5.65011L13.5 2.47011C12.68 1.99011 11.33 1.99011 10.5 2.47011L5 5.65011C3 7.00011 3 7.00011 3 9.11011Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>,
        label: "Configuración",
        key: "config",
        permissions: ["usuarios_read", "roles_read", "all_permission_forever"],
        subMenus: [
            {
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>,
                label: "Usuarios",
                key: "users",
                path: "/config/users",
                permissions: ["usuarios_read", "all_permission_forever"]
            },
            {
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 18.86H17.24C16.44 18.86 15.68 19.17 15.12 19.73L13.41 21.42C12.63 22.19 11.36 22.19 10.58 21.42L8.87 19.73C8.31 19.17 7.54 18.86 6.75 18.86H6C4.34 18.86 3 17.53 3 15.89V4.97998C3 3.33998 4.34 2.01001 6 2.01001H18C19.66 2.01001 21 3.33998 21 4.97998V15.89C21 17.52 19.66 18.86 18 18.86Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M11.9999 10.0001C13.2868 10.0001 14.33 8.95687 14.33 7.67004C14.33 6.38322 13.2868 5.34009 11.9999 5.34009C10.7131 5.34009 9.66992 6.38322 9.66992 7.67004C9.66992 8.95687 10.7131 10.0001 11.9999 10.0001Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M16 15.6601C16 13.8601 14.21 12.4001 12 12.4001C9.79 12.4001 8 13.8601 8 15.6601" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>,
                label: "Roles de usuario",
                key: "user_role",
                path: "/config/roles",
                permissions: ["roles_read", "all_permission_forever"]
            },
        ]
    }
]

export default routes;