import * as tf from '@tensorflow/tfjs-node'

/**
 * DeepFM 모델 생성하는 함수
 * @param {number} row 데이터 행수를 입력합니다
 * @returns DeepFM 모델을 리턴합니다
 */
export function createDeepFmModel(row) {
    // DeepFM 모델 정의
    const input = tf.input({ shape: [6] });

    // 선형 부분
    const linearPart = tf.layers.dense({ units: 1, useBias: false }).apply(input);

    // FM 부분
    const embedding= tf.layers.embedding({ inputDim: row - 2, outputDim: 4 }).apply(input);
    const fmPart = tf.layers.dot({ axes: -1 }).apply([embedding, embedding]);

    // DNN 부분
    const dnnPart = tf.layers.dense({ units: 128, activation: 'relu' }).apply(input);
    const dnnOutput = tf.layers.dense({ units: 1 }).apply(dnnPart);

    // 출력층
    const output = tf.layers.add().apply([linearPart, fmPart, dnnOutput]);
    const model = tf.model({ inputs: input, outputs: output });

    model.compile({
        optimizer: tf.train.adam(),
        loss: 'binaryCrossentropy',
        metrics: ['accuracy']
    });

    return model;
}