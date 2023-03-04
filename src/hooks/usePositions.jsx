import React, { useEffect, useState } from "react";

const usePositions = (contract, account) => {
  const [allPositions, setAllPositions] = useState([]);

  const getAllUserPositionsId = async () => {
    let positionsIdsPromises = await contract.getPositionsIdsByAddress(account);
    console.log(
      "🚀 ~ file: usePositions.jsx:8 ~ getAllUserPositionsId ~ positionsIdsPromises:",
      positionsIdsPromises
    );

    const ids = positionsIdsPromises.map((item) => {
      let obj = item._hex;
      const vasa = Object.values(obj.split());
      return vasa[0];
    });
    console.log("🚀 ~ file: usePositions.jsx:12 ~ ids ~ ids:", ids);

    // positionsIdsPromises = positionsIdsPromises.map((item) => {
    //   return item.toString();
    // });
    // return positionsIdsPromises;
  };

  const getAllUserPositions = async () => {
    const allUserPositionsId = getAllUserPositionsId();
    Promise.all(
      allUserPositionsId.then((data) =>
        data.map(async (item) => {
          const position = await contract.getPositionById(item.toString());
          setAllPositions((prev) => [...prev, position]);
        })
      )
    );

    return [allPositions];
  };

  useEffect(() => {
    if (contract && account) {
      debugger;
      getAllUserPositionsId();
    }
  }, []);
  return <div></div>;
};

export default usePositions;
