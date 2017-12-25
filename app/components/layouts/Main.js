var React = require('react');

import POW from "../common/POW.js";
import Header from "../common/Header.js";
import Anzeige from "../common/Anzeige.js";

class Main extends React.Component {

    render() {
        return (
        	<div>
        		<Header />
            	<POW />
            	<Anzeige />
            </div>
        )
    }
}

export default Main