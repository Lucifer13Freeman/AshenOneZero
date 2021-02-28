import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { get_all as get_all_subscriptions } from '../../actions/subscription';
import Loader from '../shared/loader/Loader';
import Posts from '../shared/Posts';


const Feed = ({ get_all_subscriptions, auth, subscription: { is_loading, subscriptions }}:any) =>
{
    useEffect(() => get_all_subscriptions({ subscriber: auth.user.id }), []);

    return !is_loading ? (
        <div className="row mt-4">
            <div className="col-md-6 mx-auto">
                {subscriptions.length !== 0 ? (
                    <Posts query_params={{
                        users: subscriptions.map((s:any) => s.profile).join(',')
                    }} />
                ) : (
                    <div className="text-center">
                        <h2>You have no subscriptions</h2>
                    </div>
                )}
            </div>
        </div>
    ) : <Loader /> 
}

Feed.propTypes = {
    get_all_subscriptions: PropTypes.func.isRequired,
    subscription: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state:any) => (
{ 
    subscription: state.subscription,
    auth: state.auth 
});

export default connect(mapStateToProps, { get_all_subscriptions })(Feed);