import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PostForm from '../shared/PostForm';
import Posts from '../shared/Posts';


const AllPosts = ({ auth }:any) => (
    
    <div className="row mt-4">
        <div className="col-md-6 mx-auto">
            {auth.is_authenticated && <PostForm />}
            <Posts query_params={{}} />
        </div>
    </div>
);

AllPosts.propTypes = { auth: PropTypes.object.isRequired }

const mapStateToProps = (state:any) => ({ auth: state.auth });

export default connect(mapStateToProps)(AllPosts);