import useRecordStore from "@/store/useRecordStore";

const Preview = () => {
  const { displayUrl, musicUrl } = useRecordStore();
  console.log(displayUrl);
  console.log(musicUrl);
  return (
    <div>
      {displayUrl && musicUrl && (
        <>
          <video src={displayUrl} controls />
          <audio src={musicUrl} />
        </>
      )}
    </div>
  );
};

export default Preview;
