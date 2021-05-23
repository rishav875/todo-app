import { ErrorMessage, Field, Form, Formik } from 'formik'
import moment from 'moment'
import {Component} from 'react'
import TodoDataService from '../../api/todo/TodoDataService'
import TodoService from '../../api/todo/TodoDataService'
import AuthenticatioService from './AuthenticationService'

class TodoComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            id: this.props.match.params.id,
            description: '',
            targetDate: moment(new Date()).format("YYYY-MM-DD")
        }
        this.onSubmit=this.onSubmit.bind(this)
        this.validate=this.validate.bind(this)

    }
    componentDidMount(){
        if(this.state.id===-1)
        return
        let username = AuthenticatioService.getLoggedInUser()
        TodoService.retrieveTodo(username,this.state.id)
        .then(Response=> this.setState({
            description: Response.data.description,
            targetDate: moment(Response.data.targetDate).format("YYYY-MM-DD")
        }))
    }
    validate(values){
        let errors ={}
        if(!values.description)
        errors.description="Enter a Description"
        else if(values.description.length<5)
        errors.description="Enter atleast 5 characters in Description"
       // console.log(values)
       if(!moment(values.targetDate,"YYYY-MM-DD").isValid()){
           errors.targetDate="Enter a valid Target Date"
       }
        return errors
    }
    onSubmit(values){
        let username = AuthenticatioService.getLoggedInUser()
        if(this.state.id===-1){
            TodoService.createTodo(username,{
                id: this.state.id,
                description: values.description,
                targetDate: values.targetDate
            }).then(()=>this.props.history.push('/todos'))
        }else{
        console.log(values)
        
        TodoDataService.updateTodo(username,this.state.id,{
            id: this.state.id,
            //"username": username,
            description: values.description,
            targetDate: values.targetDate,
           //"done": false

        })
        //console.log(values)
        //console.log(this.state.id)
        //Redirecting to todos page
        .then(()=>this.props.history.push('/todos'))
    }
    }
    render(){
        // let description = this.state.description
        // let targetDate = this.state.targetDate
        let {description,targetDate}=this.state
        return(
            <div>
                <h1>Todo</h1>
                <h2>Todo Component for id - {this.props.match.params.id}</h2>
                <div className="container">
                <Formik 
                initialValues={{description,targetDate}} 
                onSubmit={this.onSubmit}
                validateOnBlur={false}
                //validateOnChange={false}
                validate={this.validate}
                enableReinitialize={true}
                >
                    {
                        (props)=>(
                            <Form>
                                <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                                <fieldset className="form-group">

                                    <label>Description</label>
                                    <Field className="form-control" type="text" name="description"/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field className="form-control" type="date" name="targetDate"/>
                                </fieldset>
                                <button className="btn btn-success" type="submit">Submit</button>
                            </Form>
                        )
                    }
                </Formik>

                </div>
            </div>
        )
    }
}

export default TodoComponent