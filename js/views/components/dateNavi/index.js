import React from 'react';
import moment from 'moment';
import Button from './button';
import Display from './display';

class DateNavi extends React.Component {

    /**
     * DateNavi을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        const current = moment(this.props.current);
        const prev = current.clone().subtract(1, 'days');
        const next = current.clone().add(1, 'days');

        return (
            <div className="date-navi">
                <h2 className="blind">예약 일자 선택</h2>
                <div className="date-navi__body clear">
                    <Button type="prev" date={prev}/>
                    <Display date={current}/>
                    <Button type="next" date={next}/>
                </div>
            </div>
        );
    }
}

/**
 * DateNavi의 Props 인터페이스 정의
 * @property {string} current
 */
DateNavi.propTypes = {
    current: React.PropTypes.string.isRequired
};

/**
 * DateNavi의 Props 기본값 정의
 */
DateNavi.defaultProps = {};

export default DateNavi;
