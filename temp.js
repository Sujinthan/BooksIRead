/** @jsx React.DOM */

var Hello = React.createClass({
    render: function() {
      return (
      <div>
        <p contentEditable="true"
           onKeyDown={this.handleKeyDown}
           onKeyUp={this.handleKeyUp}
           onKeyPress={this.handleKeyPress}>Foobar</p>
        <textarea
           onKeyDown={this.handleKeyDown}
           onKeyUp={this.handleKeyUp}
           onKeyPress={this.handleKeyPress}>
        </textarea>
        <div>
          <input type="text" name="foo"
           onKeyDown={this.handleKeyDown}
           onKeyUp={this.handleKeyUp}
           onKeyPress={this.handleKeyPress} />
        </div>
      </div>
      );
    },

    handleKeyDown: function(e) {
      console.log(e.type, e.which, e.timeStamp);
    },

    handleKeyUp: function(e) {
     console.log(e.type, e.which, e.timeStamp);
    },

    handleKeyPress: function(e) {
     console.log(e.type, e.which, e.timeStamp);
    }
});

React.renderComponent(<Hello />, document.body);
