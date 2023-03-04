import React, { useState } from "react";

const usePositions = () => {
  // const [allPositions, setAllPositions] = useState([]);
  const useAllUserPositionsId = async (contract, account) => {
    let positionsIdsPromises = await contract.getPositionsIdsByAddress(account);
    positionsIdsPromises = positionsIdsPromises.map((item) => item.toString());
    return [positionsIdsPromises];
  };

  const useAllUserPositions = async (contract, account) => {
    const allUserPositionsId = useAllUserPositionsId();
    let allUserPositions = Promise.all(
      allUserPositionsId.then((data) =>
        data.map(async (item) => {
          return await contract.getPositionById(item.toString());
          // setAllUserPositions((prev) => [...prev, position]);
        })
      )
    );
    console.log(allUserPositions);
    return [allUserPositions];
  };
  return <div></div>;
};

export default usePositions;
