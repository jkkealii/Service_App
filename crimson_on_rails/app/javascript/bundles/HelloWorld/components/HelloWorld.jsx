import PropTypes from 'prop-types';
import React from 'react';

export default class HelloWorld extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired, // this is passed from the Rails view
  };

  /**
   * @param props - Comes from your rails view.
   */
  constructor(props) {
    super(props);

    // How to set initial state in ES6 class syntax
    // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    this.state = {
      name: this.props.name,
      progress: this.props.name.length
    };

    this._handleButtonClick = this._handleButtonClick.bind(this);
  }

  updateName = (name) => {
    this.setState({
      name: name,
      progress: name.length
    });
  };

  _handleButtonClick(event) {
    event.preventDefault();
    alert('pressed!');
  }

  render() {
    return (
      <div className="section">
        <h3>
          Hello, {this.state.name}!
        </h3>
        <progress className="progress" value={this.state.progress} max="100">{this.state.progress}%</progress>
        <hr />
        <form>
          <div className="field has-addons has-addons-centered">
            <label className="label" htmlFor="name">
              Say hello to:
            </label>
            <div className="control">
              <input
                id="name"
                className="input"
                type="text"
                value={this.state.name}
                onChange={(e) => this.updateName(e.target.value)}
              />
            </div>
            <div className="control">
              <button id="press-me-button" className="button is-warning" onClick={this._handleButtonClick}>
                Press me
              </button>
            </div>
          </div>
        </form>
        <hr />
        <div className="columns">
          <div className="column">
            <button className="button is-primary">
              Numero uno
            </button>
          </div>
          <div className="column">
            <button className="button is-secondary">
              Numero dos
            </button>
          </div>
          <div className="column">
            <button className="button is-secondary">
              Numero tres
            </button>
          </div>
        </div>
        <div className="tile is-ancestor">
          <div className="tile is-vertical is-8">
            <div className="tile">
              <div className="tile is-parent is-vertical">
                <article className="tile is-child notification is-primary">
                  <p className="title">Vertical...</p>
                  <p className="subtitle">Top tile</p>
                </article>
                <article className="tile is-child notification is-warning">
                  <p className="title">...tiles</p>
                  <p className="subtitle">Bottom tile</p>
                </article>
              </div>
              <div className="tile is-parent">
                <article className="tile is-child notification is-info">
                  <p className="title">Middle tile</p>
                  <p className="subtitle">With an image</p>
                  <figure className="image is-4by3">
                    <img src="https://bulma.io/images/placeholders/640x480.png"/>
                  </figure>
                </article>
              </div>
            </div>
            <div className="tile is-parent">
              <article className="tile is-child notification is-danger">
                <p className="title">Wide tile</p>
                <p className="subtitle">Aligned with the right tile</p>
                <div className="content">

                </div>
              </article>
            </div>
          </div>
          <div className="tile is-parent">
            <article className="tile is-child notification is-success">
              <div className="content">
                <p className="title">Tall tile</p>
                <p className="subtitle">With even more content</p>
                <div className="content">

                </div>
              </div>
            </article>
          </div>
        </div>
        <footer className="footer">
          <div className="container">
            <div className="content has-text-centered">
              <p>This is my footer</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
