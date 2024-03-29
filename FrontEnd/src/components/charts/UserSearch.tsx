import axios from "axios";
import React, { useEffect, useState } from "react";

const UserSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recentSearches, setResentSearches] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]); // 검색 결과를 저장할 배열
  const [showRecentSearches, setShowRecentSearhces] = useState<boolean>(true); // 최근 검색어 on off
  const [showResults, setShowResults] = useState<boolean>(false); // 검색 결과 on off

  // 새고해도 남아있게
  useEffect(() => {
    const storedSearches = localStorage.getItem("userRecentSearches");
    if (storedSearches) {
      setResentSearches(JSON.parse(storedSearches));
    }
  }, []);

  // 검색 입력
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // 유저 api
  const executeSearch = async (term: string) => {
    if (term.trim() !== "") {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.error("토큰이 없습니다");
          return;
        }

        const response = await axios.get(
          `http://j10c205.p.ssafy.io:9002/api/v1/member/search/${term}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.dataBody);
        setSearchResults(response.data.dataBody);
        setShowResults(true); // 검색 완료시 검색 결과 화면 on
        setShowRecentSearhces(false); // 검색 완료시 최근 검색어 off

        // 검색을 실행할 때마다 최신 검색어를 로컬 저장소에 저장합니다.
        const updatedSearches = [term, ...recentSearches.slice(0, 10)];
        setResentSearches(updatedSearches);
        localStorage.setItem(
          "userRecentSearches",
          JSON.stringify(updatedSearches)
        );
      } catch (error) {
        console.error("검색 실패:", error);
      }
    }
  };

  // 검색 실행
  const execueSearch = () => {
    if (searchTerm.trim() !== "") {
      const updateSearches = [searchTerm, ...recentSearches.slice(0, 10)]; // 10개까지 저장
      setResentSearches(updateSearches);
      localStorage.setItem(
        "userRecentSearches",
        JSON.stringify(updateSearches)
      ); // 최근 검색 로컬 저장
      console.log("유저 검색:", searchTerm);
      setSearchTerm("");

      executeSearch(searchTerm);
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
    localStorage.setItem("userRecentSearches", JSON.stringify(updatedSearches));
  };

  // 최근 검색어 클릭시 검색 실행
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
            src="../../src/assets/icon/chart/search.png"
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
              {recentSearches.map((search, index) => (
                <div key={index} className="shc">
                  <p onClick={() => handleRecentSearchClick(search)}>
                    {search}
                  </p>
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
            <p>유저 정보가 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserSearch;
