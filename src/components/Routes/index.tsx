import {Navigate, Outlet, useLocation, OutletProps} from "react-router-dom";

interface CustomOutletProps extends OutletProps {
    auth?: boolean
}
export function ProtectedLayout(props: CustomOutletProps): React.ReactElement {
    const location = useLocation()

    if (sessionStorage.getItem("token") !== "") {
        return (<Navigate to="/login" state={{from: location}} />)
    }

    return <Outlet {...props} />
}

export function PublicLayout(props: OutletProps): React.ReactElement {
    const location = useLocation()

    if (sessionStorage.getItem("token")) {
        return (<Navigate to="/" state={{from: location}} />)
    }

    return <Outlet {...props} />
}