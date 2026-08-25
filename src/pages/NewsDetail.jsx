import { Link } from 'react-router-dom';

import styles from './News.module.css';
import '../styles/sub.css';

import Main from '../components/layout/Main';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function NewsDetail() {
  return (
    <div
      id="wrap"
      className={styles.newsWrap}
    >
      <Header
        logoSrc="/images/common/logo.svg"
      />

      {/* 서브 영역 */}
      <Main id="subWrap">
        {/* 서브 콘텐츠 영역 */}
        <div className="subContentBox">
          {/* 뉴스 영역 */}
          <div className="newsBox">
            <div className="container">
              {/* 뉴스 상세 영역 */}
              <div className={styles.newsViewBox}>
                {/* 뉴스 상세 상단 영역 */}
                <header
                  className={
                    styles.newsViewHeaderBox
                  }
                >
                  <Link
                    to="/news"
                    className={
                      styles.newsViewBackLink
                    }
                  >
                    {'<-- BACK'}
                  </Link>

                  <span
                    className={
                      styles.newsViewCategory
                    }
                  >
                    #Business
                  </span>

                  <div
                    className={
                      styles.newsViewDate
                    }
                  >
                    26 / 01.09
                  </div>
                </header>
                {/* //뉴스 상세 상단 영역 */}

                {/* 뉴스 상세 콘텐츠 영역 */}
                <div
                  className={
                    styles.newsViewContentBox
                  }
                >
                  <div className="container">
                    <h1
                      className={
                        styles.newsViewTitle
                      }
                    >
                      Performance Marketing의
                      <br />
                      새로운 기준을 만들다
                    </h1>

                    <div
                      className={
                        styles.newsViewImgBox
                      }
                    >
                      <img
                        src="/images/sub/news_view_img01.jpg"
                        alt=""
                      />
                    </div>

                    <p
                      className={
                        styles.newsViewText
                      }
                    >
                      Performance Marketing은 더 이상
                      단순히 노출, 클릭, 전환만을 측정하는
                      시대를 넘어섰습니다. 오늘날의 마케팅은
                      데이터 분석과 크리에이티브, 그리고 고객
                      경험이 하나로 연결될 때 비로소 지속
                      가능한 성과를 만들어낼 수 있습니다. 더
                      풀림은 고객의 비즈니스 목표를 함께
                      설계하며, 성과를 넘어 브랜드의
                      장기적인 성장을 만드는 Performance
                      Marketing을 제안합니다.
                    </p>

                    <div
                      className={
                        styles.newsViewImgBox
                      }
                    >
                      <img
                        src="/images/sub/news_view_img02.jpg"
                        alt=""
                      />
                    </div>

                    <h2
                      className={
                        styles.newsViewSubTitle
                      }
                    >
                      우리는 광고 캠페인의 성과만을 관리하지
                      않습니다.
                    </h2>

                    <p
                      className={
                        styles.newsViewText
                      }
                    >
                      시장 환경과 고객의 행동 데이터를
                      분석하고, 브랜드가 가진 강점을 발견하여
                      실질적인 비즈니스 성장으로 이어질 수
                      있는 전략을 설계합니다. 단기적인
                      로스보다 장기적인 브랜드 가치와 고객
                      경험을 함께 고려하는 것이 새로운
                      Performance Marketing의 기준입니다.
                    </p>
                  </div>
                </div>
                {/* //뉴스 상세 콘텐츠 영역 */}

                {/* 뉴스 상세 이동 영역 */}
                <nav
                  className={
                    styles.newsViewNavBox
                  }
                  aria-label="뉴스 상세 페이지 이동"
                >
                  {/* 이전 글 */}
                  <Link
                    to="/news/1"
                    className={`
                      ${styles.newsViewNavLink}
                      ${styles.newsViewPrevLink}
                    `}
                  >
                    <span
                      className={
                        styles.newsViewNavLabel
                      }
                    >
                      [ PREV. ]
                    </span>

                    <span
                      className={
                        styles.newsViewNavTitle
                      }
                    >
                      The Pullim, 2026 New Office
                      Tour
                    </span>
                  </Link>
                  {/* //이전 글 */}

                  {/* 목록 이동 */}
                  <Link
                    to="/news"
                    className={
                      styles.newsViewListLink
                    }
                  >
                    GO TO LIST
                  </Link>
                  {/* //목록 이동 */}

                  {/* 다음 글 */}
                  <Link
                    to="/news/3"
                    className={`
                      ${styles.newsViewNavLink}
                      ${styles.newsViewNextLink}
                    `}
                  >
                    <span
                      className={
                        styles.newsViewNavLabel
                      }
                    >
                      [ NEXT. ]
                    </span>

                    <span
                      className={
                        styles.newsViewNavTitle
                      }
                    >
                      데이터로 발견하고, 크리에이티브로
                      완성하다
                    </span>
                  </Link>
                  {/* //다음 글 */}
                </nav>
                {/* //뉴스 상세 이동 영역 */}
              </div>
              {/* //뉴스 상세 영역 */}
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