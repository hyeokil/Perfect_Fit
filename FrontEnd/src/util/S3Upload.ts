import AWS from "aws-sdk";
const s3 = new AWS.S3()
const S3Upload = (musicUrl: string, type : string) => {
  if (type === 'audio') {

  }
  const upLoadS3 = (formData: any) => {
    //----------기본 정보----------------------------------
    const REGION = import.meta.env.REGION;
    const ACCESS_KEY_ID = import.meta.env.ACCESS_KEY_ID;
    const SECRET_ACCESS_KEY_ID = import.meta.env.SECRET_ACCESS_KEY_ID;

    AWS.config.update({
      region: REGION,
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACCESS_KEY_ID,
    });
//----------------------------------------------------------------------------- 
    const upload = new AWS.S3.ManagedUpload({
      params: {
        ACL: "public-read",
        Bucket: "실제 버킷명",
        Key: `.video/비디오 이름:사용자-노래이름-영상번호?`,
        Body: `업로드할 파일의 내용!`,
      },
    });
    

    
    upload.promise()
    .then( () =>
      console.log('업로드 했다이씨.......................')
    )
  };
};

export default S3Upload;
