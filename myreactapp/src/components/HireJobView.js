import { useContext,useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utility/hooks";
import { useLazyQuery , gql } from "@apollo/client";
//import {gql} from "graphql-tag";
//import { useNavigate } from "react-router-dom";
import { TextField , Button , Container , Stack , Alert } from "@mui/material"
import JobItem from "./JobItem";
//import { Box , Card , CardContent , CardActions , Typography } from '@mui/material/';

const JOB_QUERY = gql`
    query GetJobsPostedBy($userId: ID!) {
        getJobsPostedBy(user_id: $userId) {
            id
            company
            description
            salary
            title
            location
        }
    }
`;

function HireJobView(props) {
    const {user} = useContext(AuthContext);
    //let navigate = useNavigate();
    const [displayData,setDisplayData] = useState([])
    const [errors, setErrors] = useState([]);


    const [getJobData , {data}] = useLazyQuery(JOB_QUERY,{variables: {
        "userId": user.id
      },
    onCompleted: (querydata) => {
        console.log(querydata)
        setDisplayData(querydata.getJobsPostedBy)
    },
    onError: (errordata) => {
        setErrors(errordata)
        console.log(errordata)
    }}
    )
    //const {loading,error,data,refetch} = useQuery(JOB_QUERY)

    console.log("please")
    console.log(data)
    console.log("please")
    
    
    function RegisterUserCallback() {
        console.log("Callback called back");
        getJobData()
    }

        return (
          <div>
            <Container spacing={2} maxWidth="sm">
              <h3>Posted Jobs</h3>
              <Button variant="contained" onClick={RegisterUserCallback}>
                Submit
              </Button>
              <Stack spacing={2}>
                {displayData.map((item, index) => (
                  <JobItem
                    jid={item.id}
                    title={item.title}
                    company={item.company}
                    location={item.location}
                    salary={item.salary}
                    description={item.description}
                    key={index}
                    showHire={false}
                  />
                ))}
              </Stack>
            </Container>
          </div>
        );    
}

export default HireJobView;