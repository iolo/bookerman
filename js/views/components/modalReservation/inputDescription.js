import React from 'react';

class InputDescription extends React.Component {

    /**
     * InputDescription의 생성자
     * @constructs
     * @param {InputDescription.propTypes} props
     */
    constructor(props) {
        super(props);

        this.state = {};
    }

    /**
     * InputDescription을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        return (
            <div className="form-group straight">
                <label>
                    <span>설명 :</span>
                    <textarea
                        className="form-control modal-reservation__description"
                        name="description" title="회의 주제 상세 설명"
                        rows="3"
                        placeholder="회의에 관한 상세한 설명을 입력해주세요."
                    ></textarea>
                </label>
            </div>
        );
    }
}

/**
 * InputDescription의 Props 인터페이스 정의
 */
InputDescription.propTypes = {};

/**
 * InputDescription의 Props 기본값 정의
 */
InputDescription.defaultProps = {};

export default InputDescription;
