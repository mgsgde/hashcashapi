const React = require('react');

let Modal = require('../../../node_modules/modal-vanilla/dist/modal.js')

class POW extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      hash: "",
      nonce: "",
      challenge: " ",
      difficulty: " "
    }
  }

  generatePoW() {

    var worker = new Worker('/pow.js');
    worker.postMessage({
      challenge: this.state.challenge,
      difficulty: this.state.difficulty
    })
    worker.addEventListener('message', (e) => {

      jQuery("#nonce").addClass("flashBlue");
      jQuery("#hash").addClass("flashBlue");

      this.setState({
        challenge: this.state.challenge,
        nonce: e.data.nonce,
        hash: e.data.hash
      });
      // $("#genpowbtn").addClass("disabled")
      // $("#challengebtn").removeClass("disabled")
      document.getElementById("powLoader").style.visibility = "hidden";
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

      setTimeout( function(){
        $("#challenge, #difficulty").removeClass("flashGreen");
      }, 1000); // Timeout must be the same length as the CSS3 transition or longer (or you'll mess up the transition)


      console.log(data.difficulty)
      this.setState({
        challenge: data.challenge,
        difficulty: data.difficulty
      });
    })
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
          <div class="btn-group" role="group" style={ { margin: "auto", width: "340px", display: "block" } }>
            <button id="challengebtn" type="btn" className="btn btn-success" onClick={ this.getChallenge.bind(this) }>Get Challenge</button>
            <button id="genpowbtn" className="btn btn-primary" onClick={ this.generatePoW.bind(this) } style={ { margin: "0 auto", display: "block" } }> Generate Proof of Work Token</button>
          </div>
        </div>
        <div class="row">
          <div class="panel panel-default" style={ { float: "left", fontSize: "28px" } }>
            <div class="panel-body">
              HASH(
            </div>
          </div>
          <div class="panel panel-default" style={ { float: "left", fontSize: "28px", width: "296px" } }>
            <div class="panel-body" style={ { textAlign: "center" } }>
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
              Hashwert
            </div>
          </div>
          <div class="panel panel-default" style={ { float: "left", fontSize: "28px" } }>
            <div class="panel-body">
              (difficulty:
            </div>
          </div>
          <div class="panel panel-default" style={ { float: "left", fontSize: "28px" } }>
            <div id="difficulty" class="well" style={ { height: "71.11px" } }>
              { this.state.difficulty }
            </div>
          </div>
                    <div class="panel panel-default" style={ { float: "left", fontSize: "28px" } }>
         <div class="panel-body">
              )
            </div>
          </div>
        </div>
        <div class="row">
          <div class="panel panel-default" style={ { float: "left", fontSize: "28px" } }>
            <div class="panel-body">
              HASH(
            </div>
          </div>
          <div class="panel panel-default" style={ { float: "left", fontSize: "22px", width: "296px" } }>
            <div id="challenge" class="well" style={ { height: "71.11px" } }>
              { this.state.challenge }
            </div>
          </div>
          <div class="panel panel-default" style={ { float: "left", fontSize: "28px" } }>
            <div class="panel-body">
              |
            </div>
          </div>
          <div class="panel panel-default" style={ { float: "left", fontSize: "22px", width: "106px" } }>
            <div id="nonce" class="well" style={ { height: "71.11px", textAlign: "center" } }>
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
            <div id="hash" class="well" style={ { height: "71.11px" } }>
              { String(this.state.hash).substring(0, 20) }
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