import euclideanDistance from "euclidean-distance";
import * as stat from "simple-statistics";

export const correlation_coefficient = (seriesX, seriesY) => {
    return stat.sampleCorrelation(seriesX, seriesY).toFixed(2);
}

export const euclidean = (seriesX, seriesY) => {
    return euclideanDistance(seriesX, seriesY).toFixed(2);
}

export const mean = (series) => {
    return stat.mean(series).toFixed(2);
}

export const median = (series) => {
    return stat.median(series).toFixed(2);
}

export const mode = (series) => {
    return stat.mode(series).toFixed(2);
}

export const sd = (series) => {
    return stat.sampleStandardDeviation(series).toFixed(2);
}

export const naiveBayes = {
    train: (series, category) => {
        let bayes = new stat.BayesianClassifier();
        series.forEach(s => {
            bayes.train(s, category);
        })
        return bayes;
    },

    score: (item, classifier) => {
        return classifier.score(item);
    }
}