import React from 'react';

class Footer extends React.Component {

    /**
     * Footer을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        return (
            <div className="modal-footer">
                <button type="button" className="btn btn-default" onClick={this.props.onCancel}>취소</button>
                <button type="submit" className="btn btn-default text-primary">예약하기</button>
            </div>
        );
    }
}

/**
 * Footer의 Props 인터페이스 정의
 * @property {?function} onCancel
 */
Footer.propTypes = {
    onCancel: React.PropTypes.func
};

/**
 * Footer의 Props 기본값 정의
 */
Footer.defaultProps = {};

export default Footer;
