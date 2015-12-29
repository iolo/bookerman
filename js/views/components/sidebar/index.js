import React from 'react';
import mixin from 'react-mixin';
import {History} from 'react-router';
import moment from 'moment';
import classnames from 'classnames';
import ACTIONS from '../../../actions';
import {dispatch} from '../../../dispatcher';
import DatePicker from 'react-date-picker';
import Section from './section';
import Splitter from './Splitter';

class Sidebar extends React.Component {

    /**
     * Sidebar을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        const date = moment(this.props.date);
        const minimal = classnames({
            'sidebar--minimal': this.props.minimal
        });

        return (
            <aside className={`sidebar ${minimal}`}>
                <div className="sidebar__inner">
                    <Section>
                        <div className="sidebar__picker">
                            <DatePicker
                                hideFooter={true}
                                date={date}
                                view="month"
                                onChange={this._onSelectDatePicker.bind(this)}
                            />
                        </div>
                    </Section>
                    <Splitter onClick={this._onClickSplitter.bind(this)}/>
                </div>
            </aside>
        );
    }

    /**
     * DatePicker의 select 이벤트 리스너
     * @param {string} date
     * @private
     */
    _onSelectDatePicker(date) {
        this.history.pushState(null, `/calendar/${date}`);
    }

    /**
     * Spliitter의 click 이벤트 리스너
     * @private
     */
    _onClickSplitter(event) {
        event.preventDefault();

        dispatch({type: ACTIONS.TOGGLE_EXTEND_MODE});
    }
}

/**
 * Sidebar의 Props 인터페이스 정의
 * @param {string} date
 * @param {boolean} [minimal=false]
 */
Sidebar.propTypes = {
    date: React.PropTypes.string.isRequired,
    minimal: React.PropTypes.bool
};

/**
 * Sidebar의 Props 기본값 정의
 * @param {boolean} minimal
 */
Sidebar.defaultProps = {
    minimal: false
};

mixin.onClass(Sidebar, History);

export default Sidebar;
