import React from 'react';
import {Link} from 'react-router';

class Header extends React.Component {

    /**
     * Header을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        return (
            <div className="modal-header">
                <Link
                    role="button"
                    className="close"
                    aria-label="Close"
                    to={`/calendar/${this.props.date}`}
                >
                    <span aria-hidden="true">×</span>
                </Link>
                <h4 className="modal-title">회의실 예약</h4>
            </div>
        );
    }
}

/**
 * Header의 Props 인터페이스 정의
 * @param {string} date
 */
Header.propTypes = {
    date: React.PropTypes.string.isRequired
};

/**
 * Header의 Props 기본값 정의
 */
Header.defaultProps = {};

export default Header;
