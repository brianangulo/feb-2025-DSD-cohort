import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Box
} from '@mui/material';

import VolumeUpIcon from '@mui/icons-material/VolumeUp'; 
import WarningIcon from '@mui/icons-material/Warning'; 
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'; 
import BuildIcon from '@mui/icons-material/Build'; 
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'; 

import { Link } from "react-router";

const complaintTypeIcons = {
    Noise: <VolumeUpIcon fontSize='small' sx={{ color: "purple" }} />,
    Disturbance: <WarningIcon fontSize='small' sx={{ color: "red" }} />,
    Emergency: <PriorityHighIcon fontSize='small' sx={{ color: "orange" }} />,
    Maintenance: <BuildIcon fontSize='small' sx={{ color: "blue" }} />,
    Other: <HelpOutlineIcon fontSize='small' sx={{ color: "gray" }} />,
}

const statusColors = {
    New: "blue",
    "In Progress": "orange",
    Resolved: "green",
}

const ComplaintCard = ({ complaint }) => {
    const {
        id,
        complaint_type,
        timestamp,
        description,
        status,
    } = complaint;

    const iconElement = complaintTypeIcons[complaint_type] || <HelpOutlineIcon fontSize='small' sx={{ color: "gray" }} />;

    const dateString = new Date(timestamp).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    })

    //Cut down description to 250 chars
    const shortDescription = description && description.length > 250 ? description.slice(0,250) + "..." : description;

    return (
        <Card sx={{ display: "flex", flexDirection: "column", height: "100%", border: "1px solid #ccc", borderRadius: 1, boxShadow: 1, }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant='caption' color='text.secondary'>
                    {dateString}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb:2 }}>
                    {iconElement}
                    <Typography variant="subtitle1" sx={{ ml: 1, fontWeight: "bold" }}>
                        {complaint_type}
                    </Typography>
                </Box>

                <Typography variant='body2' sx={{ mb: 2 }}>
                    {shortDescription}
                </Typography>

                <Typography variant='body2' sx={{ fontWeight: "bold", color: statusColors[status] || "text.primary", }}>
                    {status}
                </Typography>
            </CardContent>

            <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button variant='contained' size="small" component={Link} to={`/complaint-details/${id}`}>
                    View Details
                </Button>
            </CardActions>
        </Card>
    )
}

export default ComplaintCard;