import React from 'react';

class Admission extends React.Component {

    /**
     * Admission을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        return (
            <div className="front__admission">
                <button
                    type="button"
                    className="btn btn-default"
                    onClick={this.props.onClick}
                >
                    앱 인증하기
                </button>
            </div>
        );
    }
}

export default Admission;
