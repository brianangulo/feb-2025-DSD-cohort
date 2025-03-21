import { Box, Typography, Divider, Grid2, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';

const Hero = ({ apartmentData }) => {
    const parseAddress = (fullAddress) => {
        if (!fullAddress) return { 
            address1: "Street Address",
            address2: "City, State",
            address3: "ZIP Code"
        };

        const parts = fullAddress.split(',').map(part => part.trim());
        return {
            address1: `${parts[0] || "Street Address"} #${apartmentData.apartmentNumber}`,
            address2: parts[1] || "City",
            address3: parts[2] || "State",
            address4: parts[3] || "ZIP Code"
        };
    };

    const {
        id,
        apartmentNumber,
        leaseStatus = "No Status",
        leaseEndDate,
        tenantName,
        floorPlanImg,
        apartmentAddress
    } = apartmentData;

    const { address1, address2, address3, address4 } = parseAddress(apartmentAddress);

    //for the modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const statusColor = leaseStatus === "Occupied" ? "red" : "green";

    const leaseEnd = new Date(leaseEndDate);
    const today = new Date();
    const daysLeft = (leaseEnd - today) / (1000 * 60 * 60 * 24);
    const leaseExpirationColor = daysLeft <= 30 ? "red" : "green";

    return (
        <Box>
            <Box sx={{
                width: "100%",
                border: "10px ridge rgb(157, 127, 246)",
                borderRadius: 5,
                overflow: "hidden",
            }}
            >
                <Grid2 container>
                    {/* Left section  */}
                    <Grid2 size={{ xs: 12, md: 5 }} sx={{ p: 2, position: "relative" }}>
                        <Typography variant="body1">
                            ID: {id}
                        </Typography>

                        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                            Apartment {apartmentNumber}
                        </Typography>

                        <Typography variant="h6">{address1}</Typography>
                        <Typography variant="h6">{address2},{address3}</Typography>
                        <Typography variant="h6">{address4}</Typography>
                    </Grid2>
                    
                    <Grid2 size={{ xs: 12, md: 5 }} sx={{ p:2, mt:3}}>
                        <Typography variant="h5" sx={{ mb: 1 }}>
                            <strong>Status: </strong>
                            <span style={{ color: statusColor }}>{leaseStatus}</span>
                        </Typography>
                        
                        <Typography variant="h5" sx={{ mb: 1 }}>
                            <strong>Lease Expires: </strong>
                            <span style={{ color: leaseExpirationColor }}>{leaseEndDate}</span>
                        </Typography>

                        <Typography variant="h5" sx={{ mb: 1 }}>
                            <strong>Current Occupant: </strong>
                            <span style={{ color: "green" }}>{tenantName}</span>
                        </Typography>
                    </Grid2>

                    <Grid2
                        size={{ xs: 12, md: 2 }}
                        sx={{
                            p: 2,
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <img
                            src={floorPlanImg}
                            alt="Floor Plan 1"
                            style={{
                            maxWidth: "160px",
                            maxHeight: "150px",
                            objectFit: "contain",
                        }}
                        />

                        <IconButton aria-label="Zoom Floor Plan" onClick={() => setIsModalOpen(true)}>
                            <AddCircleOutlineIcon sx={{ color: "green" }} />
                        </IconButton>
                    </Grid2>
                </Grid2>
            </Box>

            {/* Dialog/modal for enlarged image */}
            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <img
                  src={floorPlanImg}
                  alt="Floor Plan Large"
                  style={{
                    maxWidth: "80vw",
                    maxHeight: "80vh",
                    objectFit: "contain",
                  }}
                />
            </Dialog>
        </Box>
    )
}

export default Hero;