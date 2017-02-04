import React from 'react';
import { Link } from 'react-router';
import addIcons from '../utils/icon-animations';

export default class EmptyPage extends React.Component {
    constructor(props){
		super(props);
        this.interval = null;
		this.drawAction = this.drawAction.bind(this);
        this.startInterval  = this.startInterval.bind(this);
	}

    componentDidMount(){
        this.interval = setInterval(this.startInterval, 500);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    startInterval(){
        this.drawAction( {icon: 'fa fa-frown-o'} );
    }

	drawAction(icon) {
	  addIcons(icon.icon);
	}

    render() {
        return (
            <div id="wrap">
                <h1> Silent Salutations </h1>
                <div className="columns column-0"></div>
                <div className="columns column-1"></div>
                <div className="columns column-2"></div>
                <div className="columns column-3"></div>
                <div className="columns column-4"></div>
                <button className="btn red btn-circle btn-xl" data-icon="fa fa-frown-o">
                    <i className="fa fa-frown-o"></i>
                 </button>
                <h1 className="textbold">Oops! That room doesn't exist...</h1>
                <Link to={'/'}><h1> Go back home</h1></Link>
            </div>
        );
    }
}


module.exports = EmptyPage;
