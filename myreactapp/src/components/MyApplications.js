import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utility/hooks";
import { useQuery , useLazyQuery , gql } from "@apollo/client";
//import {gql} from "graphql-tag";
//import { useNavigate } from "react-router-dom";
import { TextField , Button , Container , Stack , Alert } from "@mui/material"
import JobItem from "./JobItem";

const APP_QUERY = gql`
    query GetApplicationsByUser($getApplicationsByUserId: ID!) {
        getApplicationsByUser(id: $getApplicationsByUserId) {
            id
            jobId
            status
        }
    }
`;

const JOB_QUERY = gql`
    query PostedBy($getJobByIdId: ID!) {
        getJobById(id: $getJobByIdId) {
            company
            description
            id
            location
            salary
            title
        }
    }
`;

function MyApplications(props) {
    const { user } = useContext(AuthContext);
    //let navigate = useNavigate();
    const [displayData,setDisplayData] = useState([])
    const [errors, setErrors] = useState([]);
    const [itemStatus,setItemStatus] = useState(30)
    function outCallQuery(){
        
    }
    const {data:appdata,error} = useQuery(APP_QUERY,{
        variables: {"getApplicationsByUserId":user.id},
        fetchPolicy:'network-only',
        onCompleted: (querydata) => {
            console.log("inside app query")
            console.log(querydata.getApplicationsByUser)
            
            querydata.getApplicationsByUser.map((job,index)=>{
                console.log("iteration"+index)
                var temp=30;
                if(job.status.localeCompare("Hired")==0)
                    temp=100
                else if(job.status.localeCompare("Interviewing")==0)
                    temp=50;
                setItemStatus(temp)
                getJobData({variables:{
                    "getJobByIdId": job.jobId
                    }
                }
            )})
            console.log("last of app query " + displayData)
    },
    onError: (errordata) => {
        console.log("errors")
        console.log(errordata)
        setErrors(errordata)
    }}
    )

    const [getJobData , {data:jobdata}] = useLazyQuery(JOB_QUERY,{
        fetchPolicy:'network-only',
        onCompleted: (querydata) => {
            console.log("inside job query ")
            console.log(querydata)
            console.log("inside job query ")
            setDisplayData([...displayData,{stat:itemStatus,job:querydata.getJobById}])
            console.log("inside job query oncomp" + displayData)
        },
        onError: (errordata) => {
            setErrors(errordata)
            console.log(errordata)
        }}
        )

    if(error) return <pre>{error.message}</pre>
    //const {loading,error,data,refetch} = useQuery(JOB_QUERY)

    console.log("please")
    console.log(appdata)
    console.log("please")
    
    
    function RegisterUserCallback() {
        console.log("Callback called back");
        //getJobData({variables : {"jobSearch": values }})
    }

        return (
          <div>
            Hello there, these are your applications
            <div>
              <Stack spacing={2}>
                {displayData.map((item, index) => (
                  <JobItem
                    jid={item.job.id}
                    title={item.job.title}
                    company={item.job.company}
                    location={item.job.location}
                    salary={item.job.salary}
                    description={item.job.description}
                    showStat={true}
                    status={item.stat}
                    key={index}
                  />
                ))}
              </Stack>
            </div>
          </div>
        );    
}

export default MyApplications;