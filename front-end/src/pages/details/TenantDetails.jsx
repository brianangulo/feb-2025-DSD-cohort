import { Grid2 } from "@mui/material";
import TenantLeaseDetails from "../../components/TenantLeaseDetails";
import TenantProfileDetails from "../../components/TenantProfileDetails";
import { fetchTenantInformation } from "../../api/tenantApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";

const TenantDetails = () => {
  const [tenant, setTenant] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchTenantInfo() {
      try {
        const tenant = await fetchTenantInformation(id);
        setTenant(tenant);
      } catch (err) {
        return err;
      }
    }
    fetchTenantInfo(id);
  }, [id]);

  if (!tenant) {
    return <Spinner />;
  }

  return (
    <Grid2 container spacing={2} padding={2} className="min-h-screen">
      <Grid2 size={{ xs: 12, md: 6 }}>
        <TenantProfileDetails tenant={tenant} />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <TenantLeaseDetails tenant={tenant} />
      </Grid2>
    </Grid2>
  );
};

export default TenantDetails;
