import { useEffect, useRef } from "react";
import RecordRTC from "recordrtc";

const RecordRtc = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const recordRef = useRef<RecordRTC | null>(null);

  useEffect(() => {
    async function startRecording() {
      if (divRef.current) {
        // RecordRTC로 녹화 시작
        recordRef.current = new RecordRTC(divRef.current, {
          type: 'canvas',
          mimeType: 'video/webm',
        });
        recordRef.current.startRecording();
      }
    }

    startRecording();

    // Clean-up
    return () => {
      if (recordRef.current) {
        recordRef.current.stopRecording(() => {
          // 녹화가 종료되면 녹화된 비디오를 다운로드합니다.
          recordRef.current?.save('recorded-video.webm');
        });
      }
    };
  }, []);

  const stopRecording = () => {
    if (recordRef.current) {
      recordRef.current.stopRecording(() => {
        // 녹화가 종료되면 녹화된 비디오를 다운로드합니다.
        recordRef.current?.save('recorded-video.webm');
      });
    }
  };

  return (
    <div>
      <div ref={divRef} style={{ width: '800px', height: '600px', border: '1px solid black' }}>
        {/* 여기에 녹화할 컨텐츠를 포함시키세요 */}
      </div>
      <button onClick={stopRecording}>Stop Recording</button>
    </div>
  );
};

export default RecordRtc;
