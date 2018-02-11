const React = require('react');

let Modal = require('../../../node_modules/modal-vanilla/dist/modal.js')

class POW extends React.Component {


  generatePoW() {

    var worker = new Worker('/pow.js');
    worker.postMessage({
      challenge: this.props.challenge,
      difficulty: this.props.difficulty
    })
    worker.addEventListener('message', (e) => {

      jQuery("#nonce").addClass("flashBlue");
      jQuery("#hash").addClass("flashBlue");

      this.props.setNonceAndHash(e.data.nonce, e.data.hash)

    }, false);
    $("#nonce, #hash").removeClass("flashBlue");
  }

  getChallenge() {
    fetch('challenge.json').then((response) => {
      return response.json();
    }).then((data) => {
      // $("#genpowbtn").removeClass("disabled")
      // $("#challengebtn").addClass("disabled")
      $("#challenge, #nonce, #hash").empty();

      jQuery("#challenge").addClass("flashGreen");
      jQuery("#difficulty").addClass("flashGreen");

      setTimeout(function() {
        $("#challenge, #difficulty").removeClass("flashGreen");
      }, 1000); // Timeout must be the same length as the CSS3 transition or longer (or you'll mess up the transition)


      console.log(data.difficulty)

      this.props.setChallengeAndDifficulty(data.challenge, data.difficulty);
    })
  }

  sendPoWToken() {
    var myImage = document.querySelector('img');
    fetch(`/randomPicture?nonce=${this.props.nonce}&challenge=${this.props.challenge}`).then(function(response) {
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


      <div className="container">
        <div className="row">
          <div className="btn-group" role="group" style={ { margin: "auto", width: "340px", display: "block" } }>
            <button id="challengebtn" type="btn" className="btn btn-success" onClick={ this.getChallenge.bind(this) }>Get Challenge</button>
            <button id="genpowbtn" className="btn btn-primary" onClick={ this.generatePoW.bind(this) } style={ { margin: "0 auto", display: "block" } }> Generate Proof of Work Token</button>
          </div>
        </div>
        <div className="row">
          <div className="panel panel-default" style={ { float: "left", fontSize: "28px" } }>
            <div className="panel-body">
              HASH(
            </div>
          </div>
          <div className="panel panel-default" style={ { float: "left", fontSize: "28px", width: "296px" } }>
            <div className="panel-body" style={ { textAlign: "center" } }>
              challenge
            </div>
          </div>
          <div className="panel panel-default" style={ { float: "left", fontSize: "28px" } }>
            <div className="panel-body">
              |
            </div>
          </div>
          <div className="panel panel-default" style={ { float: "left", fontSize: "28px" } }>
            <div className="panel-body">
              nonce
            </div>
          </div>
          <div className="panel panel-default" style={ { float: "left", fontSize: "28px" } }>
            <div className="panel-body">
              )
            </div>
          </div>
          <div className="panel panel-default" style={ { float: "left", fontSize: "28px" } }>
            <div className="panel-body">
              =
            </div>
          </div>
          <div className="panel panel-default" style={ { float: "left", fontSize: "28px" } }>
            <div className="panel-body">
              Hashwert
            </div>
          </div>
          <div className="panel panel-default" style={ { float: "left", fontSize: "28px" } }>
            <div className="panel-body">
              (difficulty:
            </div>
          </div>
          <div className="panel panel-default" style={ { float: "left", fontSize: "28px" } }>
            <div id="difficulty" className="well" style={ { height: "71.11px" } }>
              { this.props.difficulty }
            </div>
          </div>
          <div className="panel panel-default" style={ { float: "left", fontSize: "28px" } }>
            <div className="panel-body">
              )
            </div>
          </div>
        </div>
        <div className="row">
          <div className="panel panel-default" style={ { float: "left", fontSize: "28px" } }>
            <div className="panel-body">
              HASH(
            </div>
          </div>
          <div className="panel panel-default" style={ { float: "left", fontSize: "22px", width: "296px" } }>
            <div id="challenge" className="well" style={ { height: "71.11px" } }>
              { this.props.challenge }
            </div>
          </div>
          <div className="panel panel-default" style={ { float: "left", fontSize: "28px" } }>
            <div className="panel-body">
              |
            </div>
          </div>
          <div className="panel panel-default" style={ { float: "left", fontSize: "22px", width: "106px" } }>
            <div id="nonce" className="well" style={ { height: "71.11px", textAlign: "center" } }>
              { this.props.nonce }
            </div>
          </div>
          <div className="panel panel-default" style={ { float: "left", fontSize: "28px" } }>
            <div className="panel-body">
              )
            </div>
          </div>
          <div className="panel panel-default" style={ { float: "left", fontSize: "28px" } }>
            <div className="panel-body">
              =
            </div>
          </div>
          <div className="panel panel-default" style={ { float: "left", fontSize: "22px", width: "300px" } }>
            <div id="hash" className="well" style={ { height: "71.11px" } }>
              { String(this.props.hash).substring(0, 20) }
            </div>
          </div>
        </div>
        <div className="row">
          <button style={ { margin: "30px auto 30px auto", display: "block" } } className="btn btn-danger" onClick={ this.sendPoWToken.bind(this) }> Send Token & Get picture
          </button>
        </div>
      </div>



    );
  }
}

export default POW