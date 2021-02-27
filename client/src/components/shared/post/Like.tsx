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

/*class Like extends React.Component<any, any>
{
    on_like_click = (e:any) =>
    {
        e.preventDefault();
        const { auth, post_id, likes, TYPE } = this.props;

        if (auth.is_authenticated)
        {
            const existed_like = likes.find((l:any) => l.user === auth.user.id);

            if (existed_like) this.props.remove_like(post_id, existed_like._id, TYPE);
            else this.props.create_like(post_id, TYPE);
        }
    }

    render() 
    {
        const { likes } = this.props;
        return (
            <a
                href="#" role="button"
                className="card-link" onClick={this.on_like_click}
            >
                <i className="fa fa-heart"></i> {likes.length}
            </a>
        );
    }

    static propTypes: { 
        create_like: PropTypes.Validator<(...args: any[]) => any>; 
        remove_like: PropTypes.Validator<(...args: any[]) => any>; 
        auth: PropTypes.Validator<object>; 
        post_id: PropTypes.Validator<string>; 
        likes: PropTypes.Validator<any[]>; 
        TYPE: PropTypes.Validator<string>; 
    };
}*/

Like.propTypes = {
    create_like: PropTypes.func.isRequired,
    remove_like: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    post_id: PropTypes.string.isRequired,
    likes: PropTypes.array.isRequired,
    TYPE: PropTypes.string.isRequired
}

const map_state_to_props = (state:any) => ({ auth: state.auth });

export default connect(map_state_to_props, { create_like, remove_like })(Like);