import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utility/hooks";
import { useMutation } from "@apollo/react-hooks";
import {gql} from "graphql-tag";
import { useNavigate } from "react-router-dom";
import { TextField , Button , Container , Stack , Alert } from "@mui/material"

const SIGN_IN_QUERY = gql`
    mutation Mutation($sign_in_details:SignInDetails) {
        signIn(sign_in_details:$sign_in_details){
            email
            role
            username
            token
        }
    }
`;

function SignIn(props) {
    const context = useContext(AuthContext);
    let navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    function registerUserCallback() {
        console.log("Callback called back");
        signIn();
    }

    const { onChange, onSubmit, values } = useForm(registerUserCallback,{
        email:'',
        password:'',
    })

    const [signIn, {loading}] = useMutation(SIGN_IN_QUERY, {
            update(proxy, {data : {signIn:userData}}) {
                context.login(userData);
                navigate('/dashboard/');
            },
            onError({ graphQLErrors }) {
                setErrors(graphQLErrors);
            },
            variables: {sign_in_details: values}
        })
        return (
            <Container spacing={2} maxWidth="sm">
                <h3>SignIn</h3>
                <p>Sign In to your account here</p>
                <Stack spacing={2} paddingBottom={1}>
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

export default SignIn;