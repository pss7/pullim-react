import {
  useEffect,
  useRef,
  useState
} from 'react';

import styles from './Team.module.css';

import Main from '../components/layout/Main';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

import useSubMotion from '../hooks/useSubMotion';

export default function Team() {
  const pageRef = useRef(null);

  const [
    activeInterview,
    setActiveInterview
  ] = useState(null);

  useSubMotion(pageRef, false);

  /* 인터뷰 팝업 배경 스크롤 제어 */
  useEffect(() => {
    document.body.classList.toggle(
      'popupVideoOpen',
      activeInterview !== null
    );

    return function () {
      document.body.classList.remove(
        'popupVideoOpen'
      );
    };
  }, [activeInterview]);

  return (
    <>
      <div
        ref={pageRef}
        id="wrap"
        className={styles.teamWrap}
      >
        <Header
          logoSrc="/images/common/logo03.svg"
        />

        {/* 서브 영역 */}
        <Main id="subWrap">
          {/* 상단 영역 */}
          <div className="subTopBox">
            <div className="container">
              <div className="topTitleBox">
                <h2>
                  TEAM
                </h2>

                <p className="topText01">
                  THE MOVERS AND SHAKERS
                </p>

                <p className="topText02">
                  우리는 정교한 애드테크 기술력을
                  다루는 전문가인 동시에
                  <br />
                  끊임없이 새로운 비즈니스 영역에
                  도전하는 플레이어들입니다.
                  <br />
                  <br />

                  <span>
                    정답이 정해지지 않은 시장에서
                    날카로운 분석과 과감한 실행력으로
                    <br />
                    고객사가 기대하는 것 그 이상의
                    성공을 실제로 증명해 냅니다.
                  </span>
                </p>
              </div>
            </div>
          </div>
          {/* //상단 영역 */}

          {/* 서브 콘텐츠 영역 */}
          <div className="subContentBox">
            {/* 팀 영역 */}
            <div className={styles.teamBox}>
              <div className="container">
                {/* 팀원 목록 */}
                <ul
                  className={
                    styles.teamMemberList
                  }
                  data-aos="fade-up"
                >
                  <li
                    className={
                      styles.teamMemberItem
                    }
                  >
                    <a
                      href="#"
                      className={
                        styles.teamMemberLink
                      }
                    >
                      <div
                        className={
                          styles.teamMemberImgBox
                        }
                      >
                        <img
                          src="/images/sub/profile_img01.jpg"
                          alt=""
                        />
                      </div>

                      <div
                        className={
                          styles.teamMemberTextBox
                        }
                      >
                        <h3>
                          경영지원팀
                        </h3>
                      </div>

                      <div
                        className={
                          styles.teamInfoHoverBox
                        }
                      >
                        <h3>
                          경영지원팀
                        </h3>

                        <p>
                          최고의 인재들을 모으고,
                          더 풀림의 크루들이 지치지
                          않고 끊임없이 성장할 수
                          있는 여정을 설계합니다.
                        </p>
                      </div>
                    </a>
                  </li>

                  <li
                    className={
                      styles.teamMemberItem
                    }
                  >
                    <a
                      href="#"
                      className={
                        styles.teamMemberLink
                      }
                    >
                      <div
                        className={
                          styles.teamMemberImgBox
                        }
                      >
                        <img
                          src="/images/sub/profile_img02.jpg"
                          alt=""
                        />
                      </div>

                      <div
                        className={
                          styles.teamMemberTextBox
                        }
                      >
                        <h3>
                          사업개발팀
                        </h3>
                      </div>

                      <div
                        className={
                          styles.teamInfoHoverBox
                        }
                      >
                        <h3>
                          사업개발팀
                        </h3>

                        <p>
                          셀러들의 비즈니스 구조를
                          분석하고 매출을 확실하게
                          끌어올리는 1:1 맞춤형
                          솔루션을 제안합니다.
                        </p>
                      </div>
                    </a>
                  </li>

                  <li
                    className={
                      styles.teamMemberItem
                    }
                  >
                    <a
                      href="#"
                      className={
                        styles.teamMemberLink
                      }
                    >
                      <div
                        className={
                          styles.teamMemberImgBox
                        }
                      >
                        <img
                          src="/images/sub/profile_img03.jpg"
                          alt=""
                        />
                      </div>

                      <div
                        className={
                          styles.teamMemberTextBox
                        }
                      >
                        <h3>
                          마케팅개발팀
                        </h3>
                      </div>

                      <div
                        className={
                          styles.teamInfoHoverBox
                        }
                      >
                        <h3>
                          마케팅개발팀
                        </h3>

                        <p>
                          감각적인 콘텐츠 제작을
                          통해 트렌디한 비주얼로
                          잠재 고객과의 접점을
                          넓혀나갑니다.
                        </p>
                      </div>
                    </a>
                  </li>

                  <li
                    className={
                      styles.teamMemberItem
                    }
                  >
                    <a
                      href="#"
                      className={
                        styles.teamMemberLink
                      }
                    >
                      <div
                        className={
                          styles.teamMemberImgBox
                        }
                      >
                        <img
                          src="/images/sub/profile_img04.jpg"
                          alt=""
                        />
                      </div>

                      <div
                        className={
                          styles.teamMemberTextBox
                        }
                      >
                        <h3>
                          마케팅개발팀
                        </h3>
                      </div>

                      <div
                        className={
                          styles.teamInfoHoverBox
                        }
                      >
                        <h3>
                          마케팅개발팀
                        </h3>

                        <p>
                          셀러들의 비즈니스 구조를
                          분석하고 매출을 확실하게
                          끌어올리는 1:1 맞춤형
                          솔루션을 제안합니다.
                        </p>
                      </div>
                    </a>
                  </li>

                  <li
                    className={
                      styles.teamMemberItem
                    }
                  >
                    <a
                      href="#"
                      className={
                        styles.teamMemberLink
                      }
                    >
                      <div
                        className={
                          styles.teamMemberImgBox
                        }
                      >
                        <img
                          src="/images/sub/profile_img05.jpg"
                          alt=""
                        />
                      </div>

                      <div
                        className={
                          styles.teamMemberTextBox
                        }
                      >
                        <h3>
                          리커머스팀
                        </h3>
                      </div>

                      <div
                        className={
                          styles.teamInfoHoverBox
                        }
                      >
                        <h3>
                          리커머스팀
                        </h3>

                        <p>
                          엄격한 정품 감정과 철저한
                          검수 프로세스를 통해 모두
                          신뢰할 수 있는 최상의 거래
                          경험을 제공합니다.
                        </p>
                      </div>
                    </a>
                  </li>

                  <li
                    className={
                      styles.teamMemberItem
                    }
                  >
                    <a
                      href="#"
                      className={
                        styles.teamMemberLink
                      }
                    >
                      <div
                        className={
                          styles.teamMemberImgBox
                        }
                      >
                        <img
                          src="/images/sub/profile_img06.jpg"
                          alt=""
                        />
                      </div>

                      <div
                        className={
                          styles.teamMemberTextBox
                        }
                      >
                        <h3>
                          리커머스팀
                        </h3>
                      </div>

                      <div
                        className={
                          styles.teamInfoHoverBox
                        }
                      >
                        <h3>
                          리커머스팀
                        </h3>

                        <p>
                          투명하고 합리적인 명품
                          매입 기준을 수립하여
                          하이엔드 리커머스 시장을
                          리드합니다.
                        </p>
                      </div>
                    </a>
                  </li>

                  <li
                    className={
                      styles.teamMemberItem
                    }
                  >
                    <a
                      href="#"
                      className={
                        styles.teamMemberLink
                      }
                    >
                      <div
                        className={
                          styles.teamMemberImgBox
                        }
                      >
                        <img
                          src="/images/sub/profile_img07.jpg"
                          alt=""
                        />
                      </div>

                      <div
                        className={
                          styles.teamMemberTextBox
                        }
                      >
                        <h3>
                          온라인교육팀
                        </h3>
                      </div>

                      <div
                        className={
                          styles.teamInfoHoverBox
                        }
                      >
                        <h3>
                          온라인교육팀
                        </h3>

                        <p>
                          강사 섭외부터 몰입도 높은
                          강의 제작 그리고 단순
                          교육을 넘어선 커뮤니티 및
                          멤버십 운영 구조를
                          총괄합니다.
                        </p>
                      </div>
                    </a>
                  </li>

                  <li
                    className={
                      styles.teamMemberItem
                    }
                  >
                    <a
                      href="#"
                      className={
                        styles.teamMemberLink
                      }
                    >
                      <div
                        className={
                          styles.teamMemberImgBox
                        }
                      >
                        <img
                          src="/images/sub/profile_img08.jpg"
                          alt=""
                        />
                      </div>

                      <div
                        className={
                          styles.teamMemberTextBox
                        }
                      >
                        <h3>
                          온라인교육팀
                        </h3>
                      </div>

                      <div
                        className={
                          styles.teamInfoHoverBox
                        }
                      >
                        <h3>
                          온라인교육팀
                        </h3>

                        <p>
                          트렌디한 시장 수요를 철저히
                          분석하여 수강생들의 성장을
                          돕는 성인 교육 콘텐츠를
                          기획합니다.
                        </p>
                      </div>
                    </a>
                  </li>

                  <li
                    className={
                      styles.teamMemberItem
                    }
                  >
                    <a
                      href="#"
                      className={
                        styles.teamMemberLink
                      }
                    >
                      <div
                        className={
                          styles.teamMemberImgBox
                        }
                      >
                        <img
                          src="/images/sub/profile_img09.jpg"
                          alt=""
                        />
                      </div>

                      <div
                        className={
                          styles.teamMemberTextBox
                        }
                      >
                        <h3>
                          경영지원팀
                        </h3>
                      </div>

                      <div
                        className={
                          styles.teamInfoHoverBox
                        }
                      >
                        <h3>
                          경영지원팀
                        </h3>

                        <p>
                          비효율은 줄이고 몰입도는
                          높이는 스마트한 업무
                          인프라를 구축합니다.
                        </p>
                      </div>
                    </a>
                  </li>

                  <li
                    className={
                      styles.teamMemberItem
                    }
                  >
                    <a
                      href="#"
                      className={
                        styles.teamMemberLink
                      }
                    >
                      <div
                        className={
                          styles.teamMemberImgBox
                        }
                      >
                        <img
                          src="/images/sub/profile_img10.jpg"
                          alt=""
                        />
                      </div>

                      <div
                        className={
                          styles.teamMemberTextBox
                        }
                      >
                        <h3>
                          사업개발팀
                        </h3>
                      </div>

                      <div
                        className={
                          styles.teamInfoHoverBox
                        }
                      >
                        <h3>
                          사업개발팀
                        </h3>

                        <p>
                          새로운 비즈니스 기회를
                          날카롭게 발굴해 내며 더
                          풀림이 나아갈 사업의
                          견고한 기둥을 구축합니다.
                        </p>
                      </div>
                    </a>
                  </li>
                </ul>
                {/* //팀원 목록 */}

                {/* 팀 인터뷰 영역 */}
                <div
                  className={
                    styles.teamInterviewBox
                  }
                  data-aos="fade-up"
                >
                  {/* 인터뷰 타이틀 */}
                  <h2
                    className={`
                      ${styles.teamInterviewTitle}
                      scrollRevealGroup
                    `}
                  >
                    <span className="scrollRevealLine">
                      <strong className="scrollRevealText">
                        INTERVIEWS
                      </strong>
                    </span>

                    <span className="scrollRevealLine">
                      <strong className="scrollRevealText">
                        WITH OUR
                      </strong>
                    </span>

                    <span className="scrollRevealLine">
                      <strong className="scrollRevealText">
                        SPECIALISTS
                      </strong>
                    </span>
                  </h2>
                  {/* //인터뷰 타이틀 */}

                  {/* 인터뷰 목록 */}
                  <ul
                    className={
                      styles.teamInterviewList
                    }
                    data-aos="fade-up"
                  >
                    <li
                      className={
                        styles.teamInterviewItem
                      }
                    >
                      <a
                        href="#"
                        className={
                          styles.teamInterviewLink
                        }
                        onClick={function (event) {
                          event.preventDefault();
                          setActiveInterview(0);
                        }}
                      >
                        <h3
                          className={
                            styles.teamInterviewTeam
                          }
                        >
                          사업개발팀
                        </h3>

                        <div
                          className={
                            styles.teamInterviewImgBox
                          }
                        >
                          <img
                            src="/images/sub/profile_img11.jpg"
                            alt="오동현 팀장"
                          />
                        </div>

                        <span
                          className={
                            styles.teamInterviewMember
                          }
                        >
                          오동현 팀장
                        </span>
                      </a>
                    </li>

                    <li
                      className={
                        styles.teamInterviewItem
                      }
                    >
                      <a
                        href="#"
                        className={
                          styles.teamInterviewLink
                        }
                        onClick={function (event) {
                          event.preventDefault();
                          setActiveInterview(1);
                        }}
                      >
                        <h3
                          className={
                            styles.teamInterviewTeam
                          }
                        >
                          사업개발팀
                        </h3>

                        <div
                          className={
                            styles.teamInterviewImgBox
                          }
                        >
                          <img
                            src="/images/sub/profile_img12.jpg"
                            alt="강민준 매니저"
                          />
                        </div>

                        <span
                          className={
                            styles.teamInterviewMember
                          }
                        >
                          강민준 매니저
                        </span>
                      </a>
                    </li>

                    <li
                      className={
                        styles.teamInterviewItem
                      }
                    >
                      <a
                        href="#"
                        className={
                          styles.teamInterviewLink
                        }
                        onClick={function (event) {
                          event.preventDefault();
                          setActiveInterview(2);
                        }}
                      >
                        <h3
                          className={
                            styles.teamInterviewTeam
                          }
                        >
                          신사업 총괄
                        </h3>

                        <div
                          className={
                            styles.teamInterviewImgBox
                          }
                        >
                          <img
                            src="/images/sub/profile_img13.jpg"
                            alt="김신성 팀장"
                          />
                        </div>

                        <span
                          className={
                            styles.teamInterviewMember
                          }
                        >
                          김신성 팀장
                        </span>
                      </a>
                    </li>
                  </ul>
                  {/* //인터뷰 목록 */}
                </div>
                {/* //팀 인터뷰 영역 */}

                {/* 업무 환경 영역 */}
                <div
                  className={
                    styles.teamWorkPlaceBox
                  }
                >
                  {/* 제목 영역 */}
                  <div className="titleBox scrollRevealGroup">
                    <span className="scrollRevealLine">
                      <strong className="scrollRevealText">
                        ( / 01 )
                      </strong>
                    </span>

                    <p>
                      <em className="scrollRevealLine">
                        <strong className="scrollRevealText">
                          A WORKSPACE DESIGNED
                        </strong>
                      </em>

                      <em className="scrollRevealLine">
                        <strong className="scrollRevealText">
                          FOR PERFORMANCE
                        </strong>
                      </em>
                    </p>
                  </div>
                  {/* //제목 영역 */}

                  {/* 소개 문구 영역 */}
                  <p className="infoText scrollRevealGroup">
                    <span className="scrollRevealLine">
                      <span className="scrollRevealText">
                        더 풀림은 구성원들이 제약 없이
                        역량을 펼치고
                      </span>
                    </span>

                    <span className="scrollRevealLine">
                      <span className="scrollRevealText">
                        최고의 퍼포먼스를 낼 수 있도록
                        스마트한 업무 환경을 제공합니다.
                      </span>
                    </span>
                  </p>
                  {/* //소개 문구 영역 */}

                  {/* 업무 환경 목록 */}
                  <ul
                    className={
                      styles.teamBenefitList
                    }
                  >
                    <li data-aos="fade-up">
                      <a href="#">
                        <h3>
                          WORK ENVIRONMENT
                        </h3>

                        <p>
                          최고의 몰입을 만드는 쾌적한
                          오피스 환경과
                          <br />
                          서로를 존중하는 유연한 근무
                          문화를 제공합니다.
                        </p>

                        <div
                          className={
                            styles.teamBenefitImgBox
                          }
                        >
                          <img
                            src="/images/sub/team_img01.jpg"
                            alt=""
                          />

                          <img
                            src="/images/sub/team_img02.jpg"
                            alt=""
                          />
                        </div>
                      </a>
                    </li>

                    <li data-aos="fade-up">
                      <a href="#">
                        <h3>
                          PREMIUM GEAR
                        </h3>

                        <p>
                          장비에 구애받지 않고 오직
                          성과에만 집중할 수 있도록
                          <br />
                          고사양 최신 업무 장비를 풀
                          지원합니다.
                        </p>

                        <div
                          className={
                            styles.teamBenefitImgBox
                          }
                        >
                          <img
                            src="/images/sub/team_img03.jpg"
                            alt=""
                          />

                          <img
                            src="/images/sub/team_img04.jpg"
                            alt=""
                          />
                        </div>
                      </a>
                    </li>

                    <li data-aos="fade-up">
                      <a href="#">
                        <h3>
                          AI-POWERED WORKFLOW
                        </h3>

                        <p>
                          업무 효율을 극대화하고
                          트렌드를 리드하기 위해
                          <br />
                          다양한 생성형 AI 구독
                          서비스와 스마트 협업 툴을
                          전폭 지원합니다.
                        </p>

                        <div
                          className={
                            styles.teamBenefitImgBox
                          }
                        >
                          <img
                            src="/images/sub/team_img05.jpg"
                            alt=""
                          />

                          <img
                            src="/images/sub/team_img06.jpg"
                            alt=""
                          />
                        </div>
                      </a>
                    </li>
                  </ul>
                  {/* //업무 환경 목록 */}
                </div>
                {/* //업무 환경 영역 */}

                {/* 팀 문화 영역 */}
                <div
                  className={
                    styles.teamCultureBox
                  }
                >
                  {/* 제목 영역 */}
                  <div className="titleBox scrollRevealGroup">
                    <span className="scrollRevealLine">
                      <strong className="scrollRevealText">
                        ( / 02 )
                      </strong>
                    </span>

                    <p>
                      <em className="scrollRevealLine">
                        <strong className="scrollRevealText">
                          DRIVEN BY PASSION
                        </strong>
                      </em>

                      <em className="scrollRevealLine">
                        <strong className="scrollRevealText">
                          UNITED BY TRUST
                        </strong>
                      </em>
                    </p>
                  </div>
                  {/* //제목 영역 */}

                  {/* 소개 문구 */}
                  <p className="infoText scrollRevealGroup">
                    <span className="scrollRevealLine">
                      <span className="scrollRevealText">
                        아무리 뛰어난 기술력이
                        존재하더라도
                      </span>
                    </span>

                    <span className="scrollRevealLine">
                      <span className="scrollRevealText">
                        결국 그 기술을 혁신으로 완성하는
                        것은 사람의 단단한 결속력입니다.
                      </span>
                    </span>
                  </p>
                  {/* //소개 문구 */}

                  {/* 이미지 영역 */}
                  <div
                    className={
                      styles.teamCultureImgBox
                    }
                    data-aos="fade-up"
                  >
                    <img
                      src="/images/sub/team_culture_img.jpg"
                      alt="협업하고 있는 더 풀림 구성원"
                    />
                  </div>
                  {/* //이미지 영역 */}

                  {/* 설명 영역 */}
                  <div
                    className={
                      styles.teamCultureTextBox
                    }
                    data-aos="fade-up"
                  >
                    <p>
                      <strong>
                        우리는 서로의 전문성을 깊이
                        존중하고 자유롭게
                        <br />
                        협업하며 하나의 목표를 향해
                        달립니다.
                      </strong>
                    </p>

                    <p>
                      탁월한 개인들이 모여 가장
                      완벽한 팀워크를 이룰 때,
                      <br />
                      ‘더 풀림’의 진정한 가치가
                      시작됩니다.
                    </p>
                  </div>
                  {/* //설명 영역 */}
                </div>
                {/* //팀 문화 영역 */}
              </div>

              {/* 채용 링크 */}
              <a
                href="#"
                className={
                  styles.teamRecruitLink
                }
              >
                <span
                  className={
                    styles.teamRecruitDefault
                  }
                >
                  JOIN OUR TEAM
                </span>

                <span
                  className={
                    styles.teamRecruitMarquee
                  }
                  aria-hidden="true"
                >
                  <span
                    className={
                      styles.teamRecruitGroup
                    }
                  >
                    JOIN OUR TEAM&nbsp;&nbsp;///&nbsp;&nbsp;
                    JOIN OUR TEAM&nbsp;&nbsp;///&nbsp;&nbsp;
                    JOIN OUR TEAM&nbsp;&nbsp;///&nbsp;&nbsp;
                    JOIN OUR TEAM&nbsp;&nbsp;///&nbsp;&nbsp;
                  </span>

                  <span
                    className={
                      styles.teamRecruitGroup
                    }
                  >
                    JOIN OUR TEAM&nbsp;&nbsp;///&nbsp;&nbsp;
                    JOIN OUR TEAM&nbsp;&nbsp;///&nbsp;&nbsp;
                    JOIN OUR TEAM&nbsp;&nbsp;///&nbsp;&nbsp;
                    JOIN OUR TEAM&nbsp;&nbsp;///&nbsp;&nbsp;
                  </span>
                </span>
              </a>
              {/* //채용 링크 */}
            </div>
            {/* //팀 영역 */}
          </div>
          {/* //서브 콘텐츠 영역 */}
        </Main>
        {/* //서브 영역 */}

        <Footer />
      </div>

      {/* 첫 번째 인터뷰 팝업 */}
      <div
        className={`
          ${styles.popupVideoBox}
          ${
            activeInterview === 0
              ? styles.active
              : ''
          }
        `}
        aria-hidden={
          activeInterview !== 0
        }
      >
        <div className={styles.popupVideo}>
          <iframe
            src={
              activeInterview === 0
                ? 'https://www.youtube.com/embed/OmW7AtWsJxg?autoplay=1&mute=1&loop=1&playlist=OmW7AtWsJxg&playsinline=1&rel=0'
                : undefined
            }
            title="오동현 팀장 인터뷰 영상"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>

        <button
          type="button"
          className={styles.popupCloseBtn}
          aria-label="오동현 팀장 인터뷰 영상 닫기"
          onClick={function () {
            setActiveInterview(null);
          }}
        />
      </div>
      {/* //첫 번째 인터뷰 팝업 */}

      {/* 두 번째 인터뷰 팝업 */}
      <div
        className={`
          ${styles.popupVideoBox}
          ${
            activeInterview === 1
              ? styles.active
              : ''
          }
        `}
        aria-hidden={
          activeInterview !== 1
        }
      >
        <div className={styles.popupVideo}>
          <iframe
            src={
              activeInterview === 1
                ? 'https://www.youtube.com/embed/tDh3VrnMlfM?autoplay=1&mute=1&loop=1&playlist=tDh3VrnMlfM&playsinline=1&rel=0'
                : undefined
            }
            title="강민준 매니저 인터뷰 영상"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>

        <button
          type="button"
          className={styles.popupCloseBtn}
          aria-label="강민준 매니저 인터뷰 영상 닫기"
          onClick={function () {
            setActiveInterview(null);
          }}
        />
      </div>
      {/* //두 번째 인터뷰 팝업 */}

      {/* 세 번째 인터뷰 팝업 */}
      <div
        className={`
          ${styles.popupVideoBox}
          ${
            activeInterview === 2
              ? styles.active
              : ''
          }
        `}
        aria-hidden={
          activeInterview !== 2
        }
      >
        <div className={styles.popupVideo}>
          <iframe
            src={
              activeInterview === 2
                ? 'https://www.youtube.com/embed/EaCyogpVbfM?autoplay=1&mute=1&loop=1&playlist=EaCyogpVbfM&playsinline=1&rel=0'
                : undefined
            }
            title="김신성 팀장 인터뷰 영상"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>

        <button
          type="button"
          className={styles.popupCloseBtn}
          aria-label="김신성 팀장 인터뷰 영상 닫기"
          onClick={function () {
            setActiveInterview(null);
          }}
        />
      </div>
      {/* //세 번째 인터뷰 팝업 */}
    </>
  );
}