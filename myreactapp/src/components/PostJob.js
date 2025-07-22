import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utility/hooks";
import { useMutation } from "@apollo/react-hooks";
import {gql} from "graphql-tag";
import { useNavigate } from "react-router-dom";
import { TextField , Button , Container , Stack , Alert } from "@mui/material"


const POST_JOB_QUERY = gql`
    mutation PostJob($jobDetails: JobDetails) {
        postJob(job_details: $jobDetails) {
            company
            description
            id
            location
            salary
            title
        }
    }   
`;

function PostJob(props) {
    const context = useContext(AuthContext);
    let navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    function registerUserCallback() {
        console.log("Callback called back");
        postJob();
    }

    const { onChange, onSubmit, values } = useForm(registerUserCallback,{
        company:'',
        description:'',
        location:'',
        salary:'',
        title:''
    })

    const [postJob, {loading}] = useMutation(POST_JOB_QUERY, {
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors);
        },
        variables: {
            "jobDetails": values
        }
    })

    return (
        <Container spacing={2} maxWidth="sm">
            <h3>Post a Job</h3>
            <Stack spacing={2} paddingBottom={1}>
                <TextField 
                    label="Company"
                    name="company"
                    onChange={onChange}
                />
                <TextField 
                    label="Description"
                    name="description"
                    onChange={onChange}
                />
                <TextField 
                    label="Location"
                    name="location"
                    onChange={onChange}
                />
                <TextField 
                    label="Salary"
                    name="salary"
                    onChange={onChange}
                />
                <TextField 
                    label="Title"
                    name="title"
                    onChange={onChange}
                />
            </Stack>
            {errors.map(function(error,i){
                return (
                    <Alert severity="error" key={i}>
                        {error.message}
                    </Alert>
                )
            })}
            <Button variant="contained" onClick={onSubmit}>Submit</Button>
        </Container>
    )
}

export default PostJob;