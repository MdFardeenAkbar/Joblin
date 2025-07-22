import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utility/hooks";
import { useMutation } from "@apollo/react-hooks";
import {gql} from "graphql-tag";
import { useNavigate } from "react-router-dom";
import { TextField , Button , Container , Stack , Alert } from "@mui/material"


const SIGN_UP_QUERY = gql`
    mutation Mutation($sign_up_details:SignUpDetails) {
        signUp(sign_up_details:$sign_up_details){
            email
            role
            username
            token
        }
    }
`;

function SignUp(props) {
    const context = useContext(AuthContext);
    let navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    function registerUserCallback() {
        console.log("Callback called back");
        signUp();
    }

    const { onChange, onSubmit, values } = useForm(registerUserCallback,{
        id:'',
        username:'',
        email:'',
        password:'',
        role:''
    })

    const [signUp, {loading}] = useMutation(SIGN_UP_QUERY, {
        update(proxy, {data : {signUp:userData}}) {
            context.login(userData);
            navigate('/dashboard');
        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors);
        },
        variables: {sign_up_details: values}
    })

    return (
        <Container spacing={2} maxWidth="sm">
            <h3>SignUp</h3>
            <p>Sign Up for your account here</p>
            <Stack spacing={2} paddingBottom={1}>
                <TextField 
                    label="ID"
                    name="id"
                    onChange={onChange}
                />
                <TextField 
                    label="Username"
                    name="username"
                    onChange={onChange}
                />
                <TextField 
                    label="E-mail"
                    name="email"
                    onChange={onChange}
                />
                <TextField 
                    label="Password"
                    name="password"
                    onChange={onChange}
                />
                <TextField 
                    label="Role"
                    name="role"
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

export default SignUp;