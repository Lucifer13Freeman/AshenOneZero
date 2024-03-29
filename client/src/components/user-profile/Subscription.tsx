import React/*, { useEffect }*/ from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { create, get_all, remove } from '../../actions/subscription';


/*const Subscription = ({ create, get_all, remove, 
                        subscription: { subscriptions, is_loading }, 
                        auth, user_id, history }:any) =>
{
    useEffect(() => get_all({ profile: user_id }), []);

    const on_sub_click = (e:any) => 
    {
        e.preventDefault();

        if (!auth.is_authenticated) history.push('/login');
        else
        {
            const existed_sub = subscriptions.find((s:any) => s.subscriber === auth.user.id);

            if (existed_sub) remove(existed_sub._id);
            else create({ profile: user_id });
        }
    }
    
    return !is_loading && (

        <button
            className="btn btn-$primary_btn_color btn-block subscribe-btn"
            onClick={on_sub_click}
        >
            Subscribe | <i className="fa fa-users"></i> {subscriptions.length}
        </button>
    );
}*/

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
                className="btn btn-$primary_btn_color btn-block subscribe-btn"
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

const mapStateToProps = (state:any) => (
{ 
    auth: state.auth,
    subscription: state.subscription
});

export default connect(mapStateToProps, { create, get_all, remove })(withRouter(Subscription));