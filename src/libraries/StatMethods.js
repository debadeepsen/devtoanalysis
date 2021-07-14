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

export const ml = {
    classifier: {
        regression: () => {
            // let x = new Array(100);
            // let y = new Array(100);
            // let val = 0.0;
            // for (let i = 0; i < x.length; ++i) {
            //     x[i] = val;
            //     y[i] = Math.sin(x[i]);
            //     val += 0.01;
            // }

            // let reg = new ML.DTRegression();
            // reg.train(x, y);
            // let estimations = reg.predict(x);

            // return estimations;

            return { Number: 1, class: Number };
        }
    }
}