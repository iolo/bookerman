import React from 'react';

class Splitter extends React.Component {

    /**
     * Splitter을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        return (
            <div className="sidebar__splitter">
                <a
                    href="#"
                    className="sidebar__splitter-handle"
                    onClick={this.props.onClick}
                >
                    <span className="blind">사이드 바 닫기</span>
                </a>
            </div>
        );
    }
}

/**
 * Splitter의 Props 인터페이스 정의
 * @param {function?} onClick
 */
Splitter.propTypes = {
    onClick: React.PropTypes.func
};

export default Splitter;
