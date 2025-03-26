const express = require("express");
const router = express.Router();
const Lease = require("../database/entities/lease");
const { determineLeaseStatus } = require("../utilis/determineLeaseStatus");
const Apartment = require("../database/entities/apartment");
const Tenant = require("../database/entities/tenant");
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
    const renewableLeases = currentLeases
      .map(lease => {
        const { apartment } = lease;
        const { tenant } = lease;

        if (calculateLeaseExpiration(lease.lease_end_date)) {
          return {
            id: lease.apartment_id,
            leaseId: lease.id,
            tenantId: lease.tenant_id,
            apartmentNumber: apartment.apartment_number,
            tenantName: `${tenant.first_name} ${tenant.last_name}`,
            leaseEnd: new Date(lease.lease_end_date).toLocaleDateString("en"),
          };
        }
      })
      .filter(lease => lease !== undefined);

    if (renewableLeases.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(renewableLeases);
  } catch (error) {
    return next(error);
  }
});

router.get("/pendingLeases", async (req, res, next) => {
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

        if (lease.signed_at === null)
          return {
            id: lease.id,
            tenantId: tenant.id,
            apartmentId: apartment.id,
            apartmentNumber: apartment.apartment_number,
            tenantName: `${tenant.first_name} ${tenant.last_name}`,
            leaseEnd: new Date(lease.lease_end_date).toLocaleDateString("en-US"),
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

router.get("/renew/:leaseId", async (req, res, next) => {
  const leaseId = req.params.leaseId;

  try {
    const lease = await AppDataSource.manager.findOne(Lease, {
      where: { id: leaseId },
    });

    if (!lease) {
      return next(new Error("Lease not found."));
    }

    const { monthly_rent_in_dollars, notes } = lease;

    return res.status(200).json({ monthly_rent_in_dollars, notes });
  } catch (error) {
    return next(error);
  }
});

router.put("/renew/:leaseId", async (req, res, next) => {
  const leaseId = req.params.leaseId;
  const renewChanges = req.body;

  try {
    const currentLease = await AppDataSource.manager.findOne(Lease, {
      where: { id: leaseId },
    });

    if (!currentLease) {
      return next(new Error("Lease not found."));
    }

    if (renewChanges.notes === "") {
      delete renewChanges.notes;
    }

    await AppDataSource.manager.save(Lease, {
      ...currentLease,
      ...renewChanges,
    });

    return res.status(200).json({ message: "Lease renewed successfully" });
  } catch (error) {
    return next(error);
  }
});

router.get("/:leaseId", async (req, res, next) => {
  const leaseId = req.params.leaseId;

  try {
    const lease = await AppDataSource.manager.findOne(Lease, {
      where: { id: leaseId },
      relations: ["apartment", "tenant"],
    });

    if (!lease) {
      return next(new Error("Lease not found."));
    }

    const { apartment, tenant } = lease;

    const leaseInformation = {
      leaseId: lease.id,
      leaseStartDate: lease.lease_start_date,
      leaseEndDate: lease.lease_end_date,
      leaseStatus: determineLeaseStatus(lease),
      monthlyRent: lease.monthly_rent_in_dollars,
      leaseNotes: lease.notes,
      tenantInformation: {
        tenantId: tenant.id,
        tenantName: `${tenant.first_name} ${tenant.last_name}`,
        phoneNumber: tenant.phone_number,
        email: tenant.email,
      },
      apartmentInformation: {
        apartmentId: apartment.id,
        apartmentNumber: apartment.apartment_number,
        apartmentAddress: "1600 Pennsylvania Avenue NW, Washington, DC 20500",
        squareFootage: apartment.square_footage,
        bedrooms: apartment.bedrooms,
        bathrooms: apartment.bathrooms,
        floor: apartment.floor,
        features: apartment.features,
        apartmentNotes: apartment.notes,
      },
    };
    return res.status(200).json(leaseInformation);
  } catch (error) {
    return next(error);
  }
});

router.put("/signLease/:leaseId", async (req, res, next) => {
  try {
    const leaseId = req.params.leaseId;
    const { signature } = req.body;

    const signedLease = await AppDataSource.manager.findOneBy(Lease, {
      id: leaseId,
    });

    if (!signedLease) {
      return next(new Error("Lease not found."));
    }
    signedLease.signed_at = new Date();
    signedLease.signature = signature;
    await AppDataSource.manager.save(Lease, signedLease);
    return res.status(200).json(signedLease);
  } catch (error) {
    return next(error);
  }
});
router.post("/", async (req, res, next) => {
  const leaseData = req.body;
  const apartmentId = req.body.apartmentId;

  const fetchedApartment = await AppDataSource.manager.findOne(Apartment, {
    where: { id: apartmentId },
    relations: ["lease"],
  });

  if (fetchedApartment.lease.length !== 0) {
    return res.status(200).json({
      message: "apartment already has a lease try again",
    });
  }

  const leaseStart = new Date(leaseData.leaseStartDate);
  const leaseEnd = new Date(leaseData.leaseEndDate);

  if (leaseEnd < leaseStart) {
    return res.status(200).json({
      message: "lease end dates start before the start date try again",
    });
  }

  try {
    const newLease = {
      lease_start_date: leaseData.leaseStartDate,
      lease_end_date: leaseData.leaseEndDate,
      monthly_rent_in_dollars: leaseData.rent,
      notes: leaseData.notes,
      apartment_id: leaseData.apartmentId,
      tenant_id: leaseData.tenantId,
    };

    await AppDataSource.manager.save(Lease, newLease);

    return res.status(200);
  } catch (err) {
    return next(new Error(err));
  }
});

router.post("/new-lease", async (req, res, next) => {
  const leaseData = req.body;
  const apartmentId = req.body.apartmentId;

  console.log("leaseData", leaseData);
  if (leaseData.leaseId) {
    await AppDataSource.manager.update(Lease, leaseData.leaseId, {
      lease_start_date: leaseData.leaseStartDate,
      lease_end_date: leaseData.leaseEndDate,
      monthly_rent_in_dollars: leaseData.rent,
      notes: leaseData.notes,
    });
    return res.status(200).json({
      message: "lease updated",
    });
  }

  const { first_name, last_name, email, date_of_birth, phone_number, additional_information } = leaseData;

  const tenant = await AppDataSource.manager.findOne(Tenant, {
    where: { email },
  });

  console.log("tenant", tenant);
  if (tenant !== null) {
    return next(new Error("tenant already exists with that email"));
  }

  const newTenant = await AppDataSource.manager.save(Tenant, {
    first_name,
    last_name,
    email,
    date_of_birth,
    phone_number,
    additional_information,
  });

  const fetchedApartment = await AppDataSource.manager.findOne(Apartment, {
    where: { id: apartmentId },
    relations: ["lease"],
  });

  if (fetchedApartment.lease.length !== 0) {
    return next(new Error("apartment already has a lease try again"));
  }

  const leaseStart = new Date(leaseData.leaseStartDate);
  const leaseEnd = new Date(leaseData.leaseEndDate);

  if (leaseEnd < leaseStart) {
    return next(new Error("lease end dates start before the start date try again"));
  }

  try {
    const newLease = await AppDataSource.manager.save(Lease, {
      lease_start_date: leaseData.leaseStartDate,
      lease_end_date: leaseData.leaseEndDate,
      monthly_rent_in_dollars: leaseData.rent,
      notes: leaseData.notes,
      apartment_id: leaseData.apartmentId,
      tenant_id: newTenant.id,
    });

    await AppDataSource.manager.update(Tenant, newTenant.id, {
      lease_id: newLease,
    });

    return res.status(200).json({
      message: "new lease created",
    });
  } catch (err) {
    return next(err);
  }
});
module.exports = router;
