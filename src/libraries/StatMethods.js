import * as stat from "simple-statistics";

export const correlation_coefficient = (seriesX, seriesY) => {
    return stat.sampleCorrelation(seriesX, seriesY).toFixed(2);
}