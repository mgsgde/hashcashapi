var React = require('react');

import Pow from "../../containers/Pow.js";
import Header from "../common/Header.js";
import Anzeige from "../common/Anzeige.js";
import DialogBox from "../common/DialogBox.js";

class Main extends React.Component {

    render() {
        return (
        	<div>
        		<Header />
            	<Pow />
            	<Anzeige />
            	<DialogBox />
            </div>
        )
    }
}

export default Main