const React = require('react');
// let pow = require('../../scripts/pow.js');

class POW extends React.Component {

  constructor(props) {
     super(props)
     this.state = { hash: null, nonce: null }
 }

 generatePoW() {
  
     fetch('challenge.json').then((response) => {
         return response.json();
     }).then((data) => {
         let difficulty = data.difficulty;
         let challenge = data.challenge;
         document.getElementById("powLoader").style.visibility = "visible";
         document.getElementById('hashTextField').value = ""
         var worker = new Worker('/pow.js');
         worker.postMessage({ challenge: challenge, difficulty: difficulty })
         worker.addEventListener('message', (e) => {
             this.setState({ challenge: challenge, nonce: e.data.nonce });
             document.getElementById('hashTextField').value = JSON.stringify({ challenge: challenge, nonce: e.data.nonce, hash: e.data.hash});
             document.getElementById("powLoader").style.visibility = "hidden";
         }, false);
     });
 }

 sendPoWToken() {
     var myImage = document.querySelector('img');
     fetch(`/pictures/winter.jpg?nonce=${this.state.nonce}&challenge=${this.state.challenge}`).then(function(response) {
         if (response.status == 200)
             return response.blob();
         else
             throw Error(response.statusText);
     }).then(function(myBlob) {
         var objectURL = URL.createObjectURL(myBlob);
         myImage.src = objectURL;
     })
 }

  render() {
      return(    
             <div id="pow">

              <button className="btn btn-primary" onClick={this.generatePoW.bind(this)}>Generate Proof of Work Token</button>
              <input id="hashTextField" type="text" className="form-control" readOnly/>
              <div id="powLoader" className="loader"/>
              
              <button id="sendPoWTokenButton" className="btn btn-danger" onClick={this.sendPoWToken.bind(this)}> Send Token & Get picture  </button>
             </div>
      );
  }
}

export default POW