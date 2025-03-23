import api from "./index";

export async function fetchRenewals() {
  try {
    const result = await api.get("/api/lease/renewals");
    return result.data;
  } catch (err) {
    return err;
  }
}
export async function createLease(data) {
  try {
    console.log(data);
    const result = await api.post("/api/lease/new-lease", data);

    return result.data;
  } catch (err) {
    return err;
  }
}

export async function fetchPending() {
  try {
    const result = await api.get("/api/lease/pendingLeases");
    return result.data;
  } catch (err) {
    return err;
  }
}

export async function fetchLease(leaseId) {
  try {
    const result = await api.get(`/api/lease/${leaseId}`);
    return result.data;
  } catch (err) {
    return err;
  }
}
