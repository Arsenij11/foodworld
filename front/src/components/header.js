import React from "react";

class Header extends React.Component {
    render() {
        return <header onClick={event => window.location.href = `http://localhost:9000`}>
            <h1>FoodWorld</h1>
        </header>
    }
}

export default Header;