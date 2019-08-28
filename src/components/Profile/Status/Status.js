import React from 'react';

class Status extends React.Component{
    state = {
        editMode: false,
        title: 'yo'
    };

    activateEditMode = () =>{
        this.setState({
            editMode: true,
        })
    };

    deactivateEditMode = () =>{
        this.setState({
            editMode: false,
        })
    };

    render() {
        alert(this.props.status);
        return (
            <div>
                {!this.state.editMode
                    ?
                <div>
                    <span onDoubleClick={this.activateEditMode}>{this.props.status}</span>
                </div>
                    :
                <div>
                    <input autoFocus={true} onBlur={this.deactivateEditMode} value={this.props.status}/>
                </div>
                }
            </div>
        )
    }
}

export default Status;