const express = require("express");
const router = express.Router();
const mockLeaseData = [
  {
    id: 1,
    apt_num: 101,
    tenant_id: 1,
    first_name: "John",
    last_name: "Doe",
    landlord_id: 10,
    lease_start_date: "2024-03-01",
    lease_end_date: "2025-04-05",
    renewal_term: "Yearly",
    status: "Signed",
    notes: "Tenant requested minor repairs.",
  },
  {
    id: 2,
    apt_num: 202,
    tenant_id: 2,
    first_name: "Emma",
    last_name: "Smith",
    landlord_id: 11,
    lease_start_date: "2024-04-15",
    lease_end_date: "2025-03-30",
    renewal_term: "Monthly",
    status: "Signed",
    notes: "Tenant considering renewal.",
  },
  {
    id: 3,
    apt_num: 303,
    tenant_id: 3,
    first_name: "Liam",
    last_name: "Johnson",
    landlord_id: 12,
    lease_start_date: "2023-09-01",
    lease_end_date: "2025-03-25",
    renewal_term: "Bi-monthly",
    status: "Pending",
    notes: "Lease renewal under review.",
  },
  {
    id: 4,
    apt_num: 404,
    tenant_id: 4,
    first_name: "Olivia",
    last_name: "Brown",
    landlord_id: 13,
    lease_start_date: "2024-06-01",
    lease_end_date: "2025-06-01",
    renewal_term: "Yearly",
    status: "Signed",
    notes: "Tenant wants early renewal.",
  },
  {
    id: 5,
    apt_num: 505,
    tenant_id: 5,
    first_name: "Noah",
    last_name: "Davis",
    landlord_id: 14,
    lease_start_date: "2024-05-01",
    lease_end_date: "2025-04-15",
    renewal_term: "Monthly",
    status: "Renewed",
    notes: "Lease auto-renewed last cycle.",
  },
  {
    id: 6,
    apt_num: 606,
    tenant_id: 6,
    first_name: "Ava",
    last_name: "Miller",
    landlord_id: 15,
    lease_start_date: "2024-07-10",
    lease_end_date: "2025-07-10",
    renewal_term: "Yearly",
    status: "Signed",
    notes: "Tenant inquired about extension.",
  },
  {
    id: 7,
    apt_num: 707,
    tenant_id: 7,
    first_name: "William",
    last_name: "Wilson",
    landlord_id: 16,
    lease_start_date: "2024-08-01",
    lease_end_date: "2025-03-20",
    renewal_term: "Bi-monthly",
    status: "Pending",
    notes: "Tenant might vacate.",
  },
  {
    id: 8,
    apt_num: 808,
    tenant_id: 8,
    first_name: "Sophia",
    last_name: "Moore",
    landlord_id: 17,
    lease_start_date: "2024-09-15",
    lease_end_date: "2025-09-15",
    renewal_term: "Yearly",
    status: "Signed",
    notes: "No issues reported.",
  },
  {
    id: 9,
    apt_num: 909,
    tenant_id: 9,
    first_name: "James",
    last_name: "Taylor",
    landlord_id: 18,
    lease_start_date: "2024-10-01",
    lease_end_date: "2025-04-01",
    renewal_term: "Monthly",
    status: "Signed",
    notes: "Tenant asked for lease extension.",
  },
  {
    id: 10,
    apt_num: 1010,
    tenant_id: 10,
    first_name: "Isabella",
    last_name: "Anderson",
    landlord_id: 19,
    lease_start_date: "2024-11-20",
    lease_end_date: "2025-03-18",
    renewal_term: "Bi-monthly",
    status: "Pending",
    notes: "Pending tenant's decision on renewal.",
  },
];

router.get("/expiringLeases", (req, res, next) => {
  //fetch all leases from database
  //will use mock data to mimick since its not connected or data doesn't exist just yet
  //mock resposne to database
  //   const response = Db.fetch(leases)
  //   const response = [];
  //   if (response.length === 0) {
  //     return res.status(400).json([]);
  //   }
  const today = new Date();
  const endRange = new Date();
  endRange.setDate(endRange.getDate() + 30);
  const filteredLeases = mockLeaseData.filter(lease => {
    const leaseEndDate = new Date(lease.lease_end_date);
    return today <= leaseEndDate && leaseEndDate <= endRange;
  });

  if (filteredLeases.length === 0) {
    return next(new Error("no leases found"));
  }

  return res.status(200).json(filteredLeases);
});

module.exports = router;
