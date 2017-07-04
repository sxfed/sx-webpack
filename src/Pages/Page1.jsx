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

class Page1 extends PublicComponent {

    render() {

        return (
            <div>
                Page1
            </div>
        )
    }
}

export default PublicContainer(mapStateToProps, mapDispatchToProps,Page1);
