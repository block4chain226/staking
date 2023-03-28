import React, { useEffect, useState } from "react";

const usePositions = (contract = "", account = "") => {
  const [allPositions, setAllPositions] = useState([]);
  const [allIds, setAllIds] = useState("");
  const [tokensTotalMarket, setTokensTotalMarket] = useState([]);

  const getAllUserPositionsId = async () => {
    let positionsIdsPromises = await contract.getPositionsIdsByAddress(account);
    const ids = positionsIdsPromises.map((item) => {
      return Object.values(item._hex.split())[0];
    });
    setAllIds(ids);
  };

  const getAllUserPositions = async () => {
    allIds.map(async (item) => {
      const position = await contract.getPositionById(item);
      setAllPositions((prev) => [...prev, position]);
    });
  };

  const getTotalTokensMarket = async () => {
    let tokensTotalMarket;
    if (allPositions.length > 0) {
      allPositions.map(async (position) => {
        tokensTotalMarket = await contract.getStakedTokenTotalSupply(
          position.symbol
        );
        setTokensTotalMarket((prev) => [
          ...prev,
          Object.values(tokensTotalMarket._hex.split())[0],
        ]);
      });
    }
  };

  useEffect(() => {
    if (account !== "") {
      getAllUserPositionsId();
    }
  }, [account]);

  useEffect(() => {
    if (allIds !== "") {
      getAllUserPositions();
    }
  }, [allIds]);

  useEffect(() => {
    getTotalTokensMarket();
  }, [allPositions]);

  return [allPositions, tokensTotalMarket];
};

export default usePositions;
