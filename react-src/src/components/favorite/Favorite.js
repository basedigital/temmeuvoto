import React, {Component} from 'react';
import PropTypes from 'prop-types';

import cls from 'classnames';

import './Favorite.scss';

class Favorite extends Component {
    static propTypes = {
        id: PropTypes.any
    }

    constructor(props) {
        super(props);

        const favorite = localStorage.getItem('favorite');
        this.state = {selected: favorite ? JSON.parse(favorite)[props.id] : false}
    }

    onFavoriteClick = () => {
        const {id} = this.props;

        const selected = !this.state.selected;

        this.setState({selected});

        let favorite = localStorage.getItem('favorite');
        if (!favorite)
            favorite = {};
        else
            favorite = JSON.parse(favorite);

        favorite[id] = selected;

        localStorage.setItem('favorite', JSON.stringify(favorite));
    }

    render() {
        const {selected} = this.state;

        return <div className={cls("Favorite", {"is-selected": this.state.selected})} onClick={this.onFavoriteClick}>
            {!selected && <img src={require("./images/favorite.png")}/>}
            {selected && <img src={require("./images/favorite-check.png")}/>}
        </div>
    }
}

export default Favorite;
