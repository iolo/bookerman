import React from 'react';
import {Link} from 'react-router';

class Button extends React.Component {

    /**
     * Button을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        const type = this.props.type || 'next';
        const date = this.props.date.format('YYYY-MM-DD');
        const direction = type === 'next' ? 'right' : 'left';
        const text = type === 'next' ? '다음일자' : '이전일자';

        return (
            <div className={`date-navi__${type}`}>
                <Link role="button" className="date-navi__btn" to={`/calendar/${date}`}>
                    <i className={`glyphicon glyphicon-chevron-${direction}`}></i>
                    <span className="blind">{text}</span>
                </Link>
            </div>
        );
    }
}

/**
 * Button의 Props 인터페이스 정의
 * @property {?string} [type=next]
 * @property {moment} date
 */
Button.propTypes = {
    type: React.PropTypes.string,
    date: React.PropTypes.object.isRequired
};

/**
 * Button의 Props 기본값 정의
 */
Button.defaultProps = {};

export default Button;
