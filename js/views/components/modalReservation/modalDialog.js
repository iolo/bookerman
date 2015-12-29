import React from 'react';
import classnames from 'classnames';

class ModalDialog extends React.Component {

    /**
     * ModalDialog을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        const show = classnames({
            show: this.props.show
        });

        return (
            <div className={`modal-reservation ${show}`}>
                <div className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            {this.props.children}
                        </div>
                    </div>
                </div>
                <div className="modal-backdrop"></div>
            </div>
        );
    }
}

/**
 * ModalDialog의 Props 인터페이스 정의
 * @property {boolean} show
 */
ModalDialog.propTypes = {
    show: React.PropTypes.bool
};

/**
 * ModalDialog의 Props 기본값 정의
 */
ModalDialog.defaultProps = {};

export default ModalDialog;
