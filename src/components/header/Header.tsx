import React from "react";
import {Outlet} from "react-router-dom";

function Header(): React.JSX.Element {
    return (
        <div data-testid="header-component">
            <Outlet/>
        </div>
    );
}

export default Header;
