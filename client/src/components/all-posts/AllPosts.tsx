import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PostForm from '../shared/PostForm';
import Posts from '../shared/Posts';

class AllPosts extends React.Component<any, any>
{
    render() 
    {
        const { auth } = this.props;

        return (
            <div className="row mt-4">
                <div className="col-md-6 mx-auto">
                    {auth.is_authenticated && <PostForm />}
                    <Posts query_params={{}} />
                </div>
            </div>
        );
    }

    static propTypes: { auth: PropTypes.Validator<object>; };
}

AllPosts.propTypes = { auth: PropTypes.object.isRequired }

const map_state_to_props = (state:any) => ({ auth: state.auth });

export default connect(map_state_to_props)(AllPosts);