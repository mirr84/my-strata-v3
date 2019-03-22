import React from "react";
import PropTypes from "prop-types";

class LocationListener extends React.Component {

    static contextTypes = {
        router: PropTypes.object
    };

    componentDidMount() {
        this.handleLocationChange(this.context.router.history.location);
        this.unlisten =
            this.context.router.history.listen(this.handleLocationChange);
    }

    componentWillUnmount() {
        this.unlisten();
    }

    handleLocationChange(location) {
        // console.log(`- - - location: '${location.pathname}'`);
    }

    render() {
        return this.props.children;
    }
}

export default LocationListener