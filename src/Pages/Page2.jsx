import React from 'react';

import {PublicContainer,PublicComponent} from '../ParentComponent/PublicComponent';

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

class Page2 extends PublicComponent {

    render() {

        return (
            <div>
                Page2
            </div>
        )
    }
}

export default PublicContainer(mapStateToProps, mapDispatchToProps,Page2);
