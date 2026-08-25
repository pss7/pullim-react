import { useRef } from 'react';

import '../styles/sub.css';
import styles from './News.module.css';

import Main from '../components/layout/Main';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

import useSubMotion from '../hooks/useSubMotion';
import { Link } from 'react-router-dom';

export default function News() {
  const pageRef = useRef(null);

  /* 뉴스 페이지 모션 */
  useSubMotion(pageRef, false);

  return (
    <div
      ref={pageRef}
      id="wrap"
      className={styles.newsWrap}
    >
      <Header
        logoSrc="/images/common/logo.svg"
      />

      {/* 서브 영역 */}
      <Main id="subWrap">
        {/* 상단 영역 */}
        <div className="subTopBox">
          <div className="container">
            <div className="topTitleBox">
              <h2>
                NEWS
              </h2>

              <p className="topText01">
                WHAT’S HAPPENING
                <br />
                AT PULLIM
              </p>

              <p className="topText02">
                트렌디한 비즈니스 소식부터 크고 작은 사내
                행사, 구성원들의 생생한 오피스 라이프까지
                <br />
                우리가 함께 도전하고 성장해 나가는 다채롭고
                자유로운 이야기들을 전합니다
              </p>
            </div>
          </div>
        </div>
        {/* //상단 영역 */}

        {/* 서브 콘텐츠 영역 */}
        <div className="subContentBox">
          {/* 뉴스 영역 */}
          <div className="newsBox">
            <div className="container">
              {/* 탭 버튼 영역 */}
              <div
                className={
                  styles.newsTabBox
                }
              >
                <button
                  type="button"
                  className={`
                    ${styles.newsTabBtn}
                    ${styles.active}
                  `}
                >
                  ALL
                </button>

                <button
                  type="button"
                  className={
                    styles.newsTabBtn
                  }
                >
                  #Culutre
                </button>

                <button
                  type="button"
                  className={
                    styles.newsTabBtn
                  }
                >
                  #Business
                </button>

                <button
                  type="button"
                  className={
                    styles.newsTabBtn
                  }
                >
                  #People
                </button>
              </div>
              {/* //탭 버튼 영역 */}

              {/* 탭 콘텐츠 영역 */}
              <ul
                className={
                  styles.newsList
                }
              >
                <li className="newsItem">
                  <Link
                    to="/news-detail"
                    className="newsLink">
              
                    <div
                      className={
                        styles.newsTopBox
                      }
                    >
                      <span
                        className={
                          styles.newsCategory
                        }
                      >
                        #Culture
                      </span>

                      <span
                        className={
                          styles.newsDate
                        }
                      >
                        26 / 01.09
                      </span>
                    </div>

                    <p
                      className={
                        styles.newsTitle
                      }
                    >
                      The Pullim, 2026
                      <br />
                      New Office Tour
                    </p>

                    <div
                      className={
                        styles.newsImgBox
                      }
                    >
                      <img
                        src="/images/sub/news_img01.jpg"
                        alt=""
                      />
                    </div>
                  </Link>
                </li>

                <li className="newsItem">
                  <Link
                    to="/news-detail"
                    className="newsLink">
              
                    <div
                      className={
                        styles.newsTopBox
                      }
                    >
                      <span
                        className={
                          styles.newsCategory
                        }
                      >
                        #Business
                      </span>

                      <span
                        className={
                          styles.newsDate
                        }
                      >
                        26 / 01.09
                      </span>
                    </div>

                    <p
                      className={
                        styles.newsTitle
                      }
                    >
                      Performance Marketing의
                      <br />
                      새로운 기준을 만들다
                    </p>

                    <div
                      className={
                        styles.newsImgBox
                      }
                    >
                      <img
                        src="/images/sub/news_img02.jpg"
                        alt=""
                      />
                    </div>
                  </Link>
                </li>

                <li className="newsItem">
                  <Link
                    to="/news-detail"
                    className="newsLink">
              
                    <div
                      className={
                        styles.newsTopBox
                      }
                    >
                      <span
                        className={
                          styles.newsCategory
                        }
                      >
                        #Business
                      </span>

                      <span
                        className={
                          styles.newsDate
                        }
                      >
                        26 / 01.09
                      </span>
                    </div>

                    <p
                      className={
                        styles.newsTitle
                      }
                    >
                      데이터로 발견하고,
                      <br />
                      크리에이티브로 완성하다
                    </p>

                    <div
                      className={
                        styles.newsImgBox
                      }
                    >
                      <img
                        src="/images/sub/news_img03.jpg"
                        alt=""
                      />
                    </div>
                  </Link>
                </li>

                <li className="newsItem">
                  <Link
                    to="/news-detail"
                    className="newsLink">
              
                    <div
                      className={
                        styles.newsTopBox
                      }
                    >
                      <span
                        className={
                          styles.newsCategory
                        }
                      >
                        #People
                      </span>

                      <span
                        className={
                          styles.newsDate
                        }
                      >
                        26 / 01.09
                      </span>
                    </div>

                    <p
                      className={
                        styles.newsTitle
                      }
                    >
                      Our People, Our Growth
                      <br />
                      성장을 만드는 사람들
                    </p>

                    <div
                      className={
                        styles.newsImgBox
                      }
                    >
                      <img
                        src="/images/sub/news_img04.jpg"
                        alt=""
                      />
                    </div>
                  </Link>
                </li>

                <li className="newsItem">
                  <Link
                    to="/news-detail"
                    className="newsLink">
              
                    <div
                      className={
                        styles.newsTopBox
                      }
                    >
                      <span
                        className={
                          styles.newsCategory
                        }
                      >
                        #Business
                      </span>

                      <span
                        className={
                          styles.newsDate
                        }
                      >
                        26 / 01.09
                      </span>
                    </div>

                    <p
                      className={
                        styles.newsTitle
                      }
                    >
                      2026 상반기
                      <br />
                      주요 프로젝트 하이라이트
                    </p>

                    <div
                      className={
                        styles.newsImgBox
                      }
                    >
                      <img
                        src="/images/sub/news_img05.jpg"
                        alt=""
                      />
                    </div>
                  </Link>
                </li>

                <li className="newsItem">
                  <Link
                    to="/news-detail"
                    className="newsLink">
              
                    <div
                      className={
                        styles.newsTopBox
                      }
                    >
                      <span
                        className={
                          styles.newsCategory
                        }
                      >
                        #Business
                      </span>

                      <span
                        className={
                          styles.newsDate
                        }
                      >
                        26 / 01.09
                      </span>
                    </div>

                    <p
                      className={
                        styles.newsTitle
                      }
                    >
                      브랜드 성장을 이끄는
                      <br />
                      전략적 크리에이티브
                    </p>

                    <div
                      className={
                        styles.newsImgBox
                      }
                    >
                      <img
                        src="/images/sub/news_img06.jpg"
                        alt=""
                      />
                    </div>
                  </Link>
                </li>

                <li className="newsItem">
                  <Link
                    to="/news-detail"
                    className="newsLink">
              
                    <div
                      className={
                        styles.newsTopBox
                      }
                    >
                      <span
                        className={
                          styles.newsCategory
                        }
                      >
                        #People
                      </span>

                      <span
                        className={
                          styles.newsDate
                        }
                      >
                        26 / 01.09
                      </span>
                    </div>

                    <p
                      className={
                        styles.newsTitle
                      }
                    >
                      우리가 AI를 실무에 활용하는 방식
                    </p>

                    <div
                      className={
                        styles.newsImgBox
                      }
                    >
                      <img
                        src="/images/sub/news_img07.jpg"
                        alt=""
                      />
                    </div>
                  </Link>
                </li>

                <li className="newsItem">
                  <Link
                    to="/news-detail"
                    className="newsLink">
              
                    <div
                      className={
                        styles.newsTopBox
                      }
                    >
                      <span
                        className={
                          styles.newsCategory
                        }
                      >
                        #Business
                      </span>

                      <span
                        className={
                          styles.newsDate
                        }
                      >
                        26 / 01.09
                      </span>
                    </div>

                    <p
                      className={
                        styles.newsTitle
                      }
                    >
                      The Pullim,
                      <br />
                      새로운 파트너십을 시작합니다
                    </p>

                    <div
                      className={
                        styles.newsImgBox
                      }
                    >
                      <img
                        src="/images/sub/news_img08.jpg"
                        alt=""
                      />
                    </div>
                  </Link>
                </li>

                <li className="newsItem">
                  <Link
                    to="/news-detail"
                    className="newsLink">
              
                    <div
                      className={
                        styles.newsTopBox
                      }
                    >
                      <span
                        className={
                          styles.newsCategory
                        }
                      >
                        ##Culutre
                      </span>

                      <span
                        className={
                          styles.newsDate
                        }
                      >
                        26 / 01.09
                      </span>
                    </div>

                    <p
                      className={
                        styles.newsTitle
                      }
                    >
                      아이디어가 모여
                      <br />
                      성과로 이어지는 공간
                    </p>

                    <div
                      className={
                        styles.newsImgBox
                      }
                    >
                      <img
                        src="/images/sub/news_img09.jpg"
                        alt=""
                      />
                    </div>
                  </Link>
                </li>

                <li className="newsItem">
                  <Link
                    to="/news-detail"
                    className="newsLink">
              
                    <div
                      className={
                        styles.newsTopBox
                      }
                    >
                      <span
                        className={
                          styles.newsCategory
                        }
                      >
                        #People
                      </span>

                      <span
                        className={
                          styles.newsDate
                        }
                      >
                        26 / 01.09
                      </span>
                    </div>

                    <p
                      className={
                        styles.newsTitle
                      }
                    >
                      더 넓은 세상을 향한
                      <br />
                      Pullim의 도전과 여정
                    </p>

                    <div
                      className={
                        styles.newsImgBox
                      }
                    >
                      <img
                        src="/images/sub/news_img10.jpg"
                        alt=""
                      />
                    </div>
                  </Link>
                </li>

                <li className="newsItem">
                  <Link
                    to="/news-detail"
                    className="newsLink">
              
                    <div
                      className={
                        styles.newsTopBox
                      }
                    >
                      <span
                        className={
                          styles.newsCategory
                        }
                      >
                        #People
                      </span>

                      <span
                        className={
                          styles.newsDate
                        }
                      >
                        26 / 01.09
                      </span>
                    </div>

                    <p
                      className={
                        styles.newsTitle
                      }
                    >
                      Meet the Team
                      <br />
                      Behind the Growth
                    </p>

                    <div
                      className={
                        styles.newsImgBox
                      }
                    >
                      <img
                        src="/images/sub/news_img11.jpg"
                        alt=""
                      />
                    </div>
                  </Link>
                </li>

                <li className="newsItem">
                  <Link
                    to="/news-detail"
                    className="newsLink">
              
                    <div
                      className={
                        styles.newsTopBox
                      }
                    >
                      <span
                        className={
                          styles.newsCategory
                        }
                      >
                        #Culutre
                      </span>

                      <span
                        className={
                          styles.newsDate
                        }
                      >
                        26 / 01.09
                      </span>
                    </div>

                    <p
                      className={
                        styles.newsTitle
                      }
                    >
                      기획부터 실행까지,
                      <br />
                      Pullim의 일하는 프로세스
                    </p>

                    <div
                      className={
                        styles.newsImgBox
                      }
                    >
                      <img
                        src="/images/sub/news_img12.jpg"
                        alt=""
                      />
                    </div>
                  </Link>
                </li>
              </ul>
              {/* //탭 콘텐츠 영역 */}

              <button
                type="button"
                className={
                  styles.newsLoadMoreBtn
                }
              >
                LOAD MORE
              </button>
            </div>
          </div>
          {/* //뉴스 영역 */}
        </div>
        {/* //서브 콘텐츠 영역 */}
      </Main>
      {/* //서브 영역 */}

      <Footer />
    </div>
  );
}