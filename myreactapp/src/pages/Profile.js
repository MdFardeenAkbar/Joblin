import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
//import { useForm } from "../utility/hooks";
import { useQuery , gql } from "@apollo/client";
//import {gql} from "graphql-tag";
//import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material"

const JOB_QUERY = gql`
    query getuser($getUserProfileId: ID!) {
        getUserProfile(id: $getUserProfileId) {
            email
            id
            role
            username
        }
    }
`;

function Profile(props) {
    const { user } = useContext(AuthContext);
    //let navigate = useNavigate();
    const [displayData,setDisplayData] = useState([])
    //const [errors, setErrors] = useState([]);

    /* const { onChange, onSubmit, values } = useForm(RegisterUserCallback,{
        location:'',
        salaryRange:'',
    })
 */
    const {data,refetch} = useQuery(JOB_QUERY,{variables: {
            "getUserProfileId":user.id
      },
    onCompleted: (querydata) => {
        console.log(querydata)
        setDisplayData(querydata.getUserProfile)
    },
    onError: (errordata) => {
        console.log(errordata)
    }}
    )
    //const {loading,error,data,refetch} = useQuery(JOB_QUERY)

    console.log("please")
    console.log(data)
    console.log("please")
    
    
    
    
    /* function RegisterUserCallback() {
        console.log("Callback called back");
    } */
    refetch();
        return (  
                <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 2 }}
                >
                    <h2>User Profile</h2>
                    <p>
                        Name: {displayData.username}<br />
                        email:{displayData.email}
                    </p>
                </Box>
        )    
}

export default Profile;