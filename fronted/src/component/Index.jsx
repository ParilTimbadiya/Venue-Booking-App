// Index.jsx
import React from 'react';

function Index() {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Noobs Cricboard</title>
        <meta property="og:url" content="https://noobscricboard.netlify.app" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="manage cricket matches on your touch" />
        <meta
          property="og:description"
          content="Discover Noob's Criboard: A single-page application developed using vanilla javascript that is capable of tracking the score of a running cricket match."
        />
        <meta property="og:image" content="https://noobscricboard.netlify.app/src/assets/images/home-img.jpg" />
        <meta property="og:site_name" content="Noobs Cricboard" />
        <link rel="icon" href="assets/images/logo.png" />
        <link rel="stylesheet" href="src/assets/style.css" />
      </head>
      <body>
        <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light px-3 shadow shadow-lg">
          <a className="navbar-brand" href="#">
            <span className="fw-bold">
              <img src="assets/images/logo.png" width="40" height="40" alt="" />
              Noob's Cricboard
            </span>
          </a>
          <a href="#" className="h5 d-block d-lg-none" data-bs-toggle="collapse" data-bs-target="#nbcollapse">
            <img src="assets/images/toggler.png" width="25" height="25" alt="" />
          </a>
          <div className="collapse navbar-collapse" id="nbcollapse">
            <ul className="navbar-nav my-2 my-lg-0">
              <li className="nav-item mx-auto mx-lg-1 my-1 my-lg-0 shadow shadow-lg px-3 rounded-pill">
                <a
                  className="nav-link active rounded-pill text-primary"
                  aria-current="page"
                  href="#"
                >
                  <span>
                    <img src="assets/images/new-match.png" width="35" height="35" alt="" />
                  </span>
                  <span> New match</span>
                </a>
              </li>
              <li
                id="running-match-nav"
                className="d-none nav-item mx-auto mx-lg-1 my-1 my-lg-0 shadow shadow-lg px-3 rounded-pill"
              >
                <a
                  className="nav-link active rounded-pill text-success"
                  aria-current="page"
                  href="#"
                >
                  <span>
                    <img src="assets/images/running-match.png" width="35" height="35" alt="" />
                  </span>
                  <span> Running match</span>
                </a>
              </li>
              <li
                id="score-nav"
                className="d-none nav-item mx-auto mx-lg-1 my-1 my-lg-0 shadow shadow-lg px-3 pt-lg-1 rounded-pill"
              >
                <a
                  className="nav-link active rounded-pill text-success"
                  aria-current="page"
                  href="#"
                >
                  <span>
                    <img src="assets/images/scoreboard.png" width="25" height="25" alt="" />
                  </span>
                  <span> &nbsp;Full scorecard</span>
                </a>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item mx-1">
                <a className="nav-link active" href="#">About</a>
              </li>
              <li className="nav-item mx-1">
                <a className="nav-link active" href="#">Manual</a>
              </li>
              <li className="nav-item mx-1">
                <a
                  className="nav-link active"
                  href="mailto:mdmahfuzurrahmanarif@gmail.com?Subject=Noobs-Cricboard%20bug%20report"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <div className="container-fluid" id="main-container"></div>

        <script src="assets/bootstrap.bundle.min.js"></script>
        <script src="app/route.js"></script>
        <script src="app/setup.js"></script>
        <script src="app/scoreboard.js"></script>
        <script src="app/run.js"></script>
        <script src="app/wicket.js"></script>
        <script src="app/run_out.js"></script>
        <script src="app/wide_ball.js"></script>
        <script src="app/no_ball.js"></script>

        <div className="modal fade" id="error-modal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Error Message</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div id="error-msg"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="new-match-modal" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmation Message</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                A match is still running, Are you sure want to discard this match and start a new one?
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" id="new-match-btn" data-bs-dismiss="modal">Yes</button>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

export default Index;