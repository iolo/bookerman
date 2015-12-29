import React from 'react';
import mixin from 'react-mixin';
import {History} from 'react-router';
import GoogleAPI from '../apis/googleApi';
import Front from './components/front';

class Authentication extends React.Component {

    /**
     * Authentication를 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        return (
            <Front onClick={this._onClickFront.bind(this)}/>
        );
    }

    /**
     * Authentication 컴포넌트의 click 이벤트 리스너
     * @private
     */
    _onClickFront() {
        GoogleAPI.authorize().then(() => {
            this.history.pushState(null, '/');
        }).catch((err) => {
            throw err;
        });
    }
}

mixin.onClass(Authentication, History);

export default Authentication;
