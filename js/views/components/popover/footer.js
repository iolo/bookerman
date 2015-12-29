import React from 'react';

class Footer extends React.Component {

    /**
     * Footer을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        return (
            <div className="popover__footer">
                <button
                    className="btn btn-primary"
                    type="button"
                    onClick={this.props.onClickUpdate}
                >
                    수정
                </button>
                <button
                    className="btn btn-danger"
                    type="button"
                    onClick={this.props.onClickRemove}
                >
                    삭제
                </button>
            </div>
        );
    }
}

/**
 * Footer의 Props 인터페이스 정의
 * @property {?function} onClickUpdate
 * @property {?function} onClickRemove
 */
Footer.propTypes = {
    onClickUpdate: React.PropTypes.func,
    onClickRemove: React.PropTypes.func
};

/**
 * Footer의 Props 기본값 정의
 */
Footer.defaultProps = {};

export default Footer;
