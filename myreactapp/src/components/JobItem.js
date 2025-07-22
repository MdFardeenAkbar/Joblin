import { Box , Card , CardContent , Button , CardActions , Typography , LinearProgress, Stack} from '@mui/material/';
import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utility/hooks";
import { useMutation } from "@apollo/react-hooks";
import {gql} from "graphql-tag";


const APPLY_QUERY = gql`
    mutation ApplyForJob($jobId: ID!) {
        applyForJob(jobId: $jobId) {
            id
            jobId
            status
            userId
        }
    }
`;
function JobItem(props) {
    const [errors, setErrors] = useState([""]);
    const [status, setStatus] = useState('APPLY');
    const [progressStatus,setProgressStatus] = useState(30);
    function Callback() {
        console.log("Callback called back");
        console.log(props.jid)
        apply();
    }
    const [apply, {loading}] = useMutation(APPLY_QUERY, {
            onError({ graphQLErrors }) {
                setErrors(graphQLErrors);
                setStatus('ERROR')
            },
            onCompleted(){
                setStatus('APPLIED')
            },
            variables: {
                "jobId": props.jid
              }
        })
        console.log(props.status)
    /* if(props.status.localeCompare("Interviewing")==0)
        setProgressStatus(50);
    if(props.status.localeCompare("Hired")==0)
        setProgressStatus(100); */
    return (
      <>
        <Card sx={{ minWidth: 275 }} key={props.index}>
          <CardContent>
            <Typography
              gutterBottom
              sx={{ color: "text.primary", fontSize: 14 }}
            >
              {props.title} at {props.company}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              {props.location}
            </Typography>
            <Typography variant="body2">{props.description}</Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              {props.salary} p.a
            </Typography>
          </CardContent>
          {(!props.showHire)?
            <>
                
            </>
            :
                (!props.showStat) ? (
                <CardActions>
                <Button size="small" onClick={Callback}>
                    {status}
                </Button>
                </CardActions>
            ) : (
                <Stack>
                <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                    <Box>Applied</Box>
                    <Box>Interviewing</Box>
                    <Box>Hired</Box>
                </Box>
                <Box>
                    <LinearProgress variant="determinate" value={Number(props.status)} />
                </Box>
                </Stack>
          )}
        </Card>
      </>
    );
}

export default JobItem;