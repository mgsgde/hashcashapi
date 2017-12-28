var React = require('react');

import POW from "../common/POW.js";
import Header from "../common/Header.js";
import Anzeige from "../common/Anzeige.js";
import DialogBox from "../common/DialogBox.js";

class Main extends React.Component {

    render() {
        return (
        	<div>
        		<Header />
            	<POW />
            	<Anzeige />
            	<DialogBox />
            </div>
        )
    }
}

export default Main