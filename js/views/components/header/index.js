import React from 'react';
import DateNavi from '../dateNavi';

class Header extends React.Component {

    /**
     * Header을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        return (
            <header className="header">
                <div className="header__inner">
                    <div className="header__title">
                        <h1 className="blind">신사옥 회의실 예약 시스템</h1>
                    </div>
                    <div className="header__date-navi">
                        <DateNavi current={this.props.date}/>
                    </div>
                </div>
            </header>
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
