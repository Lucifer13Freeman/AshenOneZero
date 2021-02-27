import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Quill from 'react-quill';
import DOMPurify from 'dompurify';

import { create } from '../../actions/post';


const PostForm = ({ create }:any) =>
{
    const [body, set_body] = useState('');

    const on_submit = (e:any) =>
    {
        e.preventDefault();
        create({ body });
        set_body('');
    }

    return(

        <div className="card mb-4">
            <div className="card-body">
                <form onSubmit={on_submit}>
                    <div className="form-group">
                        <Quill
                            placeholder="What's up?"
                            theme="snow"
                            modules={{
                                toolbar: [
                                    ['bold', 'italic', 'underline', 'strike'],
                                    ['link', 'image', 'video'],
                                    ['clean']
                                ]
                            }}
                            value={body}
                            onChange={value => set_body(DOMPurify.sanitize(value))}
                        />
                    </div>
                    <div className="btn-group float-right">
                        <button type="submit" className="btn btn-dark">Share</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

/*class PostForm extends React.Component<any, any>
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
        this.props.create(this.state);
        this.setState({ body: '' });
    }
    
    render() {
        return(
            <div className="card mb-4">
                <div className="card-body">
                    <form onSubmit={this.on_submit}>
                        <div className="form-group">
                            <Quill
                                placeholder="What's up?"
                                theme="snow"
                                modules={{
                                    toolbar: [
                                        ['bold', 'italic', 'underline', 'strike'],
                                        ['link', 'image', 'video'],
                                        ['clean']
                                    ]
                                }}
                                value={this.state.body}
                                onChange={this.on_change_body}
                            />
                        </div>
                        <div className="btn-group float-right">
                            <button type="submit" className="btn btn-dark">Share</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    static propTypes: { 
        create: PropTypes.Validator<(...args: any[]) => any>; 
        auth: PropTypes.Validator<object>; 
    };
    
}*/

PostForm.propTypes = {
    create: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const map_state_to_props = (state:any) => ({ auth: state.auth });

export default connect(map_state_to_props, { create })(PostForm);