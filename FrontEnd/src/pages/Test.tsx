import AWS from "aws-sdk";
const currentDate = new Date();
const timestamp = currentDate.toISOString().replace(/:/g, "-");

const S3test = (audio :Blob | File): Promise<string> => {
  // 환경 변수 설정
  const REGION = import.meta.env.VITE_REGION;
  const ACCESS_KEY_ID = import.meta.env.VITE_ACCESS_KEY_ID;
  const SECRET_ACCESS_KEY_ID = import.meta.env.VITE_SECRET_ACCESS_KEY_ID;
  const BUCKET = import.meta.env.VITE_BUCKET;

  // AWS 설정
  AWS.config.update({
    region: REGION,
    credentials: new AWS.Credentials(ACCESS_KEY_ID, SECRET_ACCESS_KEY_ID),
  });
  const s3 = new AWS.S3({
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY_ID,
    region: REGION,
  });

  // 업로드 매개변수 설정
  const uploadParams = {
    ACL: "private",
    Bucket: BUCKET,
    Key: `voicerecord/${timestamp}.wav`,
    Body: audio,
  };

  // S3 업로드 프로미스 반환
  return s3
    .upload(uploadParams)
    .promise()
    .then((res) => {
      console.log("업로드 성공");
      return res.Location; // 업로드 성공 시 Location 반환
    })
    .catch((err) => {
      console.error("업로드 실패:", err);
      throw err; // 에러 발생 시 예외 던지기
    });
};

export default S3test;
