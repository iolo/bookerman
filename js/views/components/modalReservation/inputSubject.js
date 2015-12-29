import React from 'react';

class InputSubject extends React.Component {

    /**
     * InputSubject의 생성자
     * @constructs
     * @param {InputSubject.propTypes} props
     */
    constructor(props) {
        super(props);

        this.state = {};
    }

    /**
     * InputSubject을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        return (
            <div className="form-group straight">
                <label>
                    <span>주제 :</span>
                    <input
                        className="form-control modal-reservation__subject"
                        name="subject"
                        placeholder="회의 주제를 입력해주세요."
                        type="text"
                    />
                </label>
            </div>
        );
    }
}

/**
 * InputSubject의 Props 인터페이스 정의
 */
InputSubject.propTypes = {};

/**
 * InputSubject의 Props 기본값 정의
 */
InputSubject.defaultProps = {};

export default InputSubject;
