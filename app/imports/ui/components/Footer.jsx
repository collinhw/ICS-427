import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px' };
    return (
        <footer>
          <div style={divStyle} className="ui center aligned container">
            <hr />
              ICS 427 Assignment 2 <br />
              University of Hawaii<br />
              @2020  Never Alone. All rights reserved<br/>
              
          </div>
        </footer>
    );
  }
}

export default Footer;
