import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Quill from 'react-quill';

import { create_comment } from '../../actions/post';

class CommentForm extends React.Component<any, any>
{
    constructor(props: any)
    {
        super(props);
        this.state = { body: '' }
    }

    on_change_body = (body:any) => this.setState({ body });

    on_submit = (e:any) =>
    {
        e.preventDefault();
        const { body } = this.state;
        this.props.create_comment(this.props.post_id, { body });
        this.setState({ body: '' });
    }

    render()
    {
        return(
            <div className="card mb-4">
                <div className="card-body">
                    <form onSubmit={this.on_submit}>
                        <div className="form-group">
                            <Quill
                                placeholder="What do you think?"
                                theme="snow"
                                modules={{ toolbar: false }}
                                value={this.state.body}
                                onChange={this.on_change_body}
                            />
                        </div>
                        <div className="btn-group">
                            <button type="submit" className="btn btn-dark">Comment</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    static propTypes: { 
        create_comment: PropTypes.Validator<(...args: any[]) => any>; 
        auth: PropTypes.Validator<object>; 
        post_id: PropTypes.Validator<string>; 
    };
}

CommentForm.propTypes = {
    create_comment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    post_id: PropTypes.string.isRequired
}

const map_state_to_props = (state:any) => ({ auth: state.auth });

export default connect(map_state_to_props, { create_comment })(CommentForm);