import api from "./index";

export async function fetchApartmentInformation() {
  try {
    const result = await api.get("/api/dashboard/apartment");
    return result.data;
  } catch (err) {
    return err;
  }
}
