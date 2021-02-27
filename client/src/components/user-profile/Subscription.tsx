import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { create, get_all, remove } from '../../actions/subscription';


class Subscription extends React.Component<any, any>
{
    componentDidMount()
    {
        this.props.get_all({ profile: this.props.user_id });
    }

    on_sub_click = (e:any) => 
    {
        e.preventDefault();
        const { subscription: { subscriptions }, auth, user_id } = this.props;

        if (!auth.is_authenticated) this.props.history.push('/login');
        else
        {
            const existed_sub = subscriptions.find((s:any) => s.subscriber === auth.user.id);

            if (existed_sub) this.props.remove(existed_sub._id);
            else this.props.create({ profile: user_id });
        }
    }

    render()
    {
        const { subscriptions, is_loading } = this.props.subscription;

        return !is_loading && (
                <button
                    className="btn btn-dark btn-block subscribe-btn"
                    onClick={this.on_sub_click}
                >
                    Subscribe | <i className="fa fa-users"></i> {subscriptions.length}
                </button>
        );
    }

    static propTypes: { 
        create: PropTypes.Validator<(...args: any[]) => any>; 
        get_all: PropTypes.Validator<(...args: any[]) => any>; 
        remove: PropTypes.Validator<(...args: any[]) => any>; 
        auth: PropTypes.Validator<object>; 
        subscription: PropTypes.Validator<object>; 
        user_id: PropTypes.Validator<string>; 
    };
}

Subscription.propTypes = {
    create: PropTypes.func.isRequired,
    get_all: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    subscription: PropTypes.object.isRequired,
    user_id: PropTypes.string.isRequired
}

const map_state_to_props = (state:any) => (
{ 
    auth: state.auth,
    subscription: state.subscription
});

export default connect(map_state_to_props, { create, get_all, remove })(withRouter(Subscription));