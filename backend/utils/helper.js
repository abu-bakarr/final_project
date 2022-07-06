const filterId = (allData) => {
  if (allData.length > 0) {
    for (const data of allData) {
      return data.dataValues.map((item) => item);
    }
  }
};
