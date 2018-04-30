import React from 'react';
import ReactDOM from 'react-dom';
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.data || {};
      }
      componentWillMount() {
        if(ExecutionEnvironment.canUseDOM){
            window.PubSub.subscribe('headerUpdated', (msg, data) => {
                this.setState(Object.assign({}, data));
            });
        }
      }
    render() {
        return <div>Sidebar, {this.state.name}</div>;
    }
}


if(ExecutionEnvironment.canUseDOM) {
    document.querySelectorAll('[data-component="sidebar"]').forEach((el) => {
        ReactDOM.hydrate(<Sidebar data={window.ReactData[el.getAttribute('data-instance-id')]}/>, el);
    });
}

export default Sidebar;