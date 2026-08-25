import styles from './Contact.module.css';
import Main from '../components/layout/Main';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function Contact() {

  return (

    <div id="wrap" className={styles.contactWrap}>

      <Header logoSrc="/images/common/logo03.svg" />

      {/* 서브 영역 */}
      <Main id="subWrap">
        {/* 상단 영역 */}
        <div className="subTopBox">
          <div className="container">
            <div className="topTitleBox">
              <h2>CONTACT</h2>

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
                method=""
                className={styles.formWrap}
              >
                {/* 폼 왼쪽 영역 */}
                <div className={styles.formLeftBox}>
                  <div className={styles.formBox}>
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

                  <div className={styles.formBox}>
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

                  <div className={styles.formBox}>
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

                  <div className={styles.formBox}>
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
                    <div className={styles.cunstomInpuChkBox}>
                      <input
                        id="agreeChk"
                        name="agreeChk"
                        type="checkbox"
                        className="blind"
                      />

                      <label htmlFor="agreeChk">
                        <span>개인정보 수집</span>
                        동의 및 마케팅 활용
                      </label>
                    </div>
                  </div>
                </div>
                {/* //폼 왼쪽 영역 */}

                {/* 폼 오른쪽 영역 */}
                <div className={styles.formRightBox}>
                  <div className={styles.textareaBox}>
                    <textarea
                      id="content"
                      name=""
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
                    className={styles.submitBtn}
                  >
                    <span>GET IN TOUCH</span>
                  </button>
                </div>
                {/* //폼 오른쪽 영역 */}
              </form>

              {/* 지도 영역 */}
              <div className={styles.contactMapBox}>
                <img
                  src="/images/sub/map_img.jpg"
                  alt=""
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