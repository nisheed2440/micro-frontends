import React from 'react';
import ReactDOM from 'react-dom';
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.data || {};
      }
      componentDidMount() {
          setInterval(() => {
              this.setState(Object.assign({}, this.state, {
                  name: Math.floor(Math.random() * 200)
              }));
              if(ExecutionEnvironment.canUseDOM){
                  window.PubSub.publish('headerUpdated', this.state);
              }
          }, 300);
      }
    render() {
        return <div>Header, {this.state.name}</div>;
    }
}


if(ExecutionEnvironment.canUseDOM) {
    document.querySelectorAll('[data-component="header"]').forEach((el) => {
        ReactDOM.hydrate(<Header data={window.ReactData[el.getAttribute('data-instance-id')]}/>, el);
    });
}

export default Header;