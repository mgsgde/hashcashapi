const React = require('react');

let Modal = require('../../../node_modules/modal-vanilla/dist/modal.js')

class POW extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      hash: "",
      nonce: "",
      challenge: " "
    }
  }

  generatePoW() {

    fetch('challenge.json').then((response) => {
      return response.json();
    }).then((data) => {
      let difficulty = data.difficulty;
      let challenge = data.challenge;
      // document.getElementById("powLoader").style.visibility = "visible";
      // document.getElementById('hashTextField').value = ""
      var worker = new Worker('/pow.js');
      worker.postMessage({
        challenge: challenge,
        difficulty: difficulty
      })
      worker.addEventListener('message', (e) => {
        console.log("e.data.nonce", e.data.nonce)
        this.setState({
          challenge: challenge,
          nonce: e.data.nonce,
          hash: e.data.hash
        });
        // document.getElementById('hashTextField').value = JSON.stringify({
        //   challenge: challenge,
        //   nonce: e.data.nonce,
        //   hash: e.data.hash
        // });
        document.getElementById("powLoader").style.visibility = "hidden";
      }, false);
    });
  }

  sendPoWToken() {
    var myImage = document.querySelector('img');
    fetch(`/randomPicture?nonce=${this.state.nonce}&challenge=${this.state.challenge}`).then(function(response) {
      let p;
      if (response.status == 200) {
        return response.blob().then(function(myBlob) {
          var objectURL = URL.createObjectURL(myBlob);
          myImage.src = objectURL;
        })
      } else if (response.status == 401)
        return response.json().then(function(json) {
          var myModal = new Modal({
            el: document.getElementById('my-modal'),
            title: `401 Unauthorized`,
            content: json.message
          });
          myModal.show();
        })
      else
        throw Error(response.statusText);
    })
  }

  render() {
    return (


      <div class="container">
        <div class="row">
          <div class="col-10 offset-2">
          </div>
        </div>
        <div class="row">
          <div class="col-10 offset-2">
            <button className="btn btn-primary" onClick={ this.generatePoW.bind(this) } style={ { margin: "0 auto", display: "block" } }> Generate Proof of Work Token
            </button>
          </div>
        </div>
        <div class="row">
          <div class="panel panel-default" style={ { float: "left", fontSize: "28px" } }>
            <div class="panel-body">
              HASCH(
            </div>
          </div>
          <div class="panel panel-default" style={ { float: "left", fontSize: "28px", width: "296px" } }>
            <div class="panel-body" style={{textAlign: "center"}}>
              challenge
            </div>
          </div>
          <div class="panel panel-default" style={ { float: "left", fontSize: "28px" } }>
            <div class="panel-body">
              |
            </div>
          </div>
          <div class="panel panel-default" style={ { float: "left", fontSize: "28px" } }>
            <div class="panel-body">
              nonce
            </div>
          </div>
          <div class="panel panel-default" style={ { float: "left", fontSize: "28px" } }>
            <div class="panel-body">
              )
            </div>
          </div>
          <div class="panel panel-default" style={ { float: "left", fontSize: "28px" } }>
            <div class="panel-body">
              =
            </div>
          </div>
          <div class="panel panel-default" style={ { float: "left", fontSize: "28px" } }>
            <div class="panel-body">
              hashwert
            </div>
          </div>
        </div>
        <div class="row">
          <div class="panel panel-default" style={ { float: "left", fontSize: "28px" } }>
            <div class="panel-body">
              HASCH(
            </div>
          </div>
          <div class="panel panel-default" style={ { float: "left", fontSize: "22px", width: "296px" } }>
            <div class="well" style={{height: "71.11px"}}>{ this.state.challenge }</div>
          </div>
          <div class="panel panel-default" style={ { float: "left", fontSize: "28px" } }>
            <div class="panel-body">
              |
            </div>
          </div>
          <div class="panel panel-default" style={ { float: "left", fontSize: "22px", width: "106px" } }>
            <div class="well" style={{height: "71.11px", textAlign: "center"}}>
              { this.state.nonce }
            </div>
          </div>
          <div class="panel panel-default" style={ { float: "left", fontSize: "28px" } }>
            <div class="panel-body">
              )
            </div>
          </div>
          <div class="panel panel-default" style={ { float: "left", fontSize: "28px" } }>
            <div class="panel-body">
              =
            </div>
          </div>
          <div class="panel panel-default" style={ { float: "left", fontSize: "22px", width: "300px" } }>
            <div class="well" style={{height: "71.11px"}}>
              { String(this.state.hash).substring(0,20) }
            </div>
          </div>
        </div>
        <div class="row">
          <button style={ { margin: "30px auto 30px auto", display: "block" } } className="btn btn-danger" onClick={ this.sendPoWToken.bind(this) }> Send Token & Get picture
          </button>
        </div>
      </div>



    );
  }
}

export default POW