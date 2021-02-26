import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { get_all as get_all_subscriptions } from '../../actions/subscription';
import Loader from '../shared/loader/Loader';
import Posts from '../shared/Posts';

class Feed extends React.Component<any, any>
{
    componentDidMount()
    {
        this.props.get_all_subscriptions(
        {
            subscriber: this.props.auth.user.id
        });
    }

    render()
    {
        const { is_loading, subscriptions } = this.props.subscription;

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

    static propTypes: { 
        get_all_subscriptions: PropTypes.Validator<(...args: any[]) => any>; 
        subscription: PropTypes.Validator<object>; 
        auth: PropTypes.Validator<object>; 
    };
}

Feed.propTypes = {
    get_all_subscriptions: PropTypes.func.isRequired,
    subscription: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const map_state_to_props = (state:any) => (
{ 
    subscription: state.subscription,
    auth: state.auth 
});

export default connect(map_state_to_props, { get_all_subscriptions })(Feed);