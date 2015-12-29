import React from 'react';

class Section extends React.Component {

    /**
     * Section을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        return (
            <div className="sidebar__section">
                <h2 className="blind">달력에서 예약 일자 선택</h2>
                {this.props.children}
            </div>
        );
    }
}

export default Section;
