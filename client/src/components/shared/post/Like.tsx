import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { create_like, remove_like } from '../../../actions/post';


const Like = ({ auth, post_id, likes, TYPE, remove_like, create_like }:any) =>
{
    const on_like_click = (e:any) =>
    {
        e.preventDefault();
        
        if (auth.is_authenticated)
        {
            const existed_like = likes.find((l:any) => l.user === auth.user.id);

            if (existed_like) remove_like(post_id, existed_like._id, TYPE);
            else create_like(post_id, TYPE);
        }
    }

    return (
        
        <a
            href="#" role="button"
            className="card-link" onClick={on_like_click}
        >
            <i className="fa fa-heart"></i> {likes.length}
        </a>
    );
}

Like.propTypes = {
    create_like: PropTypes.func.isRequired,
    remove_like: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    post_id: PropTypes.string.isRequired,
    likes: PropTypes.array.isRequired,
    TYPE: PropTypes.string.isRequired
}

const mapStateToProps = (state:any) => ({ auth: state.auth });

export default connect(mapStateToProps, { create_like, remove_like })(Like);