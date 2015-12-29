import React from 'react';
import classnames from 'classnames';

class ReservationCard extends React.Component {

    /**
     * ReservationCard을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        const term = this.props.start.format('HH:mm') + ' ~ ' + this.props.end.format('HH:mm');
        const mine = classnames({
            'reservation-card--mine': this.props.mine
        });

        return (
            <div className={`reservation-card ${mine} ellipsis br-top br-bottom`}>
                <div className="reservation-card__inner">
                    <a
                        href="#"
                        role="button"
                        className="reservation-card__link"
                        onClick={this._onClickLink.bind(this)}
                    >
                        <p className="reservation-card__subject ellipsis">
                            <i className="reservation-card__icon-circle"></i>
                            <span title={this.props.title}>{this.props.title}</span>
                        </p>
                        <ul className="reservation-card__details">
                            <li className="reservation-card__detail ellipsis">
                                <span title={term}>{term}</span>
                            </li>
                            {this.props.creator ? (
                            <li className="reservation-card__detail ellipsis">
                                <span title={`${this.props.creator}님 예약`}>
                                    {`${this.props.creator}님 예약`}
                                </span>
                            </li>
                            ) : ''}
                        </ul>
                    </a>
                </div>
            </div>
        );
    }

    /**
     * a 엘리먼트의 click 이벤트 리스너
     * @param {SyntheticMouseEvent|MouseEvent} event
     * @private
     */
    _onClickLink(event) {
        event.preventDefault();

        if (this.props.onClick) {
            this.props.onClick(this.props.id, event.pageX, event.pageY);
        }
    }
}

/**
 * ReservationCard의 Props 인터페이스 정의
 * @property {string} id
 * @property {string} title
 * @property {?string} creator
 * @property {moment} start
 * @property {moment} end
 * @property {?boolean} mine
 * @property {?function} onClick
 */
ReservationCard.propTypes = {
    id: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    creator: React.PropTypes.string,
    start: React.PropTypes.object.isRequired,
    end: React.PropTypes.object.isRequired,
    mine: React.PropTypes.bool,
    onClick: React.PropTypes.func
};

/**
 * ReservationCard의 Props 기본값 정의
 */
ReservationCard.defaultProps = {};

export default ReservationCard;
