import React from 'react';
import classnames from 'classnames';

class Preloader extends React.Component {

    /**
     * Preloader을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        const show = classnames({
            'show': this.props.show
        });

        return (
            <div className={`preloader ${show}`}>
                <div className="preloader__loader">
                    <span className="blind">불러오는 중...</span>
                </div>
                <div className="modal-backdrop transparent"></div>
            </div>
        );
    }
}

/**
 * Preloader의 Props 인터페이스 정의
 * @property {boolean} show
 */
Preloader.propTypes = {
    show: React.PropTypes.bool
};

/**
 * Preloader의 Props 기본값 정의
 * @property {boolean} show
 */
Preloader.defaultProps = {
    show: false
};

export default Preloader;
