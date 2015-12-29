import React from 'react';
import {Link} from 'react-router';

class NotFound extends React.Component {

    /**
     * NotFound을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        return (
            <div className="not-found">
                <h1 className="not-found__title">Oops!</h1>
                <h3 className="not-found__sub-title">404 Not Found</h3>
                <p className="not-found__description">Sorry, an error has occured, Requested page not found!</p>
                <Link className="not-found__link btn btn-primary" to="/">메인으로 가기</Link>
            </div>
        );
    }
}

export default NotFound;
