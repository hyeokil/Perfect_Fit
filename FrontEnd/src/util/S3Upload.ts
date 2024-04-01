// import AWS from "aws-sdk";
import AWS from "aws-sdk";

// const blobToFile = (blob) => {
//   // Blob에서 File을 생성합니다.
//   const file = new File([blob], 'music.mp3', { type: 'audio/mp3' }); // 파일 이름과 MIME 타입을 지정합니다.
//   return file;
// };
//------------------------------------------------------
const S3Upload = (blob: Blob) => {
  // Blob을 File로 변환합니다.
  // const file = blobToFile(blob);

  //----------기본 정보----------------------------------
  console.log("env, ", import.meta.env.VITE_REGION);
  console.log("env, ", import.meta.env.VITE_ACCESS_KEY_ID);
  console.log("env, ", import.meta.env.VITE_SECRET_ACCESS_KEY_ID);
  const REGION = import.meta.env.VITE_REGION;
  const ACCESS_KEY_ID = import.meta.env.VITE_ACCESS_KEY_ID;
  const SECRET_ACCESS_KEY_ID = import.meta.env.VITE_SECRET_ACCESS_KEY_ID;
  const BUCKET = import.meta.env.VITE_BUCKET;
  AWS.config.update({
    region: REGION,
    credentials: new AWS.Credentials(ACCESS_KEY_ID, SECRET_ACCESS_KEY_ID),
  });
  const s3 = new AWS.S3({
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY_ID,
    region: REGION,
  });

  //-----------------------------------------------------

  const uploadParams = {
    ACL: "private",
    Bucket: BUCKET,
    Key: `helpme`, // 업로드될 파일의 키 설정
    Body: blob, // 변환된 File 객체를 사용합니다.
  };

  const upload = s3.upload(uploadParams);

  upload
    .promise()
    .then((res) => {
      console.log(res);
      console.log("업로드 성공");
    })
    .catch((err) => {
      console.error("업로드 실패:", err);
    });
};

export default S3Upload;
