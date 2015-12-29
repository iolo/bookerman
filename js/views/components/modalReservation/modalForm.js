import React from 'react';
import ReactDOM from 'react-dom';
import serialize from 'form-serialize';

class ModalForm extends React.Component {

    /**
     * ModalForm을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        return (
            <form action="" method="POST" ref="form" onSubmit={this._onSubmit.bind(this)}>
                {this.props.children}
            </form>
        );
    }

    /**
     * form 엘리먼트의 submit 이벤트 리스너
     * @param {SyntheticEvent|Event} event
     * @private
     */
    _onSubmit(event) {
        event.preventDefault();

        if (this.props.onSubmit) {
            const form = ReactDOM.findDOMNode(this.refs.form);
            const json = serialize(form, {hash: true});

            this.props.onSubmit(json);
        }
    }
}

/**
 * ModalForm의 Props 인터페이스 정의
 * @property {?function} onSubmit
 */
ModalForm.propTypes = {
    onSubmit: React.PropTypes.func
};

/**
 * ModalForm의 Props 기본값 정의
 */
ModalForm.defaultProps = {};

export default ModalForm;
