const calculateLeaseExpiration = lease => {
  const leaseEndDate = new Date(lease);
  const today = new Date();
  const endRange = new Date();
  endRange.setDate(endRange.getDate() + 30);

  return today <= leaseEndDate && leaseEndDate <= endRange;
};

module.exports = { calculateLeaseExpiration };
