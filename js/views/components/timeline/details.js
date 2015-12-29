import React from 'react';
import moment from 'moment';
import ReservationCard from '../reservationCard';

class Details extends React.Component {

    /**
     * Details을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        const signedUserEmail = this.props.profile.get('email') || '';
        const reservationCards = [];

        this.props.events.forEach((event) => {
            const title = event.get('summary');
            const creator = event.get('creator').get('displayName');
            const creatorEmail = event.get('creator').get('email');
            const startTime = moment(event.get('start').get('dateTime'));
            const endTime = moment(event.get('end').get('dateTime'));
            const indexTop = this.props.timeRange.indexOf(startTime.format('HH:mm'));
            const indexBottom = this.props.timeRange.indexOf(endTime.format('HH:mm'));
            const style = {
                top: this.props.heightRatio * indexTop - 0.1645 + '%',
                height: this.props.heightRatio * (indexBottom - indexTop) + 0.1645 + '%'
            };

            reservationCards.push(
                <li key={event.get('id')} className="timeline__detail" style={style}>
                    <ReservationCard
                        id={event.get('id')}
                        title={title}
                        start={startTime}
                        end={endTime}
                        creator={creator}
                        mine={creatorEmail === signedUserEmail}
                        onClick={this.props.onClick}
                    />
                </li>
            );
        });

        return (
            <ul className="timeline__details">
                {reservationCards}
            </ul>
        );
    }
}

/**
 * Details의 Props 인터페이스 정의
 * @property {Array.<string>} timeRange
 * @property {Immutable.List} events
 * @property {Immutable.Map} profile
 * @property {?function} onClick
 */
Details.propTypes = {
    timeRange: React.PropTypes.array.isRequired,
    events: React.PropTypes.object.isRequired,
    profile: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func
};

/**
 * Details의 Props 기본값 정의
 */
Details.defaultProps = {};

export default Details;
