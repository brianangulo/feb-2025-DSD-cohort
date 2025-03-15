const express = require("express");
const router = express.Router();
const Lease = require("../database/entities/lease");

const AppDataSource = require("../database/data-source");
const { calculateLeaseExpiration } = require("../utilis/calculateLeaseExpiration");

router.get("/renewals", async (req, res, next) => {
  try {
    const currentLeases = await AppDataSource.manager.find(Lease, {
      relations: ["tenant", "apartment"],
    });

    if (currentLeases.length === 0) {
      return res.status(200).json([]);
    }
    const renewableLeases = currentLeases.map(lease => {
      const { apartment } = lease;
      const { tenant } = lease;

      if (calculateLeaseExpiration(lease.lease_end_date)) {
        return {
          id: lease.id,
          leaseId: lease.id,
          apartmentNumber: apartment.apartment_number,
          tenantName: `${tenant.first_name} ${tenant.last_name}`,
          leaseEnd: new Date(lease.lease_end_date).toLocaleDateString("en"),
        };
      }
    });

    if (renewableLeases.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(renewableLeases);
  } catch (error) {
    return next(error);
  }
});

router.get("/pendingLeases", async (req, res) => {
  try {
    const currentLeases = await AppDataSource.manager.find(Lease, {
      relations: ["tenant", "apartment"],
    });

    if (currentLeases.length === 0) {
      return res.status(200).json([]);
    }
    const pendingLeases = currentLeases
      .map(lease => {
        const { apartment } = lease;
        const { tenant } = lease;

        if (lease.status === "pending")
          return {
            id: lease.id,
            leaseId: lease.id,
            apartmentNumber: apartment.apartment_number,
            tenantName: `${tenant.first_name} ${tenant.last_name}`,
            leaseEnd: lease.lease_end_date.toLocalDateString("en-US"),
          };
      })
      .filter(lease => lease !== undefined);

    if (pendingLeases.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(pendingLeases);
  } catch (error) {
    return next(error);
  }
});

router.get("/expiringLeases", async (req, res, next) => {
  //fetch all leases from database
  //will use mock data to mimick since its not connected or data doesn't exist just yet
  //mock resposne to database
  //   const response = Db.fetch(leases)
  //   const response = [];
  //   if (response.length === 0) {
  //     return res.status(400).json([]);
  //   }
  try {
    const mockLeaseData = await AppDataSource.manager.find(lease);

    if (mockLeaseData.length === 0) {
      return res.status(200).json([]);
    }

    const today = new Date();
    const endRange = new Date();

    endRange.setDate(endRange.getDate() + 30);
    const filteredLeases = mockLeaseData.filter(lease => {
      const leaseEndDate = new Date(lease.lease_end_date);
      return today <= leaseEndDate && leaseEndDate <= endRange;
    });

    if (filteredLeases.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(filteredLeases);
  } catch (error) {
    return next(error);
  }
});

//set up cors and send to the frontend to display
module.exports = router;
