import {
  useEffect,
  useRef
} from 'react';

import styles from './Contact.module.css';
import '../styles/sub.css';

import Main from '../components/layout/Main';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

import useSubMotion from '../hooks/useSubMotion';

export default function Contact() {
  const pageRef = useRef(null);

  /* 서브페이지 공통 모션 및 부드러운 스크롤 */
  useSubMotion(pageRef);

  /* 이전 페이지의 스크롤 잠금 제거 */
  useEffect(function () {
    document.body.classList.remove(
      'servicePopupOpen',
      'popupVideoOpen'
    );

    document.body.style.overflow = '';

    return function () {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      ref={pageRef}
      id="wrap"
      className={styles.contactWrap}
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
                CONTACT
              </h2>

              <p className="topText01">
                READY TO SOLVE YOUR
                <br />
                BUSINESS CHALLENGES?
              </p>

              <p className="topText02">
                지금 당신의 비즈니스 고민을 공유해 주세요.
                <br />
                혁신을 만드는 우리의 전문가들이 기대 그
                이상의 비전과 성과를 가지고 가장 빠르게
                응답하겠습니다.
              </p>
            </div>
          </div>
        </div>
        {/* //상단 영역 */}

        {/* 서브 콘텐츠 영역 */}
        <div className="subContentBox">
          {/* 문의 영역 */}
          <div className="contactBox">
            <div className="container">
              <form
                action=""
                method="post"
                className={styles.formWrap}
              >
                {/* 폼 왼쪽 영역 */}
                <div
                  className={
                    styles.formLeftBox
                  }
                >
                  <div
                    className={
                      styles.formBox
                    }
                  >
                    <div className="inputTextBox">
                      <input
                        id="companyName"
                        name="companyName"
                        type="text"
                        placeholder="회사명"
                      />

                      <label
                        htmlFor="companyName"
                        className="blind"
                      >
                        회사명
                      </label>
                    </div>
                  </div>

                  <div
                    className={
                      styles.formBox
                    }
                  >
                    <div className="inputTextBox">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="성함"
                      />

                      <label
                        htmlFor="name"
                        className="blind"
                      >
                        성함
                      </label>
                    </div>
                  </div>

                  <div
                    className={
                      styles.formBox
                    }
                  >
                    <div className="inputTextBox">
                      <input
                        id="phone"
                        name="phone"
                        type="text"
                        placeholder="연락처"
                      />

                      <label
                        htmlFor="phone"
                        className="blind"
                      >
                        연락처
                      </label>
                    </div>
                  </div>

                  <div
                    className={
                      styles.formBox
                    }
                  >
                    <div className="inputTextBox">
                      <input
                        id="email"
                        name="email"
                        type="text"
                        placeholder="이메일"
                      />

                      <label
                        htmlFor="email"
                        className="blind"
                      >
                        이메일
                      </label>
                    </div>
                  </div>

                  <div
                    className={`
                      ${styles.formBox}
                      ${styles.inpuChkFormBox}
                    `}
                  >
                    <div
                      className={`
                        cunstomInpuChkBox
                        ${styles.cunstomInpuChkBox}
                      `}
                    >
                      <input
                        id="agreeChk"
                        name="agreeChk"
                        type="checkbox"
                        className="blind"
                      />

                      <label htmlFor="agreeChk">
                        <span>
                          개인정보 수집
                        </span>
                        동의 및 마케팅 활용
                      </label>
                    </div>
                  </div>
                </div>
                {/* //폼 왼쪽 영역 */}

                {/* 폼 오른쪽 영역 */}
                <div
                  className={
                    styles.formRightBox
                  }
                >
                  <div
                    className={`
                      textareaBox
                      ${styles.textareaBox}
                    `}
                  >
                    <textarea
                      id="content"
                      name="content"
                      placeholder="문의내용"
                    />

                    <label
                      htmlFor="content"
                      className="blind"
                    >
                      문의내용
                    </label>
                  </div>

                  <button
                    type="submit"
                    className={
                      styles.submitBtn
                    }
                  >
                    <span>
                      GET IN TOUCH
                    </span>
                  </button>
                </div>
                {/* //폼 오른쪽 영역 */}
              </form>

              {/* 지도 영역 */}
              <div
                className={
                  styles.contactMapBox
                }
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m5!3m3!1m2!1s0x357ca413ce0f03c9%3A0x88773fe34be27981!2z7ISc7Jq47Yq567OE7IucIOqwleuCqOq1rCDthYztl6TrnoDroZw3N-q4uCAxMS04!5e0!3m2!1sko!2skr!4v1787663462492!5m2!1sko!2skr"
                  title="더 풀림 위치"
                  style={{
                    border: 0
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
              {/* //지도 영역 */}
            </div>
          </div>
          {/* //문의 영역 */}
        </div>
        {/* //서브 콘텐츠 영역 */}
      </Main>
      {/* //서브 영역 */}

      <Footer />
    </div>
  );
}