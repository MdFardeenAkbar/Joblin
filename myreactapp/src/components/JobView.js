import {useState } from "react";
//import { AuthContext } from "../context/authContext";
import { useForm } from "../utility/hooks";
import { useLazyQuery , gql } from "@apollo/client";
//import {gql} from "graphql-tag";
//import { useNavigate } from "react-router-dom";
import { TextField , Button , Container , Stack , Alert } from "@mui/material"
import JobItem from "./JobItem";
//import { Box , Card , CardContent , CardActions , Typography } from '@mui/material/';

const JOB_QUERY = gql`
    query GetJobs($jobSearch: JobSearch) {
        getJobs(job_search: $jobSearch) {
            id
            company
            description
            salary
            title
            location
        }
    }
`;

function JobView(props) {
    //const context = useContext(AuthContext);
    //let navigate = useNavigate();
    const [displayData,setDisplayData] = useState([])
    const [errors, setErrors] = useState([]);

    const { onChange, onSubmit, values } = useForm(RegisterUserCallback,{
        location:'',
        salaryRange:'',
    })

    const [getJobData , {data}] = useLazyQuery(JOB_QUERY,{variables: {
        "jobSearch": {
          "location": "",
        "salaryRange": "0-10000000"
        }
      },
    onCompleted: (querydata) => {
        console.log(querydata)
        setDisplayData(querydata.getJobs)
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
        getJobData({variables : {"jobSearch": values }})
    }

        return (
          <div>
            <Container spacing={2} maxWidth="sm">
              <h3>Recently Posted Jobs</h3>
              <p>Search</p>
              <Stack spacing={2} paddingBottom={1}>
                <TextField
                  label="Location"
                  name="location"
                  onChange={onChange}
                />
                <TextField
                  label="Salary Range"
                  name="salaryRange"
                  onChange={onChange}
                />
              </Stack>
              {errors.map(function (error, i) {
                return (
                  <Alert severity="error" key={i}>
                    client {error.message}
                  </Alert>
                );
              })}
              <Button variant="contained" onClick={onSubmit}>
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
                  />
                ))}
              </Stack>
            </Container>
          </div>
        );    
}

export default JobView;