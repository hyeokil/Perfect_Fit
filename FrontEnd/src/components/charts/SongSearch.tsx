import axios from "axios";
import React, { useEffect, useState } from "react";
import BottomSheet from "./BottomSheet";
import { useSongStore } from "@/store/useSongStore";

const SongSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recentSearches, setRecentSearches] = useState<Set<string>>(new Set());
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showRecentSearches, setShowRecentSearches] = useState<boolean>(true);
  const [showResults, setShowResults] = useState<boolean>(false);
  const setSelectedSong = useSongStore((state) => state.setSelectedSong); // useSongStore에서 setSelectedSong 함수를 가져옵니다.
  const selectedSong = useSongStore((state) => state.selectedSong);

  const openBottomSheet = (song: any) => {
    setSelectedSong(song);
  };

  const closeBottomSheet = () => {
    setSelectedSong(null);
  };

  // 로컬 스토리지에서 최근 검색어 불러오기
  useEffect(() => {
    const storedSearches = localStorage.getItem("songRecentSearches");
    if (storedSearches) {
      setRecentSearches(new Set(JSON.parse(storedSearches)));
    }
  }, []);

  // 검색어 입력 핸들러
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // 검색 실행 핸들러
  const executeSearch = async (keyword: string) => {
    if (keyword.trim() !== "") {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.error("토큰이 없습니다");
          return;
        }

        const response = await axios.get(
          `https://j10c205.p.ssafy.io/api/v1/song/search/${keyword}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data)

        setSearchResults(response.data.dataBody);
        setShowResults(true);
        setShowRecentSearches(false);

        // 최근 검색어 업데이트
        const updatedSearches = new Set(
          [keyword, ...Array.from(recentSearches)].slice(0, 10)
        );
        setRecentSearches(updatedSearches);
        localStorage.setItem(
          "songRecentSearches",
          JSON.stringify(Array.from(updatedSearches))
        );
      } catch (error) {
        console.error("검색 실패:", error);
      }
    }
  };

  // 검색 실행
  const executeSearchAndUpdate = () => {
    if (searchTerm.trim() !== "") {
      const keyword = searchTerm.trim();
      setSearchTerm("");
      executeSearch(keyword);
    }
  };

  // 엔터 키 입력 시 검색 실행
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      executeSearchAndUpdate();
    }
  };

  // 최근 검색어 클릭 시 검색 실행
  const handleRecentSearchClick = (search: string) => {
    setSearchTerm(search);
    executeSearch(search);
  };

  // 최근 검색어 삭제
  const handleDeleteRecentSearch = (search: string) => {
    const updatedSearches = new Set(
      Array.from(recentSearches).filter((item) => item !== search)
    );
    setRecentSearches(updatedSearches);
    localStorage.setItem(
      "songRecentSearches",
      JSON.stringify(Array.from(updatedSearches))
    );
  };

  return (
    <div className="search-div">
      <div className="search-container">
        <div className="search-header">
          <input
            type="text"
            placeholder="노래 제목 및 가수를 입력하세요"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <img
            src="/icon/chart/search.png"
            alt="search"
            onClick={executeSearchAndUpdate}
          />
        </div>
        {showRecentSearches && (
          <>
            <div className="search-history-header">
              <h3>최근 검색어</h3>
            </div>
            <hr />
            <div className="search-history-content">
              {Array.from(recentSearches).map((search, index) => (
                <div key={index} className="shc">
                  <p onClick={() => handleRecentSearchClick(search)}>
                    {search}
                  </p>
                  <button onClick={() => handleDeleteRecentSearch(search)}>
                    <img src="/icon/chart/cancel.png" alt="" />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      {showResults && (
        <div className="search-results">
          <h3>검색 결과</h3>
          <hr />
          {searchResults.length > 0 ? (
            <ul>
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  className="search-results-contents"
                  onClick={() => openBottomSheet(result)}
                >
                  <div className="img-border">
                    <img src={result.songThumbnail} alt="" />
                  </div>
                  <div className="results-name">
                    <h3>{result.songTitle}</h3>
                    <p>{result.artist}</p>
                  </div>
                </div>
              ))}
            </ul>
          ) : (
            <p>노래 정보가 없습니다.</p>
          )}
        </div>
      )}
      <BottomSheet
        isOpen={selectedSong !== null}
        onClose={closeBottomSheet}
        backgroundImageUrl={selectedSong ? selectedSong.songThumbnail : ""}
      >
        {selectedSong && (
          <div className="song-bottom">
            <img
              src={selectedSong.songThumbnail}
              alt={selectedSong.songTitle}
            />
            <div className="song-info">
              <h3>{selectedSong.songTitle}</h3>
              <p>{selectedSong.artist}</p>
            </div>
          </div>
        )}
      </BottomSheet>
    </div>
  );
};

export default SongSearch;
