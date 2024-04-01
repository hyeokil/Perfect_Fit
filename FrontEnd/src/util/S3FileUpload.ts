import AWS from 'aws-sdk';

// AWS 구성 설정
AWS.config.update({
  region: '리전', // 예: 'us-west-2'
  credentials: new AWS.Credentials('엑세스키ID', '시크릿엑세스키')
});

const s3 = new AWS.S3();

export const blobToFile = (theBlob : Blob, fileName:string) => {
  return new File([theBlob], fileName, {type : theBlob.type})
}

export const uploadBlobToS3 = async (blob:Blob, bucketName:string, fileName:string) => {
  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: blob,
    ContentType: blob.type
  };

  return s3.upload(params).promise();
};
// AWS.config.update({
//   region: 'your-region', // 예: 'us-west-2'
//   credentials: new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: 'your-identity-pool-id'
//   })
// });

// const s3 = new AWS.S3({
//   apiVersion: '2006-03-01',
//   params: { Bucket: 'your-bucket-name' }
// });

// export const uploadToS3 = (file: Blob) => {
//   const fileName = `audio-${Date.now()}.webm`;
//   const upload = new AWS.S3.ManagedUpload({
//     params: {
//       Bucket: 'your-bucket-name',
//       Key: fileName,
//       Body: file,
//       ContentType: 'audio/webm'
//     }
//   });

//   const promise = upload.promise();

//   promise.then(
//     function(data) {
//       console.log("업로드 성공:", data.Location);
//     },
//     function(err) {
//       return console.log("업로드 오류:", err.message);
//     }
//   );
// };
