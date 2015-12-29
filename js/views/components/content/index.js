import React from 'react';
import classnames from 'classnames';

class Content extends React.Component {

    /**
     * Content을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        var extend = classnames({
            'content--extend': this.props.extend
        });

        return (
            <article className={`content ${extend}`}>
                <div className="content__inner">
                    {this.props.children}
                </div>
            </article>
        );
    }
}

export default Content;
