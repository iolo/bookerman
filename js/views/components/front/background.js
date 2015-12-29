import React from 'react';

class Background extends React.Component {

    /**
     * Background을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        return (
            <div className="front__background">
                <div className="front__mask"></div>
                <img src="/static/img/bg_cloud.jpg" alt="대문 그림"/>
            </div>
        );
    }
}

export default Background;
