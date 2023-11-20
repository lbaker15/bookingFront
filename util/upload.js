import AWS from 'aws-sdk';

export const uploadFunc = async (result) => {
  const arr = [];
  const newS3 = new AWS.S3();

  for (const item of result) {
    if (item.image) {
      const str = String('photos/' + item.image);
      const data2 = await newS3.getObject({ Bucket: 'imageuploads1892', Key: str }).promise();
      arr.push(Buffer.from(data2.Body).toString('base64'));
      item.imgUrl = Buffer.from(data2.Body).toString('base64');
    }
  }

  return { results: result, images: arr };
};
