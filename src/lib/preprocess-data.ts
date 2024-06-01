import * as tf from '@tensorflow/tfjs-node';

export function preprocessData(data: Array<any>) {
    // 데이터 전처리: 필요한 속성들을 추출
    const features = data.map(row => [row.typeId, row.body, row.alcohol, row.acidity, row.sweetness, row.tannin]);
    const labels = data.map(row => row.ratingAverage);  // 예제로 ratingAverage 사용

    // TensorFlow.js 텐서로 변환
    const featureTensor = tf.tensor2d(features);
    const labelTensor = tf.tensor2d(labels, [labels.length, 1]);

    // 데이터셋을 훈련셋과 테스트셋으로 분할
    const trainSize = Math.floor(features.length * 0.8);
    const trainData = featureTensor.slice([0, 0], [trainSize, -1]);
    const testData = featureTensor.slice([trainSize, 0], [features.length - trainSize, -1]);
    const trainLabels = labelTensor.slice([0, 0], [trainSize, -1]);
    const testLabels = labelTensor.slice([trainSize, 0], [labels.length - trainSize, -1]);

    return { trainData, trainLabels, testData, testLabels };
}
