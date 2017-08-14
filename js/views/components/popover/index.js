import React from 'react';
import ReactDOM from 'react-dom';
import reactMixin from 'react-mixin';
import classnames from 'classnames';
import Header from './header';
import Body from './body';
import Footer from './footer';
import ajaxer from '../../mixins/ajaxer';
import ACTIONS from '../../../actions';
import {dispatch} from '../../../dispatcher';

@reactMixin.decorate(ajaxer)
class Popover extends React.Component {

    /**
     * Popover의 생성자
     * @constructs
     * @param {Popover.propTypes} props
     */
    constructor(props) {
        super(props);

        this.state = {
            popoverX: 0,
            popoverY: 0,
            arrowX: '',
            direction: 'bottom'
        };
    }

    /**
     * Popover이 rerender 되기 전 호출된다.
     * @param {Popover.propTypes} nextProps
     * @returns {boolean}
     */
    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.options !== this.props.options ||
            nextState.popoverX !== this.state.popoverX ||
            nextState.popoverY !== this.state.popoverY ||
            nextState.arrowX !== this.state.arrowX
        );
    }

    /**
     * Popover가 DOM에 추가되면 호출된다.
     */
    componentDidMount() {
        document.addEventListener('click', this._onClickDocument.bind(this));
    }

    /**
     * Popover가 갱신된 뒤 호출된다.
     * 팝오버의 좌표를 계산해 적절한 위치로 옮긴다.
     * @param {Popover.propTypes} prevProps
     * @param {Object} prevState
     * @returns {boolean}
     */
    componentDidUpdate(prevProps, prevState) {
        if (!this.props.options.get('show')) {
            return false;
        }

        const newState = this._calcPopoverPosition();

        if (prevState.popoverX !== newState.popoverX ||
            prevState.popoverY !== newState.popoverY ||
            prevState.arrowX !== newState.arrowX) {
            this.setState(newState);
        }
    }

    /**
     * Popover을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        var attendees = '';
        const event = this.props.options.get('event');
        const subject = event.has('summary') ? event.get('summary') : '';
        const description = event.has('description') ? event.get('description') : '';
        const creator = event.has('creator') ? event.get('creator').get('displayName') : '';
        const startTime = event.has('start') ? event.get('start').get('dateTime') : '';
        const endTime = event.has('end') ? event.get('end').get('dateTime') : '';
        const className = classnames({
            show: this.props.options.get('show'),
            'popover--hide-footer': !this.props.options.get('useButton')
        });

        if (event.has('attendees')) {
            attendees = event.get('attendees')
                .filter((a) => a.get('displayName'))
                .map((a) => `${a.get('displayName')}님`)
                .join(', ');
        }

        return (
            <div
                ref="popover"
                className={`popover ${this.state.direction} ${className}`}
                style={{left: `${this.state.popoverX}px`, top: `${this.state.popoverY}px`}}
            >
                <div className="arrow" style={{left: this.state.arrowX}}></div>
                <div className="popover-content">
                    <Header
                        subject={subject}
                        description={description}
                        onClickClose={this._onClickClose.bind(this)}
                    />
                    <Body start={startTime} end={endTime} creator={creator} attendees={attendees}/>
                    <Footer
                        onClickUpdate={this._onClickUpdate.bind(this)}
                        onClickRemove={this._onClickRemove.bind(this)}
                    />
                </div>
            </div>
        );
    }

    /**
     * 전달된 좌표를 기준으로 팝오버가 클릭한 위치에 놓일 수
     * 있도록 포지션을 재계산 한다.
     * @returns {{
     *     popoverX: number,
     *     popoverY: number,
     *     arrowX: string,
     *     direction: string
     * }}
     * @private
     */
    _calcPopoverPosition() {
        var popoverX = this.props.options.get('x');
        var popoverY = this.props.options.get('y');
        var arrowX = '';
        var direction = 'bottom';
        const windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        const popoverStyle = window.getComputedStyle(ReactDOM.findDOMNode(this.refs.popover));
        const popoverWidthHalf = parseInt(popoverStyle.width, 10) / 2;
        const popoverHeight = parseInt(popoverStyle.height, 10);

        if (windowWidth < popoverX + popoverWidthHalf) {
            const excessSize = popoverX + popoverWidthHalf - windowWidth;

            popoverX = popoverX - excessSize;
            arrowX = excessSize + popoverWidthHalf + 'px';
        }

        if (windowHeight < popoverY + popoverHeight) {
            popoverY = popoverY - popoverHeight;
            direction = 'top';
        }

        popoverX = popoverX - document.querySelector('.content').offsetLeft;
        popoverX = popoverX - popoverWidthHalf;
        popoverY = popoverY - document.querySelector('.content').offsetTop;

        return {popoverX, popoverY, arrowX, direction};
    }

    /**
     * 닫기 button의 click 이벤트 리스너
     * @private
     */
    _onClickClose() {
        dispatch({
            type: ACTIONS.POPOVER_MODE,
            value: {show: false}
        });
    }

    /**
     * Document의 click 이벤트 리스너
     * DOM의 관계를 분석해 팝오버를 닫아야하는지 판단한다.
     * @param {MouseEvent} event
     * @private
     */
    _onClickDocument(event) {
        const target = event.target || event.srcElement;
        const popover = ReactDOM.findDOMNode(this.refs.popover);
        var element = target;

        while (element && element.parentNode) {
            if (element.className.indexOf('reservation-card') !== -1 ||
                element === popover) {
                element = false;
            }

            element = element.parentNode;
        }

        if (element) {
            dispatch({
                type: ACTIONS.POPOVER_MODE,
                value: {show: false}
            });
        }
    }

    /**
     * Footer의 update 이벤트 리스너
     * @private
     */
    _onClickUpdate() {
        alert('아직 지원하지 않는 기능입니다.');
    }

    /**
     * Footer의 remove 이벤트 리스너
     * @private
     */
    _onClickRemove() {
        const event = this.props.options.get('event');

        dispatch({type: ACTIONS.LOADING_MODE, value: true});

        this.ajaxer.events.removeBy(event.get('id')).then(() => {
            return this.ajaxer.updateEvents(this.props.date);
        });
    }
}

/**
 * Popover의 Props 인터페이스 정의
 * @property {Immutable.Map} options
 * @property {string} date
 */
Popover.propTypes = {
    options: React.PropTypes.object.isRequired,
    date: React.PropTypes.string.isRequired
};

/**
 * Popover의 Props 기본값 정의
 */
Popover.defaultProps = {};

export default Popover;
