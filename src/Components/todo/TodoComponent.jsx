import {Component} from 'react'

class TodoComponent extends Component{
    render(){
        return(
            <div>
                <h1>Todo Component for id - {this.props.match.params.id}</h1>
            </div>
        )
    }
}

export default TodoComponent