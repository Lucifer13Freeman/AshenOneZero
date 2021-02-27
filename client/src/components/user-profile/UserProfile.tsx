import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { get_by_id as get_user_by_id } from '../../actions/user';
import Loader from '../shared/loader/Loader';
import PostForm from '../shared/PostForm';
import Posts from '../shared/Posts';
import ProfileImage from '../shared/ProfileImage';
import Subscription from './Subscription';


const UserProfile = ({ get_user_by_id, match, history, auth, user: { user, is_loading }}:any) =>
{
    useEffect(() => get_user_by_id(match.params.id, history), []);

    return !is_loading && user !== null ? (
        <React.Fragment>
            <div className="row mt-5">
                <div className="col-md-6 mx-auto">
                    <div className="row">
                        <div className="col-8">
                            <h2 className="profile-username">
                                {user.surname + ' ' + 
                                user.name + ' ' + 
                                user.patronymic}
                            </h2>
                            <p>
                                <strong>Registered: </strong>
                                {new Date(user.created_date).toDateString()}
                            </p>
                        </div>
                        <div className="col-4 text-center">
                            <ProfileImage user={user} />
                        </div>
                    </div>
                </div>
            </div>
            {!(auth.user.id === user._id) && (
                <div className="row mt-4">
                    <div className="col-md-12 text-center">
                        <div className="col-4 mx-auto">
                            <Subscription user_id={user._id} />
                        </div>
                    </div>
                </div>
            )}
            <div className="row mt-4">
                <div className="col-md-6 mx-auto">
                    {auth.user.id === user._id && <PostForm />}
                    <Posts query_params={{ user: user._id }} />
                </div>
            </div>
        </React.Fragment>
    ) : <Loader />
}


/*class UserProfile extends React.Component<any, any>
{
    componentDidMount()
    {
        this.props.get_user_by_id(this.props.match.params.id);
    }

    UNSAFE_componentWillReceiveProps(nextProps:any)
    {
        if (!nextProps.user.is_loading && nextProps.user.user === null) this.props.history.push('/404');
    }

    render()
    {
        const { user: { user, is_loading}, auth } = this.props;

        return !is_loading && user !== null ? (
                    <React.Fragment>
                        <div className="row mt-5">
                            <div className="col-md-6 mx-auto">
                                <div className="row">
                                    <div className="col-8">
                                        <h2 className="profile-username">
                                            {user.surname + ' ' + 
                                            user.name + ' ' + 
                                            user.patronymic}
                                        </h2>
                                        <p>
                                            <strong>Registered: </strong>
                                            {new Date(user.created_date).toDateString()}
                                        </p>
                                    </div>
                                    <div className="col-4 text-center">
                                        <ProfileImage user={user} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {!(auth.user.id === user._id) && (
                            <div className="row mt-4">
                                <div className="col-md-12 text-center">
                                    <div className="col-4 mx-auto">
                                        <Subscription user_id={user._id} />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="row mt-4">
                            <div className="col-md-6 mx-auto">
                                {auth.user.id === user._id && <PostForm />}
                                <Posts query_params={{ user: user._id }} />
                            </div>
                        </div>
                    </React.Fragment>
                ) : <Loader />
    }

    static propTypes: { 
        get_user_by_id: PropTypes.Validator<(...args: any[]) => any>; 
        user: PropTypes.Validator<object>; 
        auth: PropTypes.Validator<object>; 
    };
}*/

UserProfile.propTypes = {
    get_user_by_id: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const map_state_to_props = (state:any) => (
{ 
    user: state.user,
    auth: state.auth 
});

export default connect(map_state_to_props, { get_user_by_id })(UserProfile);