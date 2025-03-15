import api from "./index";

export async function fetchRenewals() {
  try {
    const result = await api.get("/api/dashboard/lease/renewals");
    return result.data;
  } catch (err) {
    return err;
  }
}

export async function fetchPending() {
  try {
    const result = await api.get("/api/dashboard/lease/pendingLeases");
    return result.data;
  } catch (err) {
    return err;
  }
}
