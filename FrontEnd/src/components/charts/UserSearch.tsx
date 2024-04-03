import axios from "axios";
import React, { useEffect, useState } from "react";


const UserSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recentSearches, setRecentSearches] = useState<Set<string>>(new Set());
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showRecentSearches, setShowRecentSearches] = useState<boolean>(true);
  const [showResults, setShowResults] = useState<boolean>(false);

  // 로컬 스토리지에서 최근 검색어 불러오기
  useEffect(() => {
    const storedSearches = localStorage.getItem("userRecentSearches");
    if (storedSearches) {
      setRecentSearches(new Set(JSON.parse(storedSearches)));
    }
  }, []);

  // 검색 입력 핸들러
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // 유저 api 검색 실행
  const executeSearch = async (term: string) => {
    if (term.trim() !== "") {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.error("토큰이 없습니다");
          return;
        }

        const response = await axios.get(
          `https://j10c205.p.ssafy.io/api/v1/member/search/${term}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSearchResults(response.data.dataBody);
        setShowResults(true);
        setShowRecentSearches(false);

        // 최근 검색어 업데이트
        const updatedSearches = new Set([term, ...Array.from(recentSearches)].slice(0, 10));
        setRecentSearches(updatedSearches);
        localStorage.setItem("userRecentSearches", JSON.stringify(Array.from(updatedSearches)));
      } catch (error) {
        console.error("검색 실패:", error);
      }
    }
  };

  // 검색 실행
  const executeSearchAndUpdate = () => {
    if (searchTerm.trim() !== "") {
      executeSearch(searchTerm);
      setSearchTerm(""); // 검색어 초기화
    }
  };

  // 검색 아이콘 클릭 핸들러
  const handleSearchButtonClick = () => {
    executeSearchAndUpdate();
  };

  // 엔터 키 입력 시 검색 실행
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      executeSearchAndUpdate();
    }
  };

  // 최근 검색어 삭제
  const handleDeleteRecentSearch = (search: string) => {
    const updatedSearches = new Set(Array.from(recentSearches).filter(item => item !== search));
    setRecentSearches(updatedSearches);
    localStorage.setItem("userRecentSearches", JSON.stringify(Array.from(updatedSearches)));
  };

  // 최근 검색어 클릭 시 검색 실행
  const handleRecentSearchClick = (search: string) => {
    setSearchTerm(search); // 검색어 설정
    executeSearch(search); // 검색 실행
  };

  return (
    <div>
      <div className="search-container">
        <div className="search-header">
          <input
            type="text"
            placeholder="닉네임을 검색 해 주세요"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <img
            src="/icon/chart/search.png"
            alt="search"
            onClick={handleSearchButtonClick}
          />
        </div>
        {/* 검색 전 최근 검색어 */}
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
            <p>유저 정보가 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserSearch;
