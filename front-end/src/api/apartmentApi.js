import api from "./index";

export async function fetchApartmentInformation() {
  try {
    const result = await api.get("/api/apartment");
    return result.data;
  } catch (err) {
    return err;
  }
}

//fetching for the apartment details page
export async function fetchApartmentDetailsById(id) {
  try {
    const result = await api.get(`/api/apartment/${id}`);
    return result.data;
  } catch (err) {
    return err;
  }
}


//function for using put endpoint for notes and features, works with both
export async function updateApartmentDetails(id, updatedData) {
  try {
    const result = await api.put(`/api/apartment/${id}`, updatedData);
    return result.data;
  } catch (err) {
    return err;
  }
}