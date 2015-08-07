'use strict';

var React = require('react');
var LineChart = require("react-chartjs").Line;

var Modal = require('react-bootstrap/lib/Modal');
var Panel = require('react-bootstrap/lib/Panel');
var Button = require('react-bootstrap/lib/Button');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');

var BitstoreContent = React.createClass({
  displayName: 'BitstoreContent',

  getInitialState: function getInitialState() {
    return { showModal: false };
  },

  close: function close() {
    this.setState({ showModal: false });
  },

  open: function open() {
    this.setState({ showModal: true });
  },

  render: function render() {
    var src = this.props.src;
    var href = this.props.href;
    var post = this.props.post;
    var type = post.type;
    if (type) {
      type = type.split('/')[0];
    }

    var modalImage = React.createElement(Glyphicon, { style: { "fontSize": "25px" }, glyph: 'text-background', onClick: this.open });
    if (type === "image") modalImage = React.createElement('img', { width: '25px', height: '25px', src: src, onClick: this.open });
    var dateLine = [0, 1, 2, 1, 3, 5, 5, 6, 2, 3, 2, 1];
    var labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var lineData = {
      labels: labels,
      datasets: [{
        label: "Tips",
        fillColor: "rgba(151,187,205,0.2)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: dateLine
      }]
    };
    var modal = React.createElement(
      Modal,
      { show: this.state.showModal, onHide: this.close },
      React.createElement(
        Modal.Header,
        { closeButton: true },
        React.createElement(
          Modal.Title,
          null,
          modalImage,
          "  " + post.title + "\'s Statistics"
        )
      ),
      React.createElement(
        Modal.Body,
        null,
        React.createElement(
          'div',
          null,
          React.createElement(LineChart, { data: lineData, options: { responsive: true }, height: '150' })
        ),
        React.createElement('hr', null),
        React.createElement(
          'p',
          null,
          'Publish Date: ',
          React.createElement(
            'b',
            null,
            new Date(post.datetime).toLocaleString()
          )
        ),
        React.createElement(
          'p',
          null,
          'Tips: ',
          React.createElement(
            'b',
            null,
            post.tips
          )
        )
      ),
      React.createElement(
        Modal.Footer,
        null,
        React.createElement(
          Button,
          { onClick: this.close },
          'Close'
        )
      )
    );

    if (this.props.preview) {
      if (type === "image") {
        return React.createElement(
          'a',
          { href: href },
          React.createElement('img', { height: '25px', width: '25px', src: src })
        );
      } else if (type === "audio") {
        return React.createElement(
          'a',
          { href: href },
          React.createElement(Glyphicon, { style: { "fontSize": "25px" }, glyph: 'play' })
        );
      } else {
        return React.createElement(
          'a',
          { href: href },
          React.createElement(Glyphicon, { style: { "fontSize": "25px" }, glyph: 'text-background' })
        );
      }
    } else if (this.props.visual) {
      if (type === "image") {
        return React.createElement(
          'div',
          null,
          React.createElement(
            'div',
            { className: 'bitstore-image' },
            React.createElement('img', { src: src, onClick: this.open })
          ),
          modal
        );
      } else if (type === "audio") {
        return React.createElement(
          'div',
          null,
          React.createElement(
            'center',
            null,
            React.createElement(
              'div',
              { className: 'bitstore-image' },
              React.createElement('img', { src: 'http://cdn2.thefullsignal.com/sites/knowyourcell/files/images/329855.jpg', onClick: this.open })
            )
          ),
          modal
        );
      } else {
        return React.createElement(
          'div',
          null,
          React.createElement(
            'center',
            null,
            React.createElement(
              'div',
              { className: 'bitstore-image' },
              React.createElement('img', { src: 'http://www.1wallpaperhd.com/wp-content/uploads/Colorful/FTP1/1280x720/Solid%20color%20wallpapers%2002%201280x720.jpg', onClick: this.open })
            )
          ),
          modal
        );
      }
    } else if (this.props.text) {
      var title = post.title;
      return React.createElement(
        'div',
        null,
        React.createElement(
          'a',
          { onClick: this.open },
          title
        ),
        modal
      );
    }
  }
});

module.exports = BitstoreContent;