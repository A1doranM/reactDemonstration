import React from 'react';

class Status extends React.Component {
    state = {
        status: this.props.status,
        editMode: false,
        title: 'yo'
    };

    activateEditMode = () => {
        this.setState({
            editMode: true,
        });
    };

    deactivateEditMode = () => {
        this.setState({
            editMode: false,
        });
        this.props.updateStatus(this.state.status)
    };

    componentDidUpdate(prevProps, prevState){
        if(prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            });
        }
    }

    onStatusChange = (e) =>{
        this.setState({
            status: e.currentTarget.value,
        });
    };

    render() {
        return (
            <div>
                {!this.state.editMode
                    ?
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.state.status || '----'}</span>
                    </div>
                    :
                    <div>
                        <input onChange={this.onStatusChange}
                               autoFocus={true}
                               onBlur={this.deactivateEditMode}
                               value={this.state.status}/>
                    </div>
                }
            </div>
        )
    }
}

export default Status;