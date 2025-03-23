import api from "./index";

export async function fetchTenantInformation(tenantId) {
  try {
    const result = await api.get(`/api/tenant/${tenantId}`);
    return result.data;
  } catch (err) {
    return err;
  }
}

export async function createNewTenant(data) {
  try {
    const result = await api.post(`/api/tenant/`, data);

    return result;
  } catch (err) {
    console.error(
      "Error in createNewTenant:",
      err.response?.data || err.message
    );
    throw err;
  }
}
