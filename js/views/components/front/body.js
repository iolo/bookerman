import React from 'react';

class Body extends React.Component {

    /**
     * Body을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        return (
            <div className="front__body">
                {this.props.children}
            </div>
        );
    }
}

export default Body;
