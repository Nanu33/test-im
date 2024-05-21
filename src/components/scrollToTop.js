import React, { Component } from "react";
import PropTypes from "prop-types";

class ScrollToTop extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
			window.scrollTo(0, 0);
		}
	}

	render() {
		return <React.Fragment />;
	}
}

export default ScrollToTop;