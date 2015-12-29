import React from 'react';

class Header extends React.Component {

    /**
     * Header을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        return (
            <div className="front__header">
                <h1 className="front__title">
                    회의실 예약 시스템에 오신 것을 환영합니다.
                </h1>
                <p className="front__description">
                    레진엔터테인먼트의 회의실 예약 시스템은 좀 더 편리하고 효율적으로
                    회의실을 예약할 수 있도록 하기 위해 만들어졌습니다.
                </p>
            </div>
        );
    }
}

export default Header;
