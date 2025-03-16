// This file is used to configure the database connection for TypeORM.
const Admin = require("./database/entities/admin");
const Lease = require("./database/entities/lease");
const Apartment = require("./database/entities/apartment");
const Tenant = require("./database/entities/tenant");
const TenantDetails = require("./database/entities/tenantDetails");
const Complaint = require("./database/entities/complaint");

module.exports = {
  name: "default",
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "tenant_portal",
  synchronize: false,
  logging: false,
  entities: [Admin, Lease, Apartment, Tenant, TenantDetails, Complaint],
  migrations: ["./database/migrations/**/*.js"],
  experimentalDecorators: true,
  emitDecoratorMetadata: true,
};
