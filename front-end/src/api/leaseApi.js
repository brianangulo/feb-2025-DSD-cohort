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

export async function fetchLeaseDetails(leaseId) {
  try {
    const result = await api.get(`/api/lease/${leaseId}`);
    return result.data;
  } catch (err) {
    return err;
  }
}

export async function signLease(leaseId, checked) {
  try {
    const result = await api.put(`/api/lease/signLease/${leaseId}`, { signature: checked });
    return result;
  } catch (err) {
    return err;
  }
}
export async function fetchLeaseRenewal(leaseId) {
  try {
    const result = await api.get(`/api/lease/renew/${leaseId}`);
    return result.data;
  } catch (err) {
    return err;
  }
}

export async function renewLease(leaseId, data) {
  try {
    const result = await api.put(`/api/lease/renew/${leaseId}`, data);
    return result.data;
  } catch (err) {
    return err;
  }
}
