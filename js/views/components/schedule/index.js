import React from 'react';

class Schedule extends React.Component {

    /**
     * Schedule을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        return (
            <div className="schedule">
                <div className="schedule__inner">
                    <div className="schedule__room-types">
                        {this.props.children[0]}
                    </div>
                    <div className="schedule__timeline">
                        {this.props.children[1]}
                    </div>
                </div>
            </div>
        );
    }
}

export default Schedule;
