import axios from "axios";
import React, { useEffect, useState } from "react";

const SongSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recentSearches, setResentSearches] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showRecentSearches, setShowRecentSearhces] = useState<boolean>(true);
  const [showResults, setShowResults] = useState<boolean>(false);

  // 새고해도 남아있게
  useEffect(() => {
    const storedSearches = localStorage.getItem("recentSearches");
    if (storedSearches) {
      setResentSearches(JSON.parse(storedSearches));
    }
  }, []);

  // 검색 입력
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // 검색 실행
  const execueSearch = () => {
    if (searchTerm.trim() !== "") {
      const updateSearches = [searchTerm, ...recentSearches.slice(0, 10)]; // 10개까지 저장
      setResentSearches(updateSearches);
      localStorage.setItem(
        "songRecentSearches",
        JSON.stringify(updateSearches)
      ); // 최근 검색 로컬 저장
      console.log("검색어:", searchTerm);
      setSearchTerm("");

      executeSearch(searchTerm);
    }
  };

  // 노래 api
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
        console.log(response.data.dataBody);
        setSearchResults(response.data.dataBody);
        setShowResults(true);
        setShowRecentSearhces(false);

        const updatedSearches = [keyword, ...recentSearches.slice(0, 10)];
        setResentSearches(updatedSearches);
        localStorage.setItem(
          "songRecentSearches",
          JSON.stringify(updatedSearches)
        );
      } catch (error) {
        console.error("검색 실패:", error);
      }
    }
  };

  // 검색 아이콘 클릭
  const handleSearchButtonClick = () => {
    execueSearch();
  };

  // 엔터 키 눌러도 검색 실행
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      execueSearch();
    }
  };

  // 최근 검색어 삭제
  const handleDeleteRecentSearch = (index: number) => {
    const updatedSearches = recentSearches.filter((_, idx) => idx !== index);
    setResentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  return (
    <div>
      <div className="search-container">
        <div className="search-header">
          <input
            type="text"
            placeholder="노래 제목 및 가수를 입력하세요"
            value={searchTerm} // 입력하면 초기화
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <img
            src="../../src/assets/icon/chart/search.png"
            alt="search"
            onClick={handleSearchButtonClick}
          />
        </div>
        {showRecentSearches && (
          <>
            <div className="search-history-header">
              <h3>최근 검색어</h3>
              <p>1시간 전 업데이트</p>
            </div>
            <hr />
            <div className="search-history-content">
              {recentSearches.map((search, index) => (
                <div key={index} className="shc">
                  <p>{search}</p>
                  <button onClick={() => handleDeleteRecentSearch(index)}>
                    <img src="../../src/assets/icon/chart/cancel.png" alt="" />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      {/* 검색 결과를 표시하는 부분 */}
      {showResults && (
        <div className="search-results">
          <h3>검색 결과</h3>
          <hr />
          {searchResults.length > 0 ? (
            <ul>
              {searchResults.map((result, index) => (
                <div key={index} className="search-results-contents">
                  <div className="img-border">
                    <img src={result.image} alt="" />
                  </div>
                  <div className="results-name">
                    <h3>{result.nickname}</h3>
                    <p>{result.email}</p>
                  </div>
                </div>
              ))}
            </ul>
          ) : (
            <p>노래 정보가 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SongSearch;
