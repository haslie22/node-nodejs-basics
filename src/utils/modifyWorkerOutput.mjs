const statuses = {
  RESOLVED: 'resolved',
  ERROR: 'error',
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};

const modifyWorkerOutput = (workerResults) => {
  const formattedResults = workerResults.map((result) =>
    result.status === statuses.FULFILLED
      ? { status: statuses.RESOLVED, data: result.value }
      : { status: statuses.ERROR, data: null }
  );

  return formattedResults;
};

export default modifyWorkerOutput;
