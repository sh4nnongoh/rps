import React from "react";
import { Button } from "@material-ui/core";
import TestAppBar from "../components/testAppBar";

const getData = async () => {
  const carsDataReq = await fetch("https://storage.googleapis.com/tfjs-tutorials/carsData.json");
  const carsData = await carsDataReq.json();
  const cleaned = carsData.map((car) => ({
    mpg: car.Miles_per_Gallon,
    horsepower: car.Horsepower
  }))
    .filter((car) => (car.mpg != null && car.horsepower != null));

  return cleaned;
};

const rps = () => (
  <div>
    <div>
      <TestAppBar />
    </div>
    <div>
      HII
    </div>
    <Button size="large" onClick={getData}>
      test tesnsorflow
    </Button>
  </div>
);

export default rps;
