import React, { useEffect, useState } from "react";

const usePositions = (contract, account) => {
  const [allPositions, setAllPositions] = useState([]);
  const [allIds, setAllIds] = useState("");

  const getAllUserPositionsId = async () => {
    let positionsIdsPromises = await contract.getPositionsIdsByAddress(account);
    const ids = positionsIdsPromises.map((item) => {
      return Object.values(item._hex.split())[0];
    });
    setAllIds(ids);
    // return ids;
  };

  const getAllUserPositions = async () => {
    console.log(allIds);

    // Promise.all(
    //   allIds.then((data) =>
    allIds.map(async (item) => {
      const position = await contract.getPositionById(item);
      setAllPositions((prev) => [...prev, position]);
    });
    //   )
    // );

    // Promise.all(
    //   allUserPositionsId.then((data) =>
    //     data.map(async (item) => {
    //       const position = await contract.getPositionById(item.toString());
    //       setAllPositions((prev) => [...prev, position]);
    //     })
    //   )
    // );

    // return [allPositions];
  };

  useEffect(() => {
    if (contract && account) {
      getAllUserPositionsId();
    }
  }, []);

  useEffect(() => {
    getAllUserPositions();
  }, [allIds]);
  useEffect(() => {
    console.log(allPositions);
  }, [allPositions]);
  return <div></div>;
};

export default usePositions;
