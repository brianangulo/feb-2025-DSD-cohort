import { useState, useEffect } from "react";
import { Box, Grid2, CircularProgress } from "@mui/material";
import { useParams } from "react-router";
import Hero from "../../components/aptdetails/Hero";
import Details from '../../components/aptdetails/Details';
import Features from "../../components/aptdetails/Features";
import Notes from "../../components/aptdetails/Notes";
import { fetchApartmentDetailsById } from "../../api/apartmentApi";
import floorPlan1 from '../../assets/floorplans/floorplan1.png';
import floorPlan2 from '../../assets/floorplans/floorplan2.png'
import floorPlan3 from '../../assets/floorplans/floorplan3.png';
import floorPlan4 from '../../assets/floorplans/floorplan4.png'
import floorPlan5 from '../../assets/floorplans/floorplan5.png'
import Spinner from "../../components/Spinner";

const ApartmentDetails = () => {
  //Id took from the URL parameters, used to fetch the specific items
  const { id } = useParams();
  const floorPlans = [floorPlan1, floorPlan2, floorPlan3, floorPlan4, floorPlan5];
  const floorPlanNames = ["1 Bed - 1 Bath A", "2 Bed - 1 Bath B", "2 Bed - 2 Bath C", "3 Bed - 2 Bath D", "Studio E"];

  const [apartmentData, setApartmentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchApartmentDetailsById(id);
        //get random floor plan image and name
        const randIndex = Math.floor(Math.random() * floorPlans.length);
        setApartmentData({ ...data, floorPlanImg: floorPlans[randIndex], id: id, floorPlanName: floorPlanNames[randIndex] });
      } catch (error) {
        console.error("Error fetching apartment details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "90vh" }}>
        <Spinner />
      </Box>
    );
  }

  if (!apartmentData) {
    return <div>Error loading apartment data</div>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "90vh", p:2 }}>

      <Hero apartmentData={apartmentData} />

      <Grid2 container spacing={2} sx={{ flex: 1, minHeight: 0, mt: 4 , alignItems: "stretch" }}>
        <Grid2 size={{ xs: 12, md: 4 }} sx={{ display: "flex", flexDirection: "column"}}>
          <Details apartmentData={apartmentData} />
        </Grid2>

        <Grid2 size={{ xs: 12, md: 4}} sx={{ display: "flex", flexDirection: "column"}}>
          <Features apartmentData={apartmentData} />
        </Grid2>

        <Grid2 size={{ xs: 12, md: 4}} sx={{ display: "flex", flexDirection: "column"}}>
          <Notes apartmentData={apartmentData} />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default ApartmentDetails;
